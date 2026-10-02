const rows = [...document.querySelectorAll(".experiment-row")];
const saveButton = document.querySelector("#save-experiment");
const saveStatus = document.querySelector("#save-status");
let selectedRow = rows[0];

function selectExperiment(row) {
    selectedRow = row;
    rows.forEach((item) => {
        const selected = item === row;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-selected", String(selected));
    });

    document.querySelector("#detail-title").textContent = `Experiment ${row.dataset.id}`;
    document.querySelector("#detail-status").textContent = row.dataset.status;
    document.querySelector("#detail-status").className = `status status-${row.dataset.status.toLowerCase() === "completed" ? "complete" : row.dataset.status.toLowerCase()}`;
    document.querySelector("#detail-model").textContent = row.dataset.model;
    document.querySelector("#detail-dataset").textContent = row.dataset.dataset;
    document.querySelector("#detail-rate").textContent = row.dataset.learningRate;
    document.querySelector("#detail-trees").textContent = row.dataset.trees;
    document.querySelector("#detail-accuracy").textContent = row.dataset.accuracy;
    document.querySelector("#detail-duration").textContent = row.dataset.duration;
    saveStatus.textContent = "";
    saveButton.disabled = false;
    saveButton.textContent = "Save selected experiment";
}

rows.forEach((row) => {
    row.querySelector("[data-view-experiment]").addEventListener("click", () => selectExperiment(row));
    row.addEventListener("keydown", (event) => {
        if (event.target === row && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            selectExperiment(row);
        }
    });
});

saveButton.addEventListener("click", () => {
    const experiment = {
        id: selectedRow.dataset.id,
        model: selectedRow.dataset.model,
        dataset: selectedRow.dataset.dataset,
        accuracy: selectedRow.dataset.accuracy,
        savedAt: new Date().toISOString(),
    };

    try {
        const saved = JSON.parse(localStorage.getItem("qyvrenza-experiments") || "[]");
        const next = [experiment, ...saved.filter((item) => item.id !== experiment.id)].slice(0, 20);
        localStorage.setItem("qyvrenza-experiments", JSON.stringify(next));
        saveStatus.textContent = `Experiment ${experiment.id} saved in this browser.`;
        saveButton.textContent = "Experiment saved";
        saveButton.disabled = true;
    } catch {
        saveStatus.textContent = "Storage is unavailable in this browser.";
    }
});