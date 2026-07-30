const SPREADSHEET_ID = '1IzThC7hQh4YnoBK16lFeFrwHq9lHZ6CvEo2rg5YHFCw';
const LEADS_SHEET_NAME = 'Leads';
const PROCESSED_LABEL = 'HardBidLeadLogged';
const SEARCH_QUERY = 'from:formresponses@netlify.com subject:"New HardBid plan upload received" newer_than:30d -label:HardBidLeadLogged';

const FIELD_LABELS = [
  'Name *',
  'Name',
  'name',
  'Business Email *',
  'Business Email',
  'Email *',
  'Email',
  'email',
  'Phone',
  'Company',
  'Project Name *',
  'Project Name',
  'project_name',
  'Project Type *',
  'Project Type',
  'project_type',
  'Bid or Decision Date',
  'Bid Due Date',
  'bid_due_date',
  'Approximate Construction Value',
  'Project Size',
  'project_size',
  'Support Needed *',
  'Support Needed',
  'Needed Support',
  'needed_support',
  'Authorized Document or Plan-room Link',
  'document_link',
  'Small Supporting File',
  'small_attachment',
  'Uploadcare File Links',
  'Large Plan Set Link',
  'Upload Plans / Specs / Notes',
  'Project Notes',
  'message',
];

function processHardBidNetlifyEmails() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(LEADS_SHEET_NAME);
  const processedIds = getProcessedMessageIds_(sheet);
  const label = GmailApp.getUserLabelByName(PROCESSED_LABEL) || GmailApp.createLabel(PROCESSED_LABEL);
  const threads = GmailApp.search(SEARCH_QUERY, 0, 50);
  let added = 0;

  threads.forEach((thread) => {
    thread.getMessages().forEach((message) => {
      const messageId = message.getId();
      if (processedIds.has(messageId)) return;

      const submission = parseNetlifyBody_(message.getPlainBody());
      if (!submission.email && !submission.name) return;

      sheet.appendRow(buildLeadRow_(message, submission, messageId));
      processedIds.add(messageId);
      added += 1;
    });
    label.addToThread(thread);
  });

  Logger.log(`HardBid leads added: ${added}`);
}

function installHardBidLeadTrigger() {
  ScriptApp.getProjectTriggers()
    .filter((trigger) => trigger.getHandlerFunction() === 'processHardBidNetlifyEmails')
    .forEach((trigger) => ScriptApp.deleteTrigger(trigger));

  ScriptApp.newTrigger('processHardBidNetlifyEmails')
    .timeBased()
    .everyMinutes(5)
    .create();
}

function getProcessedMessageIds_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return new Set();

  const values = sheet.getRange(2, 19, lastRow - 1, 1).getValues();
  return new Set(values.flat().filter(Boolean).map(String));
}

function parseNetlifyBody_(body) {
  return {
    name: extractAnyField_(body, ['Name *', 'Name', 'name']),
    email: extractAnyField_(body, ['Business Email *', 'Business Email', 'Email *', 'Email', 'email']),
    phone: extractAnyField_(body, ['Phone']),
    company: extractAnyField_(body, ['Company']),
    projectName: extractAnyField_(body, ['Project Name *', 'Project Name', 'project_name']),
    projectType: extractAnyField_(body, ['Project Type *', 'Project Type', 'project_type']),
    bidDueDate: extractAnyField_(body, ['Bid or Decision Date', 'Bid Due Date', 'bid_due_date']),
    projectSize: extractAnyField_(body, ['Approximate Construction Value', 'Project Size', 'project_size']),
    neededSupport: extractAnyField_(body, ['Support Needed *', 'Support Needed', 'Needed Support', 'needed_support']),
    uploadcareFileLinks: extractField_(body, 'Uploadcare File Links'),
    documentLink: extractAnyField_(body, ['Authorized Document or Plan-room Link', 'Large Plan Set Link', 'document_link']),
    uploadedFiles: extractAnyField_(body, ['Small Supporting File', 'Upload Plans / Specs / Notes', 'small_attachment']),
    projectNotes: extractAnyField_(body, ['Project Notes', 'message']),
  };
}

function extractAnyField_(body, labels) {
  for (const label of labels) {
    const value = extractField_(body, label);
    if (value) return value;
  }
  return '';
}

function extractField_(body, label) {
  const marker = `${label}:`;
  const start = body.indexOf(marker);
  if (start === -1) return '';

  const valueStart = start + marker.length;
  let valueEnd = body.length;

  FIELD_LABELS.forEach((nextLabel) => {
    if (nextLabel === label) return;
    const nextIndex = body.indexOf(`\n${nextLabel}:`, valueStart);
    if (nextIndex !== -1 && nextIndex < valueEnd) valueEnd = nextIndex;
  });

  return cleanValue_(body.slice(valueStart, valueEnd));
}

function cleanValue_(value) {
  return value
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '$2')
    .replace(/\r/g, '')
    .trim();
}

function buildLeadRow_(message, submission, messageId) {
  const receivedAt = message.getDate();
  const bidDueDate = submission.bidDueDate || '';
  const nextActionDue = nextBusinessDay_(receivedAt);
  const documentLink = submission.uploadcareFileLinks || submission.documentLink || submission.uploadedFiles || '';

  return [
    receivedAt,
    'New',
    priorityFor_(bidDueDate),
    submission.name,
    submission.email,
    submission.phone,
    submission.company,
    submission.projectName,
    submission.projectType,
    bidDueDate,
    submission.projectSize,
    submission.neededSupport,
    documentLink,
    '',
    'Review intake and reply within 1 business day',
    nextActionDue,
    'Freddy',
    submission.projectNotes,
    messageId,
  ];
}

function priorityFor_(bidDueDateValue) {
  if (!bidDueDateValue) return 'Medium';
  const due = new Date(`${bidDueDateValue}T00:00:00`);
  if (Number.isNaN(due.getTime())) return 'Medium';

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  if (days <= 7) return 'High';
  if (days <= 21) return 'Medium';
  return 'Low';
}

function nextBusinessDay_(date) {
  const next = new Date(date);
  next.setDate(next.getDate() + 1);
  while (next.getDay() === 0 || next.getDay() === 6) {
    next.setDate(next.getDate() + 1);
  }
  return next;
}
