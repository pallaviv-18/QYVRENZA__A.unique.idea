const refreshButton = document.querySelector("#refresh-monitoring");
const refreshStatus = document.querySelector("#refresh-status");

refreshButton.addEventListener("click", () => {
    refreshButton.disabled = true;
    refreshButton.textContent = "Refreshing snapshot...";
    window.setTimeout(() => {
        const time = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date());
        refreshStatus.textContent = `Snapshot refreshed today at ${time}. Sample telemetry; no live service is connected.`;
        refreshButton.textContent = "Snapshot refreshed";
        window.setTimeout(() => {
            refreshButton.disabled = false;
            refreshButton.textContent = "Refresh snapshot";
        }, 1100);
    }, 350);
});