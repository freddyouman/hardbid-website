# HardBid Website Compliance Toolkit

This folder is the project "brain" for privacy, intake, and legal-risk controls. It is not legal advice and should be reviewed by a qualified attorney before being relied on for contracts, payments, or regulated customer data.

## Working Position

HardBid should keep legal text visible but quiet:

- Footer links to Privacy Policy and Terms.
- A short required consent acknowledgement on intake forms.
- Clear language that customers must be authorized to upload plans/specs.
- Clear limits that HardBid provides contractor review support, not licensed engineering, legal, insurance, bonding, accounting, or guaranteed bid outcomes.
- No unnecessary personal data collection.
- No customer document sharing outside approved HardBid tools.

## Current Controls

- `upload-plans.html` requires either a file upload or document link.
- Netlify form notifications route to `plans@hardbidconsulting.com`.
- Google Workspace email is controlled by `freddy@hardbidconsulting.com`.
- Lead Tracker logs customer contact and project intake data.
- Hidden message ID column prevents duplicate lead rows from repeated Netlify emails.

## Official Research Sources

- Netlify Forms setup and notifications: https://docs.netlify.com/forms/setup/
- Netlify Forms submissions: https://docs.netlify.com/forms/submissions/
- Google Apps Script Gmail service: https://developers.google.com/apps-script/reference/gmail/gmail-app
- Google Apps Script Spreadsheet service: https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app
- Google Apps Script installable triggers: https://developers.google.com/apps-script/guides/triggers/installable
- FTC business data-security guidance: https://www.ftc.gov/business-guidance/privacy-security/data-security
- California Consumer Privacy Act information: https://oag.ca.gov/privacy/ccpa
- California Privacy Protection Agency: https://cppa.ca.gov/

## Practical Rules For Future Site Changes

1. Ask for only the data needed to evaluate the bid-review request.
2. Put the full legal language on dedicated pages, not inside every marketing section.
3. Put a compact acknowledgement next to form submission buttons.
4. Keep file-upload and plan-room links restricted to authorized project documents.
5. Do not add payment collection until Terms and refund/cancellation language are reviewed.
6. Do not advertise guaranteed savings, guaranteed wins, guaranteed accuracy, or licensed professional services.
7. If lead data is exported to any funnel/CRM/AI tool, document what data is sent, why, and who can access it.
