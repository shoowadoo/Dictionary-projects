// uppercase words are ommitted currently from dictionary
// also this needs to be fixed when searching

const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("word");
const meaningEl = document.getElementById("translation");

// console.log("hello");

async function fetchAPI(word) {
    try {
        infoTextEl.style.display = "block";
        meaningContainerEl.style.display = "none";
        infoTextEl.innerText = `Searching for the meaning of "${word}"`;

        // for english to gwich'in
        const url = 'englishToGwichin.json';
        const result = await fetch(url).then((response) => response.json());

        // for gwich'in to english
        const url2 = 'gwichinToEnglish_newChar.json';
        const result2 = await fetch(url2).then((response) => response.json());
        
        // makes sure that the input word is lowercase and trimmed of any spaces
        word_lower = word.toLowerCase().trim();

        let pattern = new RegExp("\\b" + word_lower + "\\b", "u");

        //let startBoundary = "(?:^|\\s)"; // Matches start of string or any whitespace
        //let endBoundary = "(?:$|\\s)"; // Matches end of string or any whitespace
        //let pattern = new RegExp(startBoundary + word_lower + endBoundary, "u");

        // let pattern = new RegExp(`(?<=\\P{L}|^)${word_lower}(?=\\P{L}|$)`, "gu");


        let my_array = [];
        for (key in result) {
            key_lower = key.toLowerCase();
            // right now this looks for character matches in string, but may need to refine to look for just word using regex;
            // but currently there is also cross-check to make sure that the word is in the dictionary by itself and not just a substring of the entry
            //if (key_lower.includes(word_lower)) 
            if (pattern.test(key_lower))
            {
                my_array.push(key);
            }   
        }
       
        let new_array = [];

        for (entry of my_array) {
            new_array.push("\n" + `${entry}: ${result[entry].join(', ')}`+ "\n");
        }
        
        // may or may not need this
        
        //------------------------------------------Gwich'in to English------------------------------------------
        // for gwich'in to english
        let my_array2 = [];
        let new_array2 = [];
        for (key in result2) {
            key_lower = key.toLowerCase();
            //if (key_lower.includes(word_lower)) 
            if (pattern.test(key_lower))
            {
                my_array2.push(key);
            }   
        }

        console.log(my_array2);
        
        for (entry of my_array2) {
            new_array2.push("\n" + `${entry}: ${result2[entry].join(', ')}`+ "\n");
        }
        console.log(new_array2);
        

        //--------------------------------__DISPLAY__--------------------------------


        // I think this looks for an exact match and this is a problem right now... being corrected 
        // make like below for result2
        if (new_array.length > 0) {
            
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            titleEl.innerText = word;
            meaningEl.innerText = new_array.join('');
        } //else if (word in result2) 
        // this checks that the array is not empty and that the word is in the dictionary by itself so that it doesn't just match characters in the middle of a word or string
        //else if (new_array2.length > 0 && word_lower in result2)
        else if (new_array2.length > 0)
        {
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            titleEl.innerText = word;
            meaningEl.innerText = new_array2.join('');
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
