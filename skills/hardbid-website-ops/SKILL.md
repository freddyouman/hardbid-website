---
name: hardbid-website-ops
description: Operate, update, verify, and document the HardBid Consulting website, Netlify deployment, Squarespace DNS, Google Workspace email aliases, and Netlify Forms lead-capture workflow. Use when working on this project repo, deploying the site, changing form/email routing, troubleshooting domain/email setup, or preparing the next admin/funnel automation step.
---

# HardBid Website Ops

## Core Rule

Read `DEPLOYMENT_RUNBOOK.md` before changing hosting, DNS, forms, email, aliases, or deployment settings. Treat it as the current source of truth for the live business setup.

## Workflow

1. Inspect the repo and worktree before editing:

```powershell
git status --short
```

2. Keep website source in `Website/hardbid-website`.
3. Keep the local backup copy in `Website/hardbid_homepage_fixed` aligned for important docs and production-ready site files.
4. Commit and push production-ready changes to GitHub `main`; Netlify auto-deploys from that branch.
5. Verify live pages after a deployment:

```powershell
Invoke-WebRequest -UseBasicParsing https://hardbidconsulting.com -TimeoutSec 15
Invoke-WebRequest -UseBasicParsing https://hardbidconsulting.com/upload-plans -TimeoutSec 15
```

## When Browser Access Is Needed

Use Chrome only for account-bound UI tasks that require the user's logged-in sessions, such as Netlify notification settings, Squarespace DNS, or Google Admin Console. Before external side effects, confirm the user has authorized that specific action.

Do not store passwords, temporary passwords, recovery codes, payment details, or private credentials in the repo.

## References

- For Google Workspace email setup, aliases, invitation resend, and missing invite troubleshooting, read `references/google-workspace-email.md`.
- For deployment, DNS, Netlify Forms, and lead notification routing, read `DEPLOYMENT_RUNBOOK.md`.
