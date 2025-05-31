import { lilconfig } from 'lilconfig';
import { parse } from 'yaml';
import z from 'zod/v4';
import path from 'path';
import { mkdir, writeFile } from 'fs/promises';

const loadYaml = (_path: string, content: string) => parse(content);

type LoadConfigOptions<T extends z.ZodObject<any>> = {
  name: string;
  configPath: string;
  schema: T;
  toJSONSchema?: boolean;
};
export const loadConfig = async <T extends z.ZodObject<any>>(
  opts: LoadConfigOptions<T>
): Promise<z.infer<T>> => {
  const { name, configPath, schema, toJSONSchema = true } = opts;
  const explorer = lilconfig(name, {
    loaders: {
      '.yaml': loadYaml,
      '.yml': loadYaml,
    },
  });
  const result = await explorer.load(configPath);
  if (!result) {
    throw new Error(`Config ${name} not found`);
  }

  if (toJSONSchema) {
    const dir = path.resolve(process.cwd(), 'node_modules/.local');
    // create dir if not exists, use fs/promises
    await mkdir(dir, { recursive: true });
    const schemaPath = path.resolve(dir, `${name}.schema.json`);
    await writeFile(schemaPath, JSON.stringify(z.toJSONSchema(schema)));
    console.log(`Config JSON Schema written to ${schemaPath}`);
  }

  const parsed = schema.safeParse(result.config);
  if (!parsed.success) {
    throw new Error(
      `Config ${name} is invalid: ${z.treeifyError(parsed.error)}`
    );
  }

  return parsed.data;
};
