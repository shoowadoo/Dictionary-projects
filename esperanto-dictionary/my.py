import json

# Read the text file with UTF-8 encoding
with open('dictionary.txt', 'r', encoding='utf-8') as file:
    text = file.read()

# Split the text into lines
lines = text.split('\n')

# Define an empty dictionary to store the entries
englishToEsperanto = {}
esperantoToEnglish = {}

# Iterate over each line of the text
for line in lines:
    # Trim any leading or trailing whitespace
    line = line.strip()

    # Skip empty lines and lines starting with "="
    if line == '' or line.startswith('='):
        continue

    # Split the line into English and Esperanto parts using "=" as the separator
    parts = line.split('=')

    # Extract the English word and Esperanto translation
    english_word = parts[0].strip().lower()
    esperanto_word = parts[1].strip()[:-1]

    # Get the initial letter of the English word
    #initial_letter = english_word[0].upper()

    # Check if the initial letter is already a key in the dictionary
    #if initial_letter not in englishToEsperanto:
        #englishToEsperanto[initial_letter] = {}

    # Add the entry to the dictionary under the initial letter
    englishToEsperanto[english_word] = esperanto_word
    esperantoToEnglish[esperanto_word] = english_word

# Convert the dictionary to JSON
json_data = json.dumps(englishToEsperanto, indent=2, ensure_ascii=False)

# Save the JSON to a file
with open('englishToEsperanto.json', 'w', encoding='utf-8') as file:
    file.write(json_data)
    
json_data = json.dumps(esperantoToEnglish, indent=2, ensure_ascii=False)

# Save the JSON to a file
with open('esperantoToEnglish.json', 'w', encoding='utf-8') as file:
    file.write(json_data)
