/* =========================================================
   QYVRENZA AI DOCUMENT SUMMARIZER
   ========================================================= */


/* ================= ELEMENTS ================= */

const fileInput =
    document.getElementById("fileInput");

const browseBtn =
    document.getElementById("browseBtn");

const dropZone =
    document.getElementById("dropZone");

const selectedFile =
    document.getElementById("selectedFile");

const fileName =
    document.getElementById("fileName");

const fileSize =
    document.getElementById("fileSize");

const removeFile =
    document.getElementById("removeFile");

const analyzeBtn =
    document.getElementById("analyzeBtn");

const previewTitle =
    document.getElementById("previewTitle");

const previewContent =
    document.getElementById("previewContent");

const status =
    document.getElementById("status");

const results =
    document.getElementById("results");

const summaryText =
    document.getElementById("summaryText");

const keyPoints =
    document.getElementById("keyPoints");

const topics =
    document.getElementById("topics");

const wordCount =
    document.getElementById("wordCount");

const statWords =
    document.getElementById("statWords");

const statPages =
    document.getElementById("statPages");

const copyBtn =
    document.getElementById("copyBtn");

const downloadBtn =
    document.getElementById("downloadBtn");

const themeBtn =
    document.getElementById("themeBtn");


let currentFile = null;


/* ================= BROWSE FILE ================= */

browseBtn.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

        fileInput.click();

    }
);


/* ================= DROP ZONE CLICK ================= */

dropZone.addEventListener(
    "click",
    () => {

        fileInput.click();

    }
);


/* ================= FILE SELECTED ================= */

fileInput.addEventListener(
    "change",
    () => {

        if (fileInput.files.length > 0) {

            handleFile(
                fileInput.files[0]
            );

        }

    }
);


/* ================= HANDLE FILE ================= */

function handleFile(file) {

    currentFile = file;


    fileName.textContent =
        file.name;


    fileSize.textContent =
        formatFileSize(file.size);


    selectedFile.style.display =
        "flex";


    analyzeBtn.disabled =
        false;


    previewTitle.textContent =
        file.name;


    status.classList.add("ready");

    status.innerHTML = `
        <span></span>
        Ready to analyze
    `;


    previewContent.innerHTML = `

        <div class="empty-preview">

            <div class="document-illustration">

                <i class="fa-solid fa-file-circle-check"></i>

                <div class="mini-line line1"></div>
                <div class="mini-line line2"></div>
                <div class="mini-line line3"></div>

            </div>

            <h4>
                Document ready
            </h4>

            <p>
                Your file is ready for AI analysis.
                Click <strong>Analyze Document</strong>
                to continue.
            </p>

        </div>

    `;

}


/* ================= FORMAT SIZE ================= */

function formatFileSize(bytes) {

    if (bytes === 0) {

        return "0 Bytes";

    }


    const units = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];


    const index =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );


    return (
        parseFloat(
            (
                bytes /
                Math.pow(1024,index)
            ).toFixed(2)
        )
        +
        " " +
        units[index]
    );

}


/* ================= REMOVE FILE ================= */

removeFile.addEventListener(
    "click",
    () => {

        currentFile = null;

        fileInput.value = "";

        selectedFile.style.display =
            "none";

        analyzeBtn.disabled =
            true;

        previewTitle.textContent =
            "No document selected";


        status.classList.remove("ready");

        status.innerHTML = `
            <span></span>
            Waiting
        `;


        previewContent.innerHTML = `

            <div class="empty-preview">

                <div class="document-illustration">

                    <i class="fa-regular fa-file-lines"></i>

                    <div class="mini-line line1"></div>
                    <div class="mini-line line2"></div>
                    <div class="mini-line line3"></div>

                </div>

                <h4>
                    Your summary will appear here
                </h4>

                <p>
                    Upload a document and click
                    <strong>Analyze Document</strong>
                    to generate AI insights.
                </p>

            </div>

        `;

    }
);


/* ================= DRAG EVENTS ================= */

dropZone.addEventListener(
    "dragover",
    (event) => {

        event.preventDefault();

        dropZone.classList.add("dragover");

    }
);


dropZone.addEventListener(
    "dragleave",
    () => {

        dropZone.classList.remove("dragover");

    }
);


dropZone.addEventListener(
    "drop",
    (event) => {

        event.preventDefault();

        dropZone.classList.remove("dragover");


        const files =
            event.dataTransfer.files;


        if (files.length > 0) {

            handleFile(files[0]);

        }

    }
);


/* ================= ANALYZE ================= */

analyzeBtn.addEventListener(
    "click",
    analyzeDocument
);


function analyzeDocument() {

    if (!currentFile) {

        return;

    }


    /* Button loading */

    analyzeBtn.disabled = true;

    analyzeBtn.innerHTML = `

        <span>

            <i class="fa-solid fa-spinner fa-spin"></i>

            Analyzing document...

        </span>

        <i class="fa-solid fa-brain"></i>

    `;


    status.innerHTML = `
        <span></span>
        AI analyzing
    `;


    status.classList.add("ready");


    /* Preview loading */

    previewContent.innerHTML = `

        <div class="empty-preview">

            <div class="upload-icon">

                <i class="fa-solid fa-brain"></i>

            </div>

            <h4>
                QYVRENZA is analyzing...
            </h4>

            <p>
                Extracting important information
                from your document.
            </p>

        </div>

    `;


    /* Simulate AI processing */

    setTimeout(
        () => {

            showResults();

        },
        1800
    );

}


/* ================= SHOW RESULTS ================= */

function showResults() {

    analyzeBtn.disabled = false;


    analyzeBtn.innerHTML = `

        <span>

            <i class="fa-solid fa-check"></i>

            Analysis Complete

        </span>

        <i class="fa-solid fa-arrow-right"></i>

    `;


    status.innerHTML = `
        <span></span>
        Complete
    `;


    previewContent.innerHTML = `

        <div class="empty-preview">

            <div class="upload-icon">

                <i class="fa-solid fa-circle-check"></i>

            </div>

            <h4>
                Analysis complete
            </h4>

            <p>
                QYVRENZA successfully extracted
                the important information.
            </p>

        </div>

    `;


    /* Summary */

    summaryText.innerHTML = `

        This document contains important information
        organized around its main subject and supporting
        concepts. QYVRENZA identified the central ideas,
        removed unnecessary repetition and converted the
        content into a concise overview. The analysis helps
        readers understand the document quickly while
        retaining the most relevant information and key
        conclusions.

    `;


    /* Key points */

    keyPoints.innerHTML = `

        <div class="point">
            <span>01</span>
            <p>
                The document presents its main topic
                and supporting information.
            </p>
        </div>

        <div class="point">
            <span>02</span>
            <p>
                Important concepts are connected
                throughout the document.
            </p>
        </div>

        <div class="point">
            <span>03</span>
            <p>
                The content can be reduced into
                concise and meaningful insights.
            </p>
        </div>

        <div class="point">
            <span>04</span>
            <p>
                The extracted information can help
                with faster understanding and revision.
            </p>
        </div>

    `;


    /* Topics */

    topics.innerHTML = `

        <span>Artificial Intelligence</span>
        <span>Technology</span>
        <span>Analysis</span>
        <span>Key Insights</span>

    `;


    /* Stats */

    const estimatedWords =
        Math.max(
            250,
            Math.floor(
                currentFile.size / 8
            )
        );


    statWords.textContent =
        estimatedWords.toLocaleString();


    statPages.textContent =
        Math.max(
            1,
            Math.ceil(
                estimatedWords / 450
            )
        );


    wordCount.textContent =
        estimatedWords.toLocaleString()
        + " words";


    /* Show result */

    results.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* ================= COPY SUMMARY ================= */

copyBtn.addEventListener(
    "click",
    async () => {

        const text =
            summaryText.innerText;


        try {

            await navigator.clipboard.writeText(text);


            const original =
                copyBtn.innerHTML;


            copyBtn.innerHTML = `
                <i class="fa-solid fa-check"></i>
                Copied
            `;


            setTimeout(
                () => {

                    copyBtn.innerHTML =
                        original;

                },
                1500
            );

        }

        catch(error) {

            alert(
                "Unable to copy summary."
            );

        }

    }
);


/* ================= DOWNLOAD SUMMARY ================= */

downloadBtn.addEventListener(
    "click",
    () => {

        const summary =
            summaryText.innerText;


        const points =
            keyPoints.innerText;


        const topicsText =
            topics.innerText;


        const content =

`QYVRENZA AI
DOCUMENT SUMMARY
==============================

DOCUMENT
${currentFile ? currentFile.name : "Document"}

SUMMARY
${summary}

KEY POINTS
${points}

MAIN TOPICS
${topicsText}

Generated by QYVRENZA AI
`;


        const blob =
            new Blob(
                [content],
                {
                    type: "text/plain"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            "QYVRENZA-Summary.txt";


        link.click();


        URL.revokeObjectURL(url);

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

        }

        else {

            icon.className =
                "fa-solid fa-moon";

        }

    }
);