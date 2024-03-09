const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("word");
const meaningEl = document.getElementById("translation");
const language = document.getElementById("language-select")

//console.log("hello");

function removeDiacritics(inputText) {
    return inputText.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function searchText() {
    if (language.value === 'language1') {
        inputEl.placeholder = "Search an English word"; // Placeholder for the first language
        infoTextEl.innerText = "Type an English word and press Enter";
    } else if (language.value === 'language2') {
        inputEl.placeholder = "Search a Gwich'in word"; // Placeholder for the second language
        infoTextEl.innerText = "Type a Gwich'in word and press Enter";
    }
}

searchText();

async function performSearch(word) {
    try {
        infoTextEl.style.display = "block";
        meaningContainerEl.style.display = "none";
        infoTextEl.innerText = `Searching for the meaning of "${word}"`;

        // makes sure that the input word is lowercase and trimmed of any spaces
        word_lower = word.toLowerCase().trim();

        let startBoundary = "(?:^|\\s|-|/)"; // Matches start of string, any whitespace, or a hyphen
        let endBoundary = "(?:$|\\s|-|,|/)"; // Matches end of string, any whitespace, or a hyphen
        let pattern = new RegExp(startBoundary + word_lower + endBoundary, "u");

        let dictionaryURL;

        if(language.value === 'language1') {
            dictionaryURL = 'englishToGwichin.json';
        }
        else if(language.value === 'language2') {
            dictionaryURL = 'gwichinToEnglish.json';
        }

        const result = await fetch(dictionaryURL).then((response) => response.json());

        let my_array = [];
        for (key in result) {

            key_normalized = removeDiacritics(key);
            key_lower = key_normalized.toLowerCase();
            if (pattern.test(key_lower))
            {
                my_array.push(key);
            }   
        }
       
        let new_array = [];

        for (entry of my_array) {
            new_array.push("\n" + `${entry}: ${result[entry].join(', ')}`+ "\n");
        }
        
        //--------------------------------__DISPLAY__--------------------------------

        if (new_array.length > 0) {
            
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            titleEl.innerText = word;
            meaningEl.innerText = new_array.join('');
            
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

//console.log('Script is running');

document.getElementById('language-select').addEventListener('change', function() {
    searchText();
});

// Event listener for input
inputEl.addEventListener("keyup", (e) => {
    console.log(e.target.value)
    if (e.target.value && e.key === "Enter") {
        let normalizedValue = e.target.value.replace(/’/g, '\'').normalize('NFC');
        let searchValue = removeDiacritics(normalizedValue);
        performSearch(searchValue);
        console.log("fetched");
        e.target.value = "";
    }

});

