import { writeFile, mkdir, copyFile, readdir, cp } from 'fs/promises';
import { join } from 'path';
import { fileExists } from '../common';
import { trimWhiteBorderFromBuffer } from './trim-white-border';

export const DEFAULT_CACHE_DIR = './public/favicons';
export const DEFAULT_PERSISTENT_DIR = './node_modules/.local/favicons';

const cpOpts = {
  recursive: true,
  errorOnExist: false,
  force: true,
};

/**
 * Restore cache from persistent storage to working directory
 */
export async function restoreCache(
  cacheDir: string = DEFAULT_CACHE_DIR,
  persistentDir: string = DEFAULT_PERSISTENT_DIR
) {
  if (!(await fileExists(persistentDir))) return;
  await cp(persistentDir, cacheDir, cpOpts);
}

/**
 * Backup cache from working directory to persistent storage
 */
export async function backupCache(
  cacheDir: string = DEFAULT_CACHE_DIR,
  persistentDir: string = DEFAULT_PERSISTENT_DIR
) {
  if (!(await fileExists(cacheDir))) return;
  await cp(cacheDir, persistentDir, cpOpts);
}

function extractDomain(url: string) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return null;
  }
}

async function isValidUrl(url: string): Promise<boolean> {
  try {
    const urlObj = new URL(url);
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return false;
    }
    // Try fetching the domain to verify it's accessible
    await fetch(urlObj.origin, {
      method: 'HEAD',
      signal: AbortSignal.timeout(3000),
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates if the response is a valid favicon
 */
function isValidFaviconResponse(response: Response): boolean {
  // Check response status
  if (!response.ok) {
    return false;
  }

  // Check content type
  const contentType = response.headers.get('content-type');
  const validTypes = [
    'image/x-icon',
    'image/vnd.microsoft.icon',
    'image/ico',
    'image/icon',
    'image/png',
    'image/gif',
    'image/jpeg',
  ];

  if (contentType && !validTypes.some((type) => contentType.includes(type))) {
    return false;
  }

  return true;
}

/**
 * Default function to get favicon
 */
export const getFaviconDefault = async (domain: string) => {
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);
  const res = await fetch(faviconUrl, {
    signal: controller.signal,
  });
  clearTimeout(timeoutId);
  return res;
};

/**
 * Options for favicon cacher
 */
type FaviconCacherOptions = {
  cacheDir?: string;
  toLink?: (filename: string) => string;
  getFavicon?: (domain: string) => Promise<Response>;
  fallback?: string;
};

/**
 * Creates a favicon cacher with persistent cache support
 */
export async function createFaviconCacher(opts: FaviconCacherOptions = {}) {
  const {
    cacheDir = './public/favicons',
    toLink = (filename) => `/favicons/${filename}`,
    getFavicon = getFaviconDefault,
    fallback = 'none.ico',
  } = opts;

  // Restore cache from persistent storage first
  await restoreCache(cacheDir);

  // Create cache directory
  if (!(await fileExists(cacheDir))) {
    await mkdir(cacheDir, { recursive: true });
  }

  return async function (url: string): Promise<string> {
    const filename = `${extractDomain(url)}.ico`;
    const filePath = join(cacheDir, filename);

    // If already cached, return the path
    if (await fileExists(filePath)) {
      console.log(`✅ Return cached favicon for ${url}`);
      return toLink(filename);
    }

    // Validate domain
    const isValid = await isValidUrl(url);
    if (!isValid) {
      console.log(`Skipping invalid domain: ${url}`);
      return toLink(fallback);
    }

    try {
      const res = await getFavicon(url);
      // Validate if the response is a valid favicon
      if (!isValidFaviconResponse(res)) {
        console.log(`⚠️ Invalid favicon response for ${url}`);
        return toLink(fallback);
      }

      const buf = await trimWhiteBorderFromBuffer(await res.arrayBuffer());

      // Save to cache
      await writeFile(filePath, new Uint8Array(buf));
      console.log(`✅ Cached favicon for ${url}`);

      // Backup to persistent cache
      await backupCache(cacheDir);

      return toLink(filename);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log(`⏱️ Timeout while fetching favicon for ${url}`);
      } else {
        console.error(`❌ Failed to cache favicon for ${url}:`, error);
      }
      return toLink(fallback);
    }
  };
}
