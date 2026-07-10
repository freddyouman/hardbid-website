# HardBid Consulting Website

Static website for HardBid Consulting, deployed through GitHub and Netlify.

## Files

- `index.html` - full website HTML, CSS, and JavaScript
- `upload-plans.html` - branded Netlify lead capture and plan upload form
- `thank-you.html` - confirmation page after a plan upload form submission
- `privacy.html` - compact public privacy policy
- `terms.html` - compact public website terms
- `assets/` - logo, founder photo, and background images

## Local Preview

From this folder:

```powershell
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

## Live Deployment

- Live domain: https://hardbidconsulting.com
- Netlify site: https://bucolic-klepon-40d5dc.netlify.app
- GitHub repo: https://github.com/freddyouman/hardbid-website
- Production branch: `main`

Netlify auto-publishes every push to `main`. Keep this folder as the working copy and GitHub as the version-history copy.

## Admin Notes

- Squarespace is currently the domain/DNS registrar only.
- Google Workspace email records must stay in DNS.
- Netlify Forms handles `plan-upload` submissions.
- Netlify email notifications send new form submissions to `plans@hardbidconsulting.com`.
- Business Gmail shortcut: `admin/shortcuts/HardBid Business Gmail.url`
- Google Apps Script automation draft: `admin/apps-script/netlify-email-to-lead-tracker.gs`
- See `DEPLOYMENT_RUNBOOK.md` for the full setup, DNS records, form workflow, and next automation steps.
