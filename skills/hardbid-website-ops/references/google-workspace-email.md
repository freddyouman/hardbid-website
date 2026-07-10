# Google Workspace Email Workflow

Use this reference when setting up or troubleshooting HardBid Google Workspace email.

## Current Setup

- Domain: `hardbidconsulting.com`
- Paid/admin user: `freddy@hardbidconsulting.com`
- Aliases on that paid user:
  - `info@hardbidconsulting.com`
  - `plans@hardbidconsulting.com`
  - `admin@hardbidconsulting.com`
- Netlify form notifications route to `plans@hardbidconsulting.com`.
- `plans@hardbidconsulting.com` delivers into the `freddy@hardbidconsulting.com` mailbox because it is an alias, not a separate paid user.

## Important Distinction

Do not create separate paid Google Workspace users for common intake addresses unless the business wants separate inboxes and separate billing.

Use aliases for:

- `info@hardbidconsulting.com`
- `plans@hardbidconsulting.com`
- `admin@hardbidconsulting.com`

Use a new paid user only when a separate person needs their own login, mailbox, Drive, calendar, and permissions.

## Invitation And Temporary Password Steps

If the `freddy@hardbidconsulting.com` user cannot sign in or the Google Workspace terms cannot be accepted:

1. Open Squarespace domain/email settings.
2. Go to `Email` > `Google Workspace` > `Manage Google Workspace`.
3. Open the user record for `freddy`.
4. Use `Resend Invitation` if the account needs a new temporary password.
5. Send the invitation to an accessible recovery mailbox such as `freddyouman@gmail.com`.
6. Find the email titled like `Welcome to Google Workspace`.
7. Use the `Log Into Email` button or go to Gmail/Google sign-in with `freddy@hardbidconsulting.com`.
8. Sign in with the temporary password from the invitation.
9. Set a permanent password if prompted.
10. Accept the Google Workspace Terms of Service.
11. After access works, use the Google Admin Console at `https://admin.google.com/`.

Never save the temporary password in the repo or in documentation. Only document the process.

## Alias Setup

In Google Admin Console:

1. Go to `Directory` > `Users`.
2. Open `freddy@hardbidconsulting.com`.
3. Find user profile or alternate email/alias settings.
4. Add aliases for intake addresses.
5. Save.

After adding an alias, send a test email to the alias and check whether it arrives in the `freddy@hardbidconsulting.com` inbox.

## Netlify Notification Routing

Netlify project:

- `bucolic-klepon-40d5dc`

Current form notification:

- Event: new form submission
- Recipient: `plans@hardbidconsulting.com`
- Subject: `New HardBid plan upload received`

If editing:

1. Open Netlify project settings.
2. Go to `Project configuration` > `Notifications`.
3. Find `Form submission notifications`.
4. Edit the existing notification rather than creating duplicates.
5. Use the static subject above; Netlify previously sent literal template text when `{{name}}` was used.
6. Submit a live test form and verify the `Plans Received` page appears.

## Troubleshooting

- If Gmail says `Couldn't sign you in`, resend the invitation from Squarespace to an accessible mailbox and use the newest temporary password.
- If no invite appears, search Gmail for `Welcome to Google Workspace`, `freddy@hardbidconsulting.com`, and `Squarespace`.
- If alias mail does not arrive, verify Google Workspace MX records still point to Google in Squarespace DNS.
- If Netlify notifications do not arrive, check Netlify Forms submissions first. If the submission exists but no email arrives, inspect the notification recipient and spam/quarantine folders.
