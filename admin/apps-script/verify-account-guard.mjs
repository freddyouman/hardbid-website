import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(
  new URL("./netlify-email-to-lead-tracker.gs", import.meta.url),
  "utf8",
);

assert.doesNotMatch(source, /SEARCH_QUERY[^\n]+-label:HardBidLeadLogged/);
assert.match(source, /if \(!isTargetNetlifyMessage_\(message\)\) return;/);

function loadWithAccount(email) {
  const context = {
    Session: {
      getEffectiveUser: () => ({
        getEmail: () => email,
      }),
    },
  };

  vm.createContext(context);
  vm.runInContext(source, context);
  return context;
}

for (const accepted of [
  "freddy@hardbidconsulting.com",
  " FREDDY@HARDBIDCONSULTING.COM ",
]) {
  assert.doesNotThrow(() =>
    loadWithAccount(accepted).assertHardBidBusinessAccount_(),
  );
}

for (const rejected of [
  "freddyouman@gmail.com",
  "",
  null,
]) {
  assert.throws(
    () => loadWithAccount(rejected).assertHardBidBusinessAccount_(),
    /Wrong execution account/,
  );
}

const notificationBody = [
  "Name:",
  "HardBid Synthetic QA",
  "",
  "Email:",
  "freddy@hardbidconsulting.com",
  "",
  "Phone:",
  "",
  "",
  "Company:",
  "HardBid Consulting - Synthetic Test",
  "",
  "Project Name:",
  "Synthetic Funnel Verification 2026-07-30",
  "",
  "Project Type:",
  "Other",
  "",
  "Project Size:",
  "",
  "",
  "Bid Due Date:",
  "",
  "",
  "Needed Support:",
  "Not sure — help me define it",
  "",
  "Document Link:",
  "",
  "",
  "Small Attachment:",
  "",
  "",
  "Message:",
  "SYNTHETIC TEST ONLY",
  "",
  "Authorized To Share:",
  "yes",
  "",
].join("\r\n");

const parsed = loadWithAccount(
  "freddy@hardbidconsulting.com",
).parseNetlifyBody_(notificationBody);

assert.deepEqual(
  JSON.parse(JSON.stringify(parsed)),
  {
    name: "HardBid Synthetic QA",
    email: "freddy@hardbidconsulting.com",
    phone: "",
    company: "HardBid Consulting - Synthetic Test",
    projectName: "Synthetic Funnel Verification 2026-07-30",
    projectType: "Other",
    bidDueDate: "",
    projectSize: "",
    neededSupport: "Not sure — help me define it",
    uploadcareFileLinks: "",
    documentLink: "",
    uploadedFiles: "",
    projectNotes: "SYNTHETIC TEST ONLY",
  },
);

const validMessage = {
  getFrom: () => "Netlify <formresponses@netlify.com>",
  getSubject: () => "New HardBid plan upload received",
};
const wrongSender = {
  getFrom: () => "someone@example.com",
  getSubject: () => "New HardBid plan upload received",
};
const wrongSubject = {
  getFrom: () => "formresponses@netlify.com",
  getSubject: () => "Re: New HardBid plan upload received",
};
const messageGuard = loadWithAccount("freddy@hardbidconsulting.com");

assert.equal(messageGuard.isTargetNetlifyMessage_(validMessage), true);
assert.equal(messageGuard.isTargetNetlifyMessage_(wrongSender), false);
assert.equal(messageGuard.isTargetNetlifyMessage_(wrongSubject), false);

console.log("Apps Script account/parser/thread/message guard: 11/11 checks passed.");
