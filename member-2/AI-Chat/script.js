/* =========================================================
   QYVRENZA AI CHAT
   Interactive JavaScript
   ========================================================= */


/* ================= GET ELEMENTS ================= */

const messageInput = document.getElementById("messageInput");

const sendBtn = document.getElementById("sendBtn");

const messages = document.getElementById("messages");

const welcome = document.getElementById("welcome");

const newChatBtn = document.getElementById("newChatBtn");

const clearBtn = document.getElementById("clearBtn");

const themeBtn = document.getElementById("themeBtn");

const menuBtn = document.getElementById("menuBtn");

const sidebar = document.getElementById("sidebar");

const chatSearch = document.getElementById("chatSearch");


/* ================= AI RESPONSES ================= */

const responses = [

    {
        keywords: ["machine learning", "ml"],

        response:
        `Machine Learning is a branch of Artificial Intelligence that allows computers to learn patterns from data and make predictions or decisions without being explicitly programmed for every task.<br><br>
        <strong>Three common types are:</strong><br>
        • Supervised Learning<br>
        • Unsupervised Learning<br>
        • Reinforcement Learning<br><br>
        For example, a model can learn from previous student data and predict whether a student may get placed.`
    },


    {
        keywords: ["python"],

        response:
        `Python is a popular programming language widely used in AI, Machine Learning, Data Science and Web Development.<br><br>
        <strong>Why Python is popular:</strong><br>
        • Easy and readable syntax<br>
        • Large number of libraries<br>
        • Strong AI/ML ecosystem<br>
        • Beginner friendly<br><br>
        Popular libraries include NumPy, Pandas, Matplotlib and Scikit-learn.`
    },


    {
        keywords: ["data structure", "dsa"],

        response:
        `A Data Structure is a way of organizing and storing data so that it can be accessed and modified efficiently.<br><br>
        <strong>Common data structures:</strong><br>
        • Array<br>
        • Linked List<br>
        • Stack<br>
        • Queue<br>
        • Tree<br>
        • Graph<br><br>
        Choosing the right data structure can improve the efficiency of an algorithm.`
    },


    {
        keywords: ["project", "ai project"],

        response:
        `Here is a simple AI/ML project idea:<br><br>
        <strong>Student Career Success Prediction</strong><br><br>
        You can use student academic and career-related information to build a classification model that predicts a target such as placement status.<br><br>
        Suggested workflow:<br>
        1. Collect the dataset<br>
        2. Clean the data<br>
        3. Perform EDA<br>
        4. Encode categorical variables<br>
        5. Split the dataset<br>
        6. Train a model<br>
        7. Evaluate the model`
    },


    {
        keywords: ["html", "css", "javascript"],

        response:
        `HTML, CSS and JavaScript work together to create modern websites.<br><br>
        <strong>HTML</strong> → Structure<br>
        <strong>CSS</strong> → Design and layout<br>
        <strong>JavaScript</strong> → Interactivity<br><br>
        For example, HTML creates a button, CSS makes it beautiful, and JavaScript makes it perform an action when clicked.`
    }

];


/* ================= DEFAULT RESPONSE ================= */

const defaultResponse =
    `That's an interesting question! I can help you understand concepts, create projects, write code and learn step-by-step.<br><br>
    Try asking me about <strong>Python, AI, Machine Learning, Data Structures, Web Development</strong> or your college projects.`;


/* ================= SEND MESSAGE ================= */

function sendMessage(customMessage = null) {

    const text =
        customMessage || messageInput.value.trim();


    if (!text) {

        messageInput.focus();

        return;
    }


    /* Hide welcome */

    welcome.style.display = "none";


    /* Add user message */

    addMessage(text, "user");


    /* Clear input */

    messageInput.value = "";

    autoResize();


    /* Show typing */

    showTyping();


    /* Simulate AI response */

    setTimeout(() => {

        removeTyping();

        const answer = getAIResponse(text);

        addMessage(answer, "ai");

    }, 900 + Math.random() * 800);

}


/* ================= GET AI RESPONSE ================= */

function getAIResponse(question) {

    const lowerQuestion = question.toLowerCase();


    for (const item of responses) {

        const found = item.keywords.some(keyword =>
            lowerQuestion.includes(keyword)
        );


        if (found) {

            return item.response;
        }
    }


    return defaultResponse;
}


/* ================= ADD MESSAGE ================= */

function addMessage(content, type) {

    const message = document.createElement("div");

    message.className = `message ${type}`;


    const avatar = document.createElement("div");

    avatar.className =
        `message-avatar ${
            type === "ai"
            ? "ai-avatar"
            : "user-avatar"
        }`;


    avatar.innerHTML =
        type === "ai"
        ? '<i class="fa-solid fa-sparkles"></i>'
        : "J";


    const body = document.createElement("div");

    body.className = "message-body";


    const label = document.createElement("div");

    label.className = "message-label";

    label.textContent =
        type === "ai"
        ? "QYVRENZA AI"
        : "You";


    const contentBox = document.createElement("div");

    contentBox.className = "message-content";

    contentBox.innerHTML = content;


    body.appendChild(label);

    body.appendChild(contentBox);


    /* AI actions */

    if (type === "ai") {

        const actions =
            document.createElement("div");

        actions.className = "message-actions";


        actions.innerHTML = `

            <button class="copy-btn" title="Copy">
                <i class="fa-regular fa-copy"></i>
            </button>

            <button title="Helpful">
                <i class="fa-regular fa-thumbs-up"></i>
            </button>

            <button title="Not helpful">
                <i class="fa-regular fa-thumbs-down"></i>
            </button>

        `;


        body.appendChild(actions);


        const copyButton =
            actions.querySelector(".copy-btn");


        copyButton.addEventListener(
            "click",
            () => {

                const plainText =
                    contentBox.innerText;

                navigator.clipboard
                    .writeText(plainText)
                    .then(() => {

                        copyButton.innerHTML =
                            '<i class="fa-solid fa-check"></i>';

                        setTimeout(() => {

                            copyButton.innerHTML =
                                '<i class="fa-regular fa-copy"></i>';

                        }, 1500);

                    });

            }
        );

    }


    message.appendChild(avatar);

    message.appendChild(body);

    messages.appendChild(message);


    /* Scroll to bottom */

    setTimeout(() => {

        messages.parentElement.scrollTo({

            top:
                messages.parentElement.scrollHeight,

            behavior: "smooth"

        });

    }, 50);

}


/* ================= TYPING INDICATOR ================= */

function showTyping() {

    const typing =
        document.createElement("div");

    typing.className =
        "message typing-message";

    typing.id = "typingMessage";


    typing.innerHTML = `

        <div class="message-avatar ai-avatar">

            <i class="fa-solid fa-sparkles"></i>

        </div>

        <div class="message-body">

            <div class="message-label">
                QYVRENZA AI
            </div>

            <div class="message-content typing">

                <span></span>
                <span></span>
                <span></span>

            </div>

        </div>

    `;


    messages.appendChild(typing);


    messages.parentElement.scrollTo({

        top:
            messages.parentElement.scrollHeight,

        behavior: "smooth"

    });

}


/* ================= REMOVE TYPING ================= */

function removeTyping() {

    const typing =
        document.getElementById("typingMessage");


    if (typing) {

        typing.remove();

    }

}


/* ================= ENTER TO SEND ================= */

messageInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


/* ================= SEND BUTTON ================= */

sendBtn.addEventListener(
    "click",
    () => sendMessage()
);


/* ================= PROMPT CARDS ================= */

document
    .querySelectorAll(".prompt-card")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const prompt =
                    button.dataset.prompt;

                sendMessage(prompt);

            }
        );

    });


/* ================= SUGGESTIONS ================= */

document
    .querySelectorAll(".suggestion")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const prompt =
                    button.dataset.prompt;

                sendMessage(prompt);

            }
        );

    });


/* ================= NEW CHAT ================= */

newChatBtn.addEventListener(
    "click",
    () => {

        messages.innerHTML = "";

        welcome.style.display = "block";

        messageInput.value = "";

        messageInput.focus();

    }
);


/* ================= CLEAR CHAT ================= */

clearBtn.addEventListener(
    "click",
    () => {

        messages.innerHTML = "";

        welcome.style.display = "block";

    }
);


/* ================= THEME ================= */

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle("light");


        const icon =
            themeBtn.querySelector("i");


        if (
            document.body.classList.contains("light")
        ) {

            icon.className =
                "fa-solid fa-sun";

        } else {

            icon.className =
                "fa-solid fa-moon";

        }

    }
);


/* ================= MOBILE MENU ================= */

if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle("open");

        }
    );

}


/* ================= CHAT SEARCH ================= */

chatSearch.addEventListener(
    "input",
    () => {

        const query =
            chatSearch.value.toLowerCase();


        document
            .querySelectorAll(".history-item")
            .forEach(item => {

                const text =
                    item.innerText.toLowerCase();


                item.style.display =
                    text.includes(query)
                    ? "flex"
                    : "none";

            });

    }
);


/* ================= TEXTAREA AUTO RESIZE ================= */

messageInput.addEventListener(
    "input",
    autoResize
);


function autoResize() {

    messageInput.style.height = "auto";

    messageInput.style.height =
        Math.min(
            messageInput.scrollHeight,
            130
        ) + "px";

}


/* ================= VOICE BUTTON ================= */

const voiceBtn =
    document.querySelector(".voice-btn");


voiceBtn.addEventListener(
    "click",
    () => {

        voiceBtn.innerHTML =
            '<i class="fa-solid fa-waveform-lines"></i>';

        voiceBtn.style.color =
            "#a78bfa";


        setTimeout(() => {

            voiceBtn.innerHTML =
                '<i class="fa-solid fa-microphone"></i>';

            voiceBtn.style.color = "";

        }, 2000);

    }
);


/* ================= ATTACHMENT BUTTON ================= */

const attachBtn =
    document.querySelector(".input-tool");


attachBtn.addEventListener(
    "click",
    () => {

        const input =
            document.createElement("input");

        input.type = "file";

        input.accept =
            ".pdf,.doc,.docx,.txt,.csv";


        input.click();


        input.addEventListener(
            "change",
            () => {

                if (input.files.length > 0) {

                    messageInput.value =
                        `Attached: ${input.files[0].name}`;

                    messageInput.focus();

                }

            }
        );

    }
);


/* ================= INITIAL FOCUS ================= */

window.addEventListener(
    "load",
    () => {

        messageInput.focus();

    }
);