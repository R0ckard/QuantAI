# The Admin Load Check · worker

The Cloudflare Worker behind `quantai.com.au/check/`. It holds every key, validates and
scores each submission with the same `check/model.js` the page uses, stores it in KV, and
sends the two emails. The local CLI in `tools/` pulls from it.

Nothing in this folder is secret. The repo is public and GitHub Pages serves these files
as plain text, so keys only ever go in Wrangler secrets.

## One time setup (about 15 minutes)

1. `cd worker && npm install`
2. Log in: `npx wrangler login`
3. Create the store: `npx wrangler kv namespace create SUBMISSIONS` and paste the id it
   prints into `wrangler.toml` where it says `REPLACE_WITH_KV_NAMESPACE_ID`.
4. Secrets, one at a time. Each command asks you to paste the value, nothing is stored on disk:
   - `npx wrangler secret put ANTHROPIC_API_KEY`
   - `npx wrangler secret put RESEND_API_KEY`
   - `npx wrangler secret put TURNSTILE_SECRET` (from the Turnstile widget you create in the
     Cloudflare dashboard, hostname `quantai.com.au`; the matching site key goes in `check/config.js`)
   - `npx wrangler secret put PULL_TOKEN` (any long random string, the CLI uses the same one)
5. `npm run deploy`. It prints the worker URL, something like `https://quantai-check.<you>.workers.dev`.
6. Put that URL in `check/config.js` as `API_BASE` (no trailing slash), commit, push.

Optional but sensible: if the domain's DNS ever moves to Cloudflare, add a route so the
worker answers on `api.quantai.com.au` and change `API_BASE` to match.

## Emails

Resend only sends from a verified domain. `send.quantai.com.au` is verified, so the worker
sends from there with reply-to set to `dave@quantai.com.au`. Replies land in the normal
inbox. If `quantai.com.au` itself is verified in Resend later, change `RESEND_FROM` in
`wrangler.toml`.

## Endpoints

| Route | Who calls it | What it does |
|---|---|---|
| `POST /api/followup` | the page | One adaptive follow up question on 5.1 or 6.1. Hard limits: 4 per session, 30 per IP per hour. Any failure returns `{followup: null}` and the page carries on. |
| `POST /api/submit` | the page | Validates every answer against the schema, verifies Turnstile, scores, stores, emails. Returns the public estimate only. Same session twice returns the first result. |
| `GET /api/pull` | the CLI, bearer token | Submissions not yet marked processed. `?all=1` for everything. |
| `POST /api/mark` | the CLI, bearer token | `{id}` marks one processed. |
| `GET /api/health` | anyone | `{ok: true}` |

## Rules kept here

- No answer, email address or name in a URL, a query string or a log line. Logs carry ids only.
- The qualification score is stored and emailed to Dave. It never goes back to the browser.
- Respondent text is wrapped in delimiters and labelled untrusted before it reaches the model.
- Model names live in `src/ai.js`, in one constant.

## Tests

`npm test` runs the handler against a fake KV and fake Resend, Turnstile and Anthropic
responses. No network, no keys.
