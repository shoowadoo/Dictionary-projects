const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("word");
const meaningEl = document.getElementById("translation");

async function fetchAPI(word) {
    try {
        infoTextEl.style.display = "block";
        meaningContainerEl.style.display = "none";
        infoTextEl.innerText = `Searching for the meaning of "${word}"`;

        const url = 'englishToEsperanto.json';
        const result = await fetch(url).then((response) => response.json());

        const url2 = 'esperantoToEnglish.json';
        const result2 = await fetch(url2).then((response) => response.json());

        word = word.toLowerCase().trim();

        if (word in result) {
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            titleEl.innerText = word;
            meaningEl.innerText = result[word];
        } else if (word in result2) {
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            titleEl.innerText = word;
            meaningEl.innerText = result2[word];
        } else {
            meaningContainerEl.style.display = "block";
            infoTextEl.style.display = "none";
            titleEl.innerText = word;
            meaningEl.innerText = "N/A";
        }
    } catch (error) {
        console.log(error);
        infoTextEl.innerText = "An error happened. Try again later.";
    }
}
// Event listener for input
inputEl.addEventListener("keyup", (e) => {
    if (e.target.value && e.key === "Enter") {
        fetchAPI(e.target.value);
        e.target.value = "";
    }
});
