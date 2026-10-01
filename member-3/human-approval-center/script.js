const requestList = document.querySelector("#request-list");
const requests = [...document.querySelectorAll(".request")];
const dialog = document.querySelector("#approval-dialog");
const dialogTitle = document.querySelector("#approval-dialog-title");
const dialogContent = document.querySelector("#approval-dialog-content");
const dialogConfirm = document.querySelector("#approval-dialog-confirm");
const completedRequests = [];
let confirmAction = () => {};
let highPriorityOnly = false;
let newestFirst = false;

function showDialog(title, message, action = () => {}) {
  dialogTitle.textContent = title;
  dialogContent.replaceChildren();
  if (typeof message === "string") {
    const paragraph = document.createElement("p");
    paragraph.textContent = message;
    dialogContent.append(paragraph);
  } else {
    dialogContent.append(message);
  }
  confirmAction = action;
  dialogConfirm.hidden = false;
  dialog.showModal();
}

function selectRequest(request) {
  requests.forEach((item) => item.classList.toggle("selected", item === request));
  document.querySelector("#request-title").textContent = request.dataset.title;
  document.querySelector("#agent-name").textContent = request.dataset.agent;
  document.querySelector("#request-detail").textContent = request.dataset.detail;
  document.querySelector(".detail-panel").classList.remove("resolved");
}

requests.forEach((request) => {
  request.addEventListener("click", () => selectRequest(request));
});

document.querySelector("#filter-button").addEventListener("click", (event) => {
  highPriorityOnly = !highPriorityOnly;
  event.currentTarget.textContent = highPriorityOnly ? "☷  High priority" : "☷  Filters";
  requests.forEach((request) => {
    request.hidden = highPriorityOnly && request.dataset.priority !== "high";
  });
  if (highPriorityOnly && document.querySelector(".request.selected")?.hidden) {
    const firstVisible = requests.find((request) => !request.hidden);
    if (firstVisible) selectRequest(firstVisible);
  }
});

document.querySelector(".queue-header button").addEventListener("click", () => {
  newestFirst = !newestFirst;
  [...requestList.children].reverse().forEach((request) => requestList.append(request));
  document.querySelector(".queue-header p").textContent = newestFirst ? "Newest requests shown first" : "Oldest requests shown first";
});

document.querySelector("#approve-button").addEventListener("click", () => resolveRequest("Approved"));
document.querySelector("#reject-button").addEventListener("click", () => resolveRequest("Declined"));

document.querySelector("#edit-button").addEventListener("click", () => {
  const field = document.createElement("label");
  field.className = "dialog-field";
  field.textContent = "What should the agent change?";
  const input = document.createElement("textarea");
  input.id = "change-request";
  input.rows = 4;
  input.placeholder = "Add clear instructions for the agent";
  field.append(input);
  showDialog("Request changes", field, () => {
    if (!input.value.trim()) {
      input.focus();
      return false;
    }
    completedRequests.push({ title: document.querySelector("#request-title").textContent, outcome: "Changes requested" });
    resolveSelectedWithoutDialog("Changes requested");
    return true;
  });
  input.focus();
});

document.querySelector("#mobile-menu").addEventListener("click", (event) => {
  const isOpen = document.querySelector("#sidebar").classList.toggle("mobile-open");
  document.body.classList.toggle("menu-open", isOpen);
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
  event.currentTarget.textContent = isOpen ? "×" : "☰";
});
document.addEventListener("click", (event) => {
  if (!document.body.classList.contains("menu-open")) return;
  if (event.target.closest("#mobile-menu")) return;
  if (event.target === document.body || event.target.closest(".main-content")) {
    document.querySelector("#sidebar").classList.remove("mobile-open");
    document.body.classList.remove("menu-open");
    document.querySelector("#mobile-menu").setAttribute("aria-expanded", "false");
    document.querySelector("#mobile-menu").textContent = "☰";
  }
});

document.querySelector("#team-switch").addEventListener("click", () => {
  showDialog("Switch workspace", "Acme Studio is your active workspace. Your approval queue is up to date.");
});
document.querySelector("#settings-button").addEventListener("click", () => {
  showDialog("Workspace settings", "Manage team members, notification preferences, and approval policies for Acme Studio.");
});
document.querySelector("#user-menu").addEventListener("click", () => {
  showDialog("Jamie Davis", "You are signed in as the workspace administrator.");
});
document.querySelector("#detail-menu").addEventListener("click", () => {
  showDialog("Request options", "This request was submitted by an AI agent and is awaiting your review.");
});
document.querySelector("#history-button").addEventListener("click", () => {
  const message = completedRequests.length
    ? completedRequests.map((item) => `${item.title}: ${item.outcome}`).join(" · ")
    : "No requests have been reviewed during this session.";
  showDialog("Review history", message);
});

dialogConfirm.addEventListener("click", (event) => {
  event.preventDefault();
  if (confirmAction() !== false) dialog.close();
});

function resolveRequest(action) {
  const selected = document.querySelector(".request.selected");
  if (!selected) return;
  completedRequests.push({ title: selected.dataset.title, outcome: action });
  resolveSelectedWithoutDialog(action);
}

function resolveSelectedWithoutDialog(action) {
  const selected = document.querySelector(".request.selected");
  if (!selected) return;
  selected.remove();
  const count = document.querySelector(".queue-header h2 span");
  count.textContent = String(Math.max(0, Number(count.textContent) - 1));
  document.querySelector(".summary article:first-child strong").textContent = count.textContent.padStart(2, "0");
  document.querySelector(".sidebar nav .active span").textContent = count.textContent;
  if (action === "Approved") {
    const approvedCount = document.querySelector(".green-text");
    approvedCount.textContent = String(Number(approvedCount.textContent) + 1);
  }
  const nextRequest = [...requestList.children].find((request) => !request.hidden);
  if (nextRequest) {
    selectRequest(nextRequest);
    document.querySelector(".review-badge").innerHTML = "<i></i> PENDING REVIEW";
    return;
  }
  document.querySelector(".detail-panel").classList.add("resolved");
  document.querySelector(".detail-panel").innerHTML = `<div class="empty-state"><span>✓</span><h2>${highPriorityOnly ? "No matching requests" : "You're all caught up"}</h2><p>${action}. ${highPriorityOnly ? "Try clearing the priority filter to see other requests." : "There are no more requests in this view."}</p></div>`;
}
