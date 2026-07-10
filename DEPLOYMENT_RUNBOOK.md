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
- Email: `freddyouman@gmail.com`
- Subject: `New HardBid plan upload from {{name}}`
- Applies to: any form

## File Upload Notes

Netlify Forms can receive file uploads, but large plan sets may be too big for normal form upload limits. The form currently asks users to upload files, and the notes field tells them that large files may be easier to share with a Drive or Dropbox link.

Recommended next improvement:

- A dedicated field named `document_link` was added.
- Label: `Large Plan Set Link`
- Purpose: capture Google Drive, Dropbox, OneDrive, or plan room links when plan sets are too large for direct upload.
- The intake page now accepts either an uploaded file or a `document_link`.
- Browser validation blocks submission only when both the upload field and large-plan link are empty.

## Verification Log

July 9, 2026:

- Submitted a live test lead through `https://hardbidconsulting.com/upload-plans`.
- The customer path returned the `Plans Received` thank-you page.
- Gmail received a Netlify notification at `freddyouman@gmail.com`.
- The email body included the test lead fields and a hosted Netlify upload link.
- Netlify did not replace `{{name}}` in the notification subject, so use a static notification subject such as `New HardBid plan upload received`.

## Lead Workflow

Current first-stage funnel:

1. Visitor clicks `Upload Plans for Review`.
2. Visitor completes `plan-upload`.
3. Netlify stores the submission.
4. Netlify emails `freddyouman@gmail.com`.
5. Business reviews submission and follows up manually.

Recommended second-stage funnel:

1. Keep Netlify Forms as intake.
2. Connect submissions to a spreadsheet or CRM after real leads start arriving.
3. Prefer simple Google Sheets or HubSpot Free before paying for complex funnel tools.
4. Use Zapier or Make only after the manual process is proven.

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

These aliases were added under the existing `freddy@hardbidconsulting.com` user in Google Admin Console, so they should not create extra paid seats. Test aliases before routing production notifications to them.

## Current Pages

- `index.html`: main marketing site
- `upload-plans.html`: lead capture and plan upload page
- `thank-you.html`: confirmation page
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
