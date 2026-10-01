const searchInput = document.getElementById("searchInput");
const aiAnswer = document.getElementById("aiAnswer");
const resultTitle = document.getElementById("resultTitle");


// SEARCH

function search() {

    const query = searchInput.value.trim();

    if (query === "") {

        searchInput.focus();

        return;
    }


    resultTitle.textContent =
        `Results for "${query}"`;


    aiAnswer.textContent =
        `QYVRENZA AI is analyzing your search for "${query}". ` +
        `The AI overview will summarize the most relevant ` +
        `information and help you understand the topic quickly.`;


    // Small animation

    aiAnswer.style.opacity = "0";


    setTimeout(() => {

        aiAnswer.style.transition = "0.4s";

        aiAnswer.style.opacity = "1";

    }, 100);

}


// ENTER KEY

searchInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            search();

        }

    }
);


// QUICK SEARCH

function setSearch(text) {

    searchInput.value = text;

    search();

}


// COPY AI ANSWER

function copyAnswer() {

    navigator.clipboard.writeText(
        aiAnswer.textContent
    );

    alert("AI answer copied!");

}


// THEME BUTTON

document
    .getElementById("themeBtn")
    .addEventListener("click", function() {

        document.body.classList.toggle("light-mode");

    });