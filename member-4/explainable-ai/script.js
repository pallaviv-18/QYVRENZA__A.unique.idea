const generateButton = document.querySelector("#generate-explanation");
const explanationStatus = document.querySelector("#explanation-status");
const generatedExplanation = document.querySelector("#generated-explanation");
const generatedCopy = document.querySelector("#generated-copy");

generateButton.addEventListener("click", () => {
    const generatedAt = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date());
    document.querySelector(".model-details div:last-child dd").textContent = `Today, ${generatedAt}`;
    generatedCopy.textContent = "This customer is classified as high risk with 87% confidence. Higher monthly charges and a shorter contract period are the strongest signals increasing the score. Longer customer tenure reduces the score and partially offsets those risks. These values describe model contribution, not proof of cause.";
    generatedExplanation.hidden = false;
    explanationStatus.textContent = "Explanation refreshed from the feature contributions shown above.";
    generateButton.textContent = "Explanation refreshed";
    generateButton.disabled = true;
    generatedExplanation.scrollIntoView({ behavior: "smooth", block: "nearest" });
    window.setTimeout(() => {
        generateButton.textContent = "Generate explanation";
        generateButton.disabled = false;
    }, 1400);
});