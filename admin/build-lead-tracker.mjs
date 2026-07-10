import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = path.resolve("admin", "outputs");
await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();
workbook.comments.setSelf({ displayName: "HardBid" });

const leads = workbook.worksheets.add("Leads");
const lists = workbook.worksheets.add("Lists");

const headers = [
  "Received At",
  "Lead Status",
  "Priority",
  "Name",
  "Email",
  "Phone",
  "Company",
  "Project Name",
  "Project Type",
  "Bid Due Date",
  "Project Size",
  "Needed Support",
  "Document Link",
  "Netlify Submission URL",
  "Next Action",
  "Next Action Due",
  "Assigned To",
  "Notes",
];

leads.getRange("A1:R1").values = [headers];
leads.getRange("A2:R2").values = [[
  new Date("2026-07-10T00:00:00"),
  "New",
  "High",
  "Example Contractor",
  "estimating@example.com",
  "555-0100",
  "Example Construction",
  "Example Pump Station",
  "Water / Wastewater",
  new Date("2026-08-01T00:00:00"),
  "$5M - $25M",
  "Bid package review",
  "https://drive.google.com/example",
  "",
  "Review intake and reply within 1 business day",
  new Date("2026-07-11T00:00:00"),
  "Freddy",
  "Example row only. Delete before using for live leads.",
]];

leads.getRange("A1:R1").format = {
  fill: "#E5E7EB",
  font: { bold: true, color: "#111827" },
  wrapText: true,
};
leads.getRange("A1:R101").format.borders = {
  insideHorizontal: { style: "thin", color: "#E5E7EB" },
  top: { style: "thin", color: "#D1D5DB" },
  bottom: { style: "thin", color: "#D1D5DB" },
};
leads.getRange("A2:A101").setNumberFormat("yyyy-mm-dd");
leads.getRange("J2:J101").setNumberFormat("yyyy-mm-dd");
leads.getRange("P2:P101").setNumberFormat("yyyy-mm-dd");
leads.getRange("A:R").format.wrapText = true;
leads.getRange("A:R").format.autofitColumns();
leads.getRange("A1:R1").format.rowHeightPx = 42;
leads.freezePanes.freezeRows(1);
leads.tables.add("A1:R101", true, "HardBidLeads");

const listData = [
  ["Lead Status", "Priority", "Project Type", "Needed Support"],
  ["New", "High", "Water / Wastewater", "Bid package review"],
  ["Waiting for documents", "Medium", "Industrial", "Take-off summary"],
  ["Reviewing", "Low", "Mechanical", "Scope gap analysis"],
  ["Proposal sent", "", "Public Works", "Estimating support"],
  ["Scheduled", "", "Commercial", "RFI / clarification support"],
  ["Won", "", "Other", "Not sure yet"],
  ["Lost", "", "", ""],
  ["Closed no response", "", "", ""],
];
lists.getRange("A1:D9").values = listData;
lists.getRange("A1:D1").format = {
  fill: "#E5E7EB",
  font: { bold: true, color: "#111827" },
};
lists.getRange("A:D").format.autofitColumns();
lists.freezePanes.freezeRows(1);

leads.getRange("B2:B101").dataValidation = { rule: { type: "list", formula1: "Lists!$A$2:$A$9" } };
leads.getRange("C2:C101").dataValidation = { rule: { type: "list", formula1: "Lists!$B$2:$B$4" } };
leads.getRange("I2:I101").dataValidation = { rule: { type: "list", formula1: "Lists!$C$2:$C$7" } };
leads.getRange("L2:L101").dataValidation = { rule: { type: "list", formula1: "Lists!$D$2:$D$7" } };

workbook.comments.addThread(
  { cell: leads.getRange("A1") },
  "Use one row per Netlify plan-upload submission. Keep customer document links in the Document Link column."
);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  maxChars: 1000,
});
console.log(errors.ndjson);

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(path.join(outputDir, "hardbid-lead-tracker.xlsx"));
console.log(path.join(outputDir, "hardbid-lead-tracker.xlsx"));

process.exit(0);
