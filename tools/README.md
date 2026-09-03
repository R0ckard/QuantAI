# The Admin Load Check · local tool

Runs on Dave's Mac only. Pulls submissions from the worker, drafts the report, renders
the PDF, and sends it, with a gate that makes sending a deliberate act.

Target: pull to reviewed PDF in under two minutes of Dave's attention.

## Setup once

1. `cd tools && npm install`
2. Copy `.env.example` to `.env` and fill it in. `WORKER_URL` is what `npm run deploy`
   printed in `worker/`. `PULL_TOKEN` is the same string you gave the worker.
3. Google Chrome has to be installed (it prints the PDF).

## Each submission

```bash
npm run pull                          # list what's waiting, save it to data/
npm run draft 1a2b3c                  # first few characters of the id are enough
npm run render 1a2b3c                 # makes out/<id>.pdf and opens it
npm run send 1a2b3c -- --reviewed     # only after you've read the PDF
```

`draft` shows the numbers, the family split it derived from their ticks, and lets you
type a different split (`CHASE=20 DOCS=40 REKEY=40`). It warns if your split changes
which family the report names, because the instant screen already named one. Then it
drafts the prose, checks it, asks the model to fix anything flagged, and tells you what
is still flagged. Edit `out/<id>.html` by hand if you want, then `render` again.

Flags: `--yes` keeps the derived split without asking, `--split KEY=pct,...` sets it,
`--no-ai` fills placeholders so you can check the layout, `--force` drafts a full report
for someone Qualify says gets the short email.

`send` refuses without a PDF, refuses if the PDF is older than the draft, and refuses
without `--reviewed`. `--dry-run` prints the email and stops. `--short --reviewed` sends
the no report email (email 4) for anyone under 9, no PDF needed. Every send is appended
to `data/sent.log` with the date, id, company, score and email type, then the worker is
told to mark it processed.

Which email goes out: 15 and up gets the full email with the price on page 3. 9 to 14
gets the full email and the report without the price block. A load under $10,000 a year
gets the small number email. 1 to 5 people never see the price, whatever the score.

## What the checks look for in the draft

Any dollar figure, percentage or hours figure the model did not compute. Words that name
a fix (automate, software, tool, recommend, should, and friends). Claims about other
firms (typically, most firms, in my experience). Em and en dashes are replaced with
commas automatically. None of this replaces reading it.

## Tests

`npm test`. The drafting call is only exercised live when `ANTHROPIC_API_KEY` is set;
that test feeds an "ignore your instructions" answer through and checks a normal report
comes back.
