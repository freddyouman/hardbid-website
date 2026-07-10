# Netlify Email To Lead Tracker Automation

This is the no-extra-subscription automation path for HardBid leads.

## What It Does

1. Gmail receives Netlify form notifications at `plans@hardbidconsulting.com`.
2. Google Apps Script searches for new messages from `formresponses@netlify.com`.
3. The script parses the email body.
4. The script appends one row to the live HardBid Lead Tracker.
5. The script stores the Gmail message ID in hidden column `S` to prevent duplicate rows.

Live tracker:

https://docs.google.com/spreadsheets/d/1IzThC7hQh4YnoBK16lFeFrwHq9lHZ6CvEo2rg5YHFCw

## Setup

1. Open the business account: `freddy@hardbidconsulting.com`.
2. Open Google Apps Script: https://script.google.com/
3. Create a new project named `HardBid Netlify Lead Logger`.
4. Paste `netlify-email-to-lead-tracker.gs` into the project.
5. Save.
6. Run `processHardBidNetlifyEmails` once and approve permissions.
7. Confirm the test Netlify emails appear as rows in the tracker.
8. Run `installHardBidLeadTrigger` once to check every 5 minutes.

## Before Turning On

Delete or archive any duplicate test emails if you do not want them logged again. The script logs each Gmail message once, so old test messages can become old test rows if they match the search.

## Rollback

Open Apps Script triggers and delete the trigger for `processHardBidNetlifyEmails`.
