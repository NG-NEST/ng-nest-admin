import path from 'node:path';
import type { PrismaConfig } from 'prisma';
import { config } from 'dotenv';

config({ path: path.resolve(process.cwd(), '.env') });

type Env = {
  DATABASE_URL: string;
};

export default {
  earlyAccess: true,
  schema: path.join('prisma'),
} satisfies PrismaConfig<Env>;
