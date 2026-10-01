const canvas = document.querySelector("#workflow-canvas");
const canvasContent = document.querySelector("#canvas-content");
const dialog = document.querySelector("#workflow-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogContent = document.querySelector("#dialog-content");
const dialogConfirm = document.querySelector("#dialog-confirm");
let zoom = 100;
let confirmAction = () => {};
const savedInstructions = localStorage.getItem("orbit-workflow-instructions");
if (savedInstructions !== null) document.querySelector("#instruction").value = savedInstructions;

function showDialog(title, content, action = () => {}) {
  dialogTitle.textContent = title;
  dialogContent.replaceChildren();
  if (typeof content === "string") {
    const paragraph = document.createElement("p");
    paragraph.textContent = content;
    dialogContent.append(paragraph);
  } else {
    dialogContent.append(content);
  }
  confirmAction = action;
  dialogConfirm.hidden = false;
  dialog.showModal();
}

function showOptions(title, options) {
  const list = document.createElement("div");
  list.className = "dialog-options";
  options.forEach(({ label, action }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", () => {
      dialog.close();
      action();
    });
    list.append(button);
  });
  showDialog(title, list);
  dialogConfirm.hidden = true;
}

function getSteps() {
  return [...canvasContent.querySelectorAll(".step-card")];
}

function updateStepCount() {
  const count = getSteps().length;
  document.querySelector("#step-count").innerHTML = `${count} steps <span class="separator">·</span> Draft`;
}

function addWorkflowStep() {
  const number = getSteps().length + 1;
  const connector = document.createElement("div");
  connector.className = "connector";
  connector.innerHTML = "<span></span>";
  const step = document.createElement("article");
  step.className = "step-card added-step";
  step.innerHTML = `<div class="step-icon ai-icon">＋</div><div class="step-text"><small>NEW ACTION · STEP ${number}</small><strong>Configure your next step</strong><span>Choose an action to continue</span></div><button class="step-menu" aria-label="Step ${number} options">···</button>`;
  canvasContent.insertBefore(connector, document.querySelector("#canvas-add"));
  canvasContent.insertBefore(step, document.querySelector("#canvas-add"));
  document.querySelector(".canvas-heading p").textContent = "WORKFLOWS / LEAD GENERATION · UNSAVED";
  updateStepCount();
  step.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function updateZoom() {
  document.querySelector("#zoom-value").value = `${zoom}%`;
  canvasContent.style.transform = `scale(${zoom / 100})`;
}

document.querySelector("#add-step").addEventListener("click", addWorkflowStep);
document.querySelector("#canvas-add").addEventListener("click", addWorkflowStep);

document.querySelector("#run-workflow").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const original = button.textContent;
  button.disabled = true;
  button.textContent = "◌ Running workflow…";
  document.querySelector(".title-wrap span").innerHTML = "<i></i> Workflow run in progress";
  window.setTimeout(() => {
    button.disabled = false;
    button.textContent = original;
    document.querySelector(".title-wrap span").innerHTML = "<i></i> Run completed successfully";
    document.querySelectorAll(".step-card").forEach((step) => step.classList.add("step-complete"));
  }, 1000);
});

document.querySelector("#workflow-menu").addEventListener("click", () => {
  showOptions("Workflow options", [
    {
      label: "Duplicate last step",
      action: () => {
        const lastStep = getSteps().at(-1);
        const clone = lastStep.cloneNode(true);
        clone.removeAttribute("id");
        clone.classList.remove("step-complete");
        const connector = document.createElement("div");
        connector.className = "connector";
        connector.innerHTML = "<span></span>";
        canvasContent.insertBefore(connector, document.querySelector("#canvas-add"));
        canvasContent.insertBefore(clone, document.querySelector("#canvas-add"));
        updateStepCount();
      },
    },
    {
      label: "Export workflow JSON",
      action: () => {
        const data = {
          name: document.querySelector(".canvas-heading h1").textContent,
          instructions: document.querySelector("#instruction").value,
          steps: getSteps().map((step) => ({
            type: step.querySelector("small").textContent,
            name: step.querySelector("strong").textContent,
          })),
        };
        const link = document.createElement("a");
        link.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
        link.download = "ai-workflow.json";
        link.click();
        URL.revokeObjectURL(link.href);
      },
    },
  ]);
});

canvas.addEventListener("click", (event) => {
  const menuButton = event.target.closest(".step-menu");
  const step = event.target.closest(".step-card");
  if (menuButton && step) {
    showOptions("Step options", [
      { label: "Open step settings", action: () => {
        document.querySelector(".selected-step strong").textContent = step.querySelector("strong").textContent;
        document.querySelector(".selected-step small").textContent = step.querySelector("small").textContent;
        document.querySelector("#config-panel").classList.remove("settings-hidden");
      } },
      ...(step.id ? [] : [{ label: "Remove this step", action: () => {
        step.previousElementSibling?.classList.contains("connector") && step.previousElementSibling.remove();
        step.remove();
        updateStepCount();
      } }]),
    ]);
    return;
  }
  if (step) {
    document.querySelector(".selected-step strong").textContent = step.querySelector("strong").textContent;
    document.querySelector(".selected-step small").textContent = step.querySelector("small").textContent;
    document.querySelector("#config-panel").classList.remove("settings-hidden");
  }
});

document.querySelector("#close-settings").addEventListener("click", () => {
  document.querySelector("#config-panel").classList.add("settings-hidden");
});

document.querySelector("#add-field").addEventListener("click", () => {
  const label = document.createElement("label");
  label.className = "dialog-field";
  label.textContent = "Field name";
  const input = document.createElement("input");
  input.id = "new-field-name";
  input.placeholder = "e.g. Company website";
  label.append(input);
  showDialog("Add an output field", label, () => {
    const name = input.value.trim();
    if (!name) {
      input.focus();
      return false;
    }
    const chip = document.createElement("div");
    chip.className = "field-chip";
    const text = document.createElement("span");
    text.textContent = name;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.setAttribute("aria-label", `Remove ${name} field`);
    remove.textContent = "×";
    chip.append(text, remove);
    document.querySelector("#output-fields").append(chip);
    return true;
  });
  input.focus();
});

document.querySelector("#output-fields").addEventListener("click", (event) => {
  const remove = event.target.closest("button");
  if (remove) remove.closest(".field-chip").remove();
});

document.querySelector("#zoom-out").addEventListener("click", () => {
  zoom = Math.max(70, zoom - 10);
  updateZoom();
});
document.querySelector("#zoom-in").addEventListener("click", () => {
  zoom = Math.min(130, zoom + 10);
  updateZoom();
});

document.querySelector("#save-config").addEventListener("click", (event) => {
  localStorage.setItem("orbit-workflow-instructions", document.querySelector("#instruction").value);
  document.querySelector(".title-wrap span").innerHTML = "<i></i> All changes saved";
  event.currentTarget.textContent = "✓ Settings saved";
  window.setTimeout(() => { event.currentTarget.textContent = "Save settings"; }, 1600);
});

dialogConfirm.addEventListener("click", (event) => {
  event.preventDefault();
  const shouldClose = confirmAction();
  if (shouldClose !== false) dialog.close();
});
