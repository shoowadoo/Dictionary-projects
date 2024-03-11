import json

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

    englishToEsperanto[english_word] = esperanto_word
    
    if esperanto_word in esperantoToEnglish:
        esperantoToEnglish[esperanto_word].append(english_word)
    else: 
        esperantoToEnglish[esperanto_word] = [english_word]

# Convert the dictionary to JSON
json_data = json.dumps(englishToEsperanto, indent=2, ensure_ascii=False)

# Save the JSON to a file
with open('englishToEsperanto.json', 'w', encoding='utf-8') as file:
    file.write(json_data)
    
json_data = json.dumps(dict(sorted(esperantoToEnglish.items())), indent=2, ensure_ascii=False)
#json_data = json.dumps(esperantoToEnglish, indent=2, ensure_ascii=False)

# Save the JSON to a file
with open('esperantoToEnglish.json', 'w', encoding='utf-8') as file:
    file.write(json_data)

print(len(englishToEsperanto))
print(len(esperantoToEnglish))
#print(esperantoToEnglish['hundo']) ['dog', 'hound']
