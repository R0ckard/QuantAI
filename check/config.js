// The Admin Load Check · page configuration.
// Public values only. Nothing in this file is secret and nothing secret may
// ever be added to it: the repo is public and GitHub Pages serves it as is.

export const CONFIG = {
  // Base URL of the Cloudflare Worker, no trailing slash. Leave empty until
  // the worker is deployed: the page then runs in stub mode and hands the
  // answers to Dave by email instead.
  API_BASE: 'https://quantai-check.dave-70b.workers.dev',

  // Cloudflare Turnstile site key (public). Empty means no Turnstile.
  TURNSTILE_SITE_KEY: '0x4AAAAAAElaKls_emQrrRAM',

  // Where errors point people.
  CONTACT_EMAIL: 'dave@quantai.com.au',

  // How long to wait for an adaptive follow up before moving on without it.
  FOLLOWUP_TIMEOUT_MS: 6000,

  // localStorage key. Bump the suffix if the schema ever changes shape.
  STORAGE_KEY: 'qa-admin-load-check-v1',
};
