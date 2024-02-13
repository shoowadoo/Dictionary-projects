const fs = require('fs');

// Read the text file
const text = fs.readFileSync('dictionary.txt', 'utf-8');

// Split the text into lines
const lines = text.split('\n');

// Define an empty object to store the dictionary entries
const dictionary = {};

// Iterate over each line of the text
for (let line of lines) {
  // Trim any leading or trailing whitespace
  line = line.trim();

  // Skip empty lines and lines starting with "="
  if (line === '' || line.startsWith('=')) {
    continue;
  }

  // Split the line into English and Esperanto parts using "=" as the separator
  const parts = line.split('=');

  // Extract the English word and Esperanto translation
  const englishWord = parts[0].trim();
  const esperantoTranslation = parts[1].trim();

  dictionary[englishWord] = esperantoTranslation;
}

// Convert the dictionary object to JSON
const json = JSON.stringify(dictionary, null, 2);

// Save the JSON to a file
fs.writeFileSync('dictionary.json', json, 'utf-8');
