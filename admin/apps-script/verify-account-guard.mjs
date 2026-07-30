import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(
  new URL("./netlify-email-to-lead-tracker.gs", import.meta.url),
  "utf8",
);

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

console.log("Apps Script account guard: 5/5 checks passed.");
