// Loads tools/.env into process.env (without overriding anything already set)
// and hands back the settings with a clear message when one is missing.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const envFile = path.join(here, '..', '.env');

if (fs.existsSync(envFile)) {
  for (const raw of fs.readFileSync(envFile, 'utf8').split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    if (!(key in process.env)) process.env[key] = val;
  }
}

export const ENV = {
  WORKER_URL: (process.env.WORKER_URL || '').replace(/\/$/, ''),
  PULL_TOKEN: process.env.PULL_TOKEN || '',
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
  RESEND_API_KEY: process.env.RESEND_API_KEY || '',
  RESEND_FROM: process.env.RESEND_FROM || 'Dave Richardson, QuantAI <dave@send.quantai.com.au>',
  REPLY_TO: process.env.REPLY_TO || 'dave@quantai.com.au',
  CALENDLY_URL: process.env.CALENDLY_URL || 'https://cal.com/dave-richardson/15min',
  // The pipeline board's intake, for `npm run board`. The token is the
  // engine's CHECK_INTAKE_TOKEN, the same value as the worker's ENGINE_TOKEN.
  ENGINE_URL: process.env.ENGINE_URL || 'https://gtm-engine-dave-s-projects16.vercel.app/api/intake/check',
  ENGINE_TOKEN: process.env.ENGINE_TOKEN || '',
};

export function need(...keys) {
  const missing = keys.filter(k => !ENV[k]);
  if (missing.length) {
    console.error(`Missing ${missing.join(', ')}. Put it in tools/.env (see .env.example).`);
    process.exit(2);
  }
}
