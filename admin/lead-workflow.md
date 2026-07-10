# HardBid Lead Workflow

Use this workflow for every website inquiry submitted through the `plan-upload` Netlify form.

## Intake

1. Check `plans@hardbidconsulting.com` for the Netlify notification.
2. Open the Netlify submission link if the email includes one.
3. Add the lead to `lead-tracker-template.csv` or a Google Sheet with the same columns.
4. Mark `lead_status` as `New`.
5. Set `priority`:
   - `High`: bid due in 7 days or less, large project, or clear urgent ask.
   - `Medium`: active bid with enough time to review.
   - `Low`: incomplete information, exploratory inquiry, or no deadline.

## First Reply

Send the first reply from `freddy@hardbidconsulting.com` or an approved alias. Keep the reply short and ask for missing documents only when needed.

Suggested first-reply structure:

```text
Hi [Name],

Thank you for sending the project information. I received the intake and will review the documents/link you shared.

Before I start, please confirm:
- Bid due date:
- Trade/scope you want reviewed:
- Any addenda or alternates that must be included:
- Any specific concerns you want checked first:

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

Do not pay for a CRM or funnel tool until the manual workflow has handled real leads. Once there are repeated submissions, connect Netlify Forms to a Google Sheet or CRM and keep `plans@hardbidconsulting.com` as the notification address.

Good second-stage automation:

1. New Netlify form submission.
2. Add row to Google Sheet.
3. Send email notification to `plans@hardbidconsulting.com`.
4. Optional: create a follow-up calendar reminder.
5. Optional: add lead to a CRM after the sales process is proven.
