const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("word");
const meaningEl = document.getElementById("translation");
const language = document.getElementById("language-select")


async function fetchAPI(word) {
    try {
        infoTextEl.style.display = "block";
        meaningContainerEl.style.display = "none";
        infoTextEl.innerText = `Searching for the meaning of "${word}"`;

        const url = 'englishToEsperanto.json';
        const result = await fetch(url).then((response) => response.json());

        const url2 = 'esperantoToEnglish.json';
        const result2 = await fetch(url2).then((response) => response.json());

        word_lower = word.toLowerCase().trim();
        //let pattern = new RegExp(word_lower, "u");
        let pattern = new RegExp("\\b" + word_lower + "\\b", "u")
        //let dictionaryURL;

        /* if(language.value === 'language1') {
            dictionaryURL = 'englishToGwichin.json';
        }
        else if(language.value === 'language2') {
            dictionaryURL = 'gwichinToEnglish.json';
        } */

        let my_array = [];
        for (key in result) {

            //key_normalized = removeDiacritics(key);
            key_lower = key.toLowerCase();
            if (pattern.test(key_lower))
            {
                my_array.push(key);
            }   
        }
        console.log(my_array)
        let new_array = [];
        //console.log(result)
        for (entry of my_array) {
            console.log(result[entry])
            new_array.push("\n" + `${entry}: ${result[entry]}`+ "\n");
        }





        let my_array2 = [];
        for (key in result2) {

            //key_normalized = removeDiacritics(key);
            key_lower = key.toLowerCase();
            if (pattern.test(key_lower))
            {
                my_array2.push(key);
            }   
        }
        console.log(my_array2)
        let new_array2 = [];
        //console.log(result)
        for (entry of my_array2) {
            console.log(result2[entry])
            new_array2.push("\n" + `${entry}: ${result2[entry]}`+ "\n");
        }
        
        //--------------------------------__DISPLAY__--------------------------------

        if (new_array.length > 0) {
            
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            titleEl.innerText = word;
            meaningEl.innerText = new_array.join('');
            
        } else if (new_array2.length > 0) {
            
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            titleEl.innerText = word;
            meaningEl.innerText = new_array2.join('');
            
        } 
        else {
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
        //e.target.blur()
        if (window.innerWidth < 768) {
            // Blur the input on mobile devices to hide the keyboard
            e.target.blur(); // 'this' refers to the input element
        }
    }
});
