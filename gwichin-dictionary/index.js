// uppercase words are ommitted currently from dictionary
// also this needs to be fixed when searching

// since url2 and my_array2 etc are no longer needed, you can update variable names so there isn't a gap in numbering

const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("word");
const meaningEl = document.getElementById("translation");

// console.log("hello");

function removeDiacritics(inputText) {
    return inputText.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

async function fetchAPI(word) {
    try {
        infoTextEl.style.display = "block";
        meaningContainerEl.style.display = "none";
        infoTextEl.innerText = `Searching for the meaning of "${word}"`;

        // makes sure that the input word is lowercase and trimmed of any spaces
        word_lower = word.toLowerCase().trim();

        //let pattern = new RegExp("\\b" + word_lower + "\\b", "u");

        let startBoundary = "(?:^|\\s|-)"; // Matches start of string, any whitespace, or a hyphen
        let endBoundary = "(?:$|\\s|-|,)"; // Matches end of string, any whitespace, or a hyphen
        let pattern = new RegExp(startBoundary + word_lower + endBoundary, "u");

        //------------------------------------------English to Gwich'in------------------------------------------
        // for english to gwich'in
        
        const url = 'englishToGwichin.json';
        const result = await fetch(url).then((response) => response.json());

        let my_array = [];
        for (key in result) {

            key_normalized = removeDiacritics(key)
            key_lower = key_normalized.toLowerCase();
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

        //------------------------------------------Gwich'in to English------------------------------------------
        // for gwich'in with new chars to english
        /* const url2 = 'gwichinToEnglish_newChar.json';
        const result2 = await fetch(url2).then((response) => response.json());

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

        // console.log(my_array2);
        
        for (entry of my_array2) {
            new_array2.push("\n" + `${entry}: ${result2[entry].join(', ')}`+ "\n");
        } */
        // console.log(new_array2);



        // without new chars 
        const url3 = 'gwichinToEnglish.json';
        const result3 = await fetch(url3).then((response) => response.json());

        let my_array3 = [];
        let new_array3 = [];
        for (key in result3) {

            key_normalized = removeDiacritics(key)
            key_lower = key_normalized.toLowerCase();

            // key_lower = key.toLowerCase();
            //if (key_lower.includes(word_lower)) 
            if (pattern.test(key_lower))
            {
                my_array3.push(key);
            }   
        }
        
        for (entry of my_array3) {
            new_array3.push("\n" + `${entry}: ${result3[entry].join(', ')}`+ "\n");
        }
        
        //--------------------------------__DISPLAY__--------------------------------

        let concat_array = [];
        if (new_array.length > 0) {
            
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            titleEl.innerText = word;
            meaningEl.innerText = new_array.join('');
            if (new_array3.length > 0) {
                concat_array = new_array.concat(new_array3)
                meaningEl.innerText = concat_array.join('');
            }
            else {
                meaningEl.innerText = new_array.join('');
            }
        } 
        /* else if (new_array2.length > 0)
        {
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            titleEl.innerText = word;
            meaningEl.innerText = new_array2.join('');
        
        }  */
        else if (new_array3.length > 0)
        {
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            titleEl.innerText = word;
            meaningEl.innerText = new_array3.join('');
        
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
        let normalizedValue = e.target.value.replace(/’/g, '\'').normalize('NFC');
        let searchValue = removeDiacritics(normalizedValue);
        fetchAPI(searchValue);
        //fetchAPI(e.target.value);
        e.target.value = "";
    }
});
