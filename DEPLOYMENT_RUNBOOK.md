# HardBid Consulting Deployment Runbook

This file records the current working setup so future deployments, DNS changes, and form automation can be repeated without guessing.

## Current Architecture

- Website source: `Website/hardbid-website`
- GitHub repo: `https://github.com/freddyouman/hardbid-website`
- Production branch: `main`
- Netlify project: `bucolic-klepon-40d5dc`
- Netlify subdomain: `https://bucolic-klepon-40d5dc.netlify.app`
- Live domain: `https://hardbidconsulting.com`
- Backup local copy: `Website/hardbid_homepage_fixed`
- Project-local Codex skill: `skills/hardbid-website-ops/SKILL.md`

Netlify deploys automatically when changes are pushed to GitHub `main`.

## Important Accounts

- Netlify login currently shown as: `freddyouman@gmail.com`
- GitHub account/repo owner: `freddyouman`
- Domain registrar/DNS provider: Squarespace Domains
- Google Workspace domain: `hardbidconsulting.com`

Do not cancel Google Workspace or domain registration unless the business intentionally migrates those services.

## Domain And DNS

Domain is managed at Squarespace. Netlify hosts the website. Google Workspace handles email.

Current website DNS records:

```text
A      @     75.2.60.5
CNAME  www   bucolic-klepon-40d5dc.netlify.app
```

Keep Google Workspace MX records:

```text
MX  @  1   aspmx.l.google.com
MX  @  5   alt1.aspmx.l.google.com
MX  @  5   alt2.aspmx.l.google.com
MX  @  10  alt3.aspmx.l.google.com
MX  @  10  alt4.aspmx.l.google.com
```

Keep Google Workspace verification TXT:

```text
TXT @ google-site-verification=97JV7i53qeOUTmgTCPp0jFrEdFdqIEbt2iz5N6ykJ1g
```

Domain renewal seen in Squarespace:

- `hardbidconsulting.com`
- Renews June 24, 2027
- Auto-renew was on
- WHOIS privacy was on
- Domain lock was on

A Google Calendar reminder was created for June 10, 2027 to review renewal before the June 24, 2027 date.

## Deployment Workflow

From the website folder:

```powershell
git status --short
git add .
git commit -m "Describe the change"
git push origin main
```

Netlify should publish automatically within seconds. Verify:

```powershell
Invoke-WebRequest -UseBasicParsing https://hardbidconsulting.com -TimeoutSec 15
Invoke-WebRequest -UseBasicParsing https://hardbidconsulting.com/upload-plans -TimeoutSec 15
```

If Netlify does not detect a form after enabling detection, trigger a fresh deploy:

```powershell
git commit --allow-empty -m "Trigger Netlify form detection"
git push origin main
```

## Local Preview

Run:

```powershell
python -m http.server 4173
```

Open:

```text
http://127.0.0.1:4173/
http://127.0.0.1:4173/upload-plans.html
```

## Netlify Forms Setup

The upload page uses Netlify Forms:

- Page: `/upload-plans`
- Form name: `plan-upload`
- Method: `POST`
- Encoding: `multipart/form-data`
- Thank-you redirect: `/thank-you.html`

Netlify status confirmed:

- Form detection enabled
- Active form: `plan-upload`
- No submissions existed at initial setup

Notification configured:

- Event: new form submission
- Email: `plans@hardbidconsulting.com`
- Subject: `New HardBid plan upload received`
- Applies to: any form

## File Upload Notes

The redesigned first-contact funnel does not depend on Uploadcare and does not require documents. Netlify Forms handles the intake fields and one optional supporting file under 7 MB.

For large or sensitive plan sets:

- Qualify the inquiry before requesting the full set.
- Prefer the client's authorized plan-room or controlled folder link.
- Otherwise create a restricted project folder owned by the HardBid business Google Workspace account.
- Do not use a personal Google Drive as the permanent business archive.
- Keep the future Azure Blob path reserved for the HardBid platform runtime, with expiring access, quarantine, and malware scanning.

The former Uploadcare trial ended on July 24, 2026 and downgraded to the Free plan at $0/month with no payment method. The owner deleted the Uploadcare account and its stored files on July 27, 2026. Uploadcare is no longer active and is not a launch dependency.

## Verification Log

July 9, 2026:

- Submitted a live test lead through `https://hardbidconsulting.com/upload-plans`.
- The customer path returned the `Plans Received` thank-you page.
- Gmail received a Netlify notification at `freddyouman@gmail.com`.
- The email body included the test lead fields and a hosted Netlify upload link.
- Netlify did not replace `{{name}}` in the notification subject, so use a static notification subject such as `New HardBid plan upload received`.
- Added Google Workspace aliases under the paid/admin user `freddy@hardbidconsulting.com`: `info@hardbidconsulting.com`, `plans@hardbidconsulting.com`, and `admin@hardbidconsulting.com`.
- Sent an alias test email to `plans@hardbidconsulting.com`; no immediate delivery failure appeared in the sender mailbox.
- Updated the Netlify form submission notification recipient from `freddyouman@gmail.com` to `plans@hardbidconsulting.com`.
- Submitted a live link-only routing test through Netlify Forms; the request returned the `Plans Received` page.

## Lead Workflow

Current first-stage funnel:

1. Visitor clicks `Request a Review`.
2. Visitor completes `plan-upload`.
3. Netlify stores the submission.
4. Netlify emails `plans@hardbidconsulting.com`, which is an alias on the `freddy@hardbidconsulting.com` Google Workspace mailbox.
5. Business reviews the submission and normally follows up within one business day.
6. If large documents are needed, HardBid provides the restricted transfer instructions after qualification.

Recommended second-stage funnel:

1. Keep Netlify Forms as intake.
2. Use Google Apps Script to read Netlify notification emails and append rows to the Lead Tracker.
3. Prefer simple Google Sheets or HubSpot Free before paying for complex funnel tools.
4. Use Zapier or Make only after the manual process is proven.

Admin templates:

- `admin/lead-tracker-template.csv`
- `admin/lead-workflow.md`
- `admin/service-renewal-tracker.md`
- `admin/service-renewal-tracker.csv`
- `admin/apps-script/netlify-email-to-lead-tracker.gs`
- `admin/business-email-shortcuts.md`
- `admin/compliance-toolkit/`
- Live Google Sheet: `https://docs.google.com/spreadsheets/d/1IzThC7hQh4YnoBK16lFeFrwHq9lHZ6CvEo2rg5YHFCw`

Service renewals and subscription reminders are tracked in `admin/service-renewal-tracker.md`. Keep this file updated whenever a new service, paid plan, trial, or domain is added.

## Google Workspace Guidance

Google Workspace is useful for professional email, storage, and shared files. It is not required to make the website run.

Use Google Workspace later for:

- A business inbox like `info@hardbidconsulting.com`
- Storing received project files in Drive
- A Google Sheet lead tracker
- Calendar follow-up reminders

Do not move website hosting into Google Workspace. Keep hosting on Netlify unless there is a strong reason to change.

Current Google Workspace user setup:

- Paid/admin user: `freddy@hardbidconsulting.com`
- Alias: `info@hardbidconsulting.com`
- Alias: `plans@hardbidconsulting.com`
- Alias: `admin@hardbidconsulting.com`

These aliases were added under the existing `freddy@hardbidconsulting.com` user in Google Admin Console, so they should not create extra paid seats. `plans@hardbidconsulting.com` is the production notification recipient for plan-upload form submissions.

If the Google Workspace user cannot sign in or the Terms of Service flow sends the browser to the wrong account, resend the invitation from Squarespace Google Workspace management to an accessible mailbox such as `freddyouman@gmail.com`. Use the newest `Welcome to Google Workspace` email to sign in as `freddy@hardbidconsulting.com`, then accept the terms. Do not store temporary passwords in this repo.

## Current Pages

- `index.html`: main marketing site
- `upload-plans.html`: lead capture and plan upload page
- `thank-you.html`: confirmation page
- `privacy.html`: public privacy policy
- `terms.html`: public website terms
- `assets/`: logo, title image, background images, founder photo

## Design Notes

Current brand direction:

- Use lion logo prominently.
- Keep HardBid name visible on all lead pages.
- Main slogan: `Less Risk. Better Bids. More Wins.*`
- Keep legal limitation language near any claim about wins, bid quality, pricing, or outcome.
- Avoid generic form pages; keep the intake page visually branded and premium.

## Legal And Business Limitations

HardBid provides contractor bid review and documentation support. The site should continue to avoid promising:

- Project awards
- Bid accuracy
- Profit
- Pricing outcomes
- Contract results
- Engineering/legal/accounting/bonding services

Final decisions remain the contractor/client responsibility.
