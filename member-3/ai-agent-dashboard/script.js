const refreshButton = document.querySelector("#refresh-button");
const agentList = document.querySelector("#agent-list");
let openMenu;

function announce(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(announce.timeout);
  announce.timeout = window.setTimeout(() => toast.classList.remove("visible"), 2400);
}

function closeMenu() {
  openMenu?.remove();
  openMenu = undefined;
}

function showMenu(button, options) {
  closeMenu();
  const menu = document.createElement("div");
  menu.className = "action-menu";
  options.forEach(({ label, action }) => {
    const item = document.createElement("button");
    item.type = "button";
    item.textContent = label;
    item.addEventListener("click", () => {
      closeMenu();
      action();
    });
    menu.append(item);
  });
  button.insertAdjacentElement("afterend", menu);
  openMenu = menu;
}

refreshButton.addEventListener("click", () => {
  refreshButton.disabled = true;
  refreshButton.textContent = "Refreshing…";
  window.setTimeout(() => {
    document.querySelector(".activity-list time").textContent = "just now";
    refreshButton.disabled = false;
    refreshButton.textContent = "✓ Updated just now";
    window.setTimeout(() => { refreshButton.textContent = "Refresh activity"; }, 1600);
  }, 500);
});

document.querySelector("#show-all").addEventListener("click", (event) => {
  const expanded = agentList.classList.toggle("show-all");
  event.currentTarget.textContent = expanded ? "Show fewer" : "View all";
});

document.querySelector("#profile-button").addEventListener("click", (event) => {
  showMenu(event.currentTarget, [
    { label: "Jamie Davis · Profile", action: () => announce("Signed in as Jamie Davis.") },
    { label: "Workspace preferences", action: () => announce("Workspace preferences are ready to configure.") },
  ]);
});

agentList.addEventListener("click", (event) => {
  const button = event.target.closest(".agent-action");
  if (!button) return;
  const agent = button.closest(".agent");
  const name = agent.querySelector(".agent-info strong").textContent;
  const status = agent.querySelector(".status");
  const isPaused = status.classList.contains("paused");
  showMenu(button, [
    {
      label: isPaused ? "Resume agent" : "Pause agent",
      action: () => {
        status.className = `status ${isPaused ? "running" : "paused"}`;
        status.innerHTML = `<i></i>${isPaused ? "Running" : "Paused"}`;
        agent.querySelector(".agent-info span").textContent = isPaused ? "Agent resumed just now" : "Paused by you just now";
      },
    },
    { label: `View ${name} activity`, action: () => announce(`${name} activity is highlighted in the feed.`) },
  ]);
});

document.addEventListener("click", (event) => {
  if (openMenu && !openMenu.contains(event.target) && !event.target.closest("#profile-button, .agent-action")) closeMenu();
});
