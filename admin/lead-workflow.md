# HardBid Lead Workflow

Use this workflow for every website inquiry submitted through the `plan-upload` Netlify form.

Live tracker:

https://docs.google.com/spreadsheets/d/1IzThC7hQh4YnoBK16lFeFrwHq9lHZ6CvEo2rg5YHFCw

## Intake

1. Check `plans@hardbidconsulting.com` for the Netlify notification.
2. Open the Netlify submission link if the email includes one.
3. Confirm the `Document Link` value in the Lead Tracker. It may contain an authorized client folder/plan-room link or a legacy submission link. A document link is optional at first contact.
4. If a small supporting file was attached through Netlify, treat it as intake-only material. Do not use the website form for a large plan set.
5. Mark `lead_status` as `New`.
6. Set `priority`:
   - `High`: bid due in 7 days or less, large project, or clear urgent ask.
   - `Medium`: active bid with enough time to review.
   - `Low`: incomplete information, exploratory inquiry, or no deadline.

## First Reply

Send the first reply from `freddy@hardbidconsulting.com` or an approved alias. Keep the reply short and ask for missing documents only when needed.

Suggested first-reply structure:

```text
Hi [Name],

Thank you for sending the project information. I received the intake and will review it within one business day.

If not already included, please confirm:
- Bid due date:
- Trade/scope you want reviewed:
- Any addenda or alternates that must be included:
- Any specific concerns you want checked first:

If a large document set is needed, I will provide the restricted project-folder instructions or use your approved plan-room link after we confirm the scope.

HardBid provides contractor review and bid-support notes only. Final bid decisions remain with your team.

Freddy
HardBid Consulting
```

## Tracking Statuses

Use these `lead_status` values:

- `New`
- `Waiting for documents`
- `Reviewing`
- `Proposal sent`
- `Scheduled`
- `Won`
- `Lost`
- `Closed no response`

## Automation Rule

Do not pay for a CRM or funnel tool until the manual workflow has handled real leads. The first automation path is Google Apps Script reading Netlify notification emails from Gmail and appending rows to the live Google Sheet.

Saved automation draft:

`admin/apps-script/netlify-email-to-lead-tracker.gs`

Good first-stage automation:

1. New Netlify form notification arrives at `plans@hardbidconsulting.com`.
2. Google Apps Script finds unlogged Netlify emails.
3. Script appends the intake to the HardBid Lead Tracker.
4. Script stores the Gmail message ID in hidden column `S` to prevent duplicates.
5. Optional later: create a follow-up calendar reminder.
6. Optional later: add a CRM only after the sales process is proven.

## Large-Document Transfer

The website does not depend on Uploadcare. For large or sensitive plan sets:

1. Qualify the inquiry before requesting the full document set.
2. Prefer the client's authorized plan-room or controlled folder link when available.
3. Otherwise create a project-specific restricted folder owned by the HardBid business Google Workspace account, not a personal Drive.
4. Grant access only to the required people and confirm permissions before documents are added.
5. Keep the future Azure Blob intake path reserved for the HardBid platform runtime, including expiring access, quarantine, and malware scanning.
