import { type Plugin } from 'vite';
import { symlink, lstat } from 'fs/promises';

interface SymlinkPair {
  source: string;
  target: string;
}

interface CreateSymlinkOptions {
  links: SymlinkPair[];
}

export default function createSymlink(options: CreateSymlinkOptions): Plugin {
  return {
    name: 'create-symlink',
    enforce: 'pre',
    async buildStart() {
      for (const { source, target } of options.links) {
        const isSymlink = await lstat(target)
          .then((s) => s.isSymbolicLink())
          .catch(() => false);

        if (isSymlink) {
          console.info(`symlink already exists: ${source} -> ${target}`);
          return;
        }

        await symlink(source, target, 'dir');
        console.info(`create symlink: ${source} -> ${target}`);
      }
    },
  };
}
