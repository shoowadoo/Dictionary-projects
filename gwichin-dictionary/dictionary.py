import json

# Read the text file 
with open('dictionary.txt', 'r', encoding='utf-8') as file:
    text = file.read()

# Split the text into lines
lines = text.split('\n')

# Define an empty dictionary to store the entries
englishToGwichin = {}  
gwichinToEnglish = {}

# Iterate over each line of the text
for line in lines:
    # Trim any leading or trailing whitespace
    line = line.strip()
    
    # Skip empty lines and lines starting with " " or upper case
    # if line == '' or line.startswith(' ') or line[0].isupper():
    if line == '' or line.startswith(':') or 'accidental' in line or 'rare' in line or 'hypothetical' in line:
        continue
    
    # Split the line into Gwichin and English parts using " " as the separator
    parts = line.split(':')
        
    if len(parts) > 1 and parts[1].strip() != "":
        # Extract the Gwichin word and English translation
        gwichin_word = parts[0].strip()
        english_word = parts[1].strip()
    
    #initial_letter = gwichin_word[0].upper()
        
    ##if initial_letter not in englishToGwichin:
        ##dictionary[initial_letter] = {}

    # Add the entry to the dictionary under the initial letter

    #dictionary[initial_letter][gwichin_word] = english_translation
        
        if gwichin_word in gwichinToEnglish:
        
            gwichinToEnglish[gwichin_word].append(english_word)
        else:
            gwichinToEnglish[gwichin_word] = [english_word]
        
        if english_word in englishToGwichin: 
            englishToGwichin[english_word].append(gwichin_word)
        else:
            englishToGwichin[english_word] = [gwichin_word]

# remove duplicates     
for key in gwichinToEnglish:
    gwichinToEnglish[key] = list(set(gwichinToEnglish[key]))

for key in englishToGwichin:
    englishToGwichin[key] = list(set(englishToGwichin[key]))

#print(gwichinToEnglish)

# convert chars so it works with installed gwich’in keyboard 
replace_mapping = {
    'õ': 'ǫ',
    'ą': 'ą',
    'į': 'į',
    'ų': 'ų',
    '\'': '’',
    'ł': 'ł',
}

# Function to replace characters based on the mapping
def replace_characters(original_string, mapping):
    for old_char, new_char in mapping.items():
        original_string = original_string.replace(old_char, new_char)
    return original_string

gwi_en_new_chars = {}

for key, value in gwichinToEnglish.items():
    new_key = replace_characters(key, replace_mapping)
    gwi_en_new_chars[new_key] = value
    
json_data = json.dumps(dict(sorted(gwichinToEnglish.items())), indent=2, ensure_ascii=False)

json_data_new = json.dumps(dict(sorted(gwi_en_new_chars.items())), indent=2, ensure_ascii=False)

with open('gwichinToEnglish_newChar.json', 'w', encoding='utf-8') as file:
    file.write(json_data_new)

# Save the JSON to a file
with open('gwichinToEnglish.json', 'w', encoding='utf-8') as file:
    file.write(json_data)
    
#json_data = json.dumps(dict(sorted(englishToGwichin.items())), indent=2, ensure_ascii=False)

# Save the JSON to a file
with open('englishToGwichin.json', 'w', encoding='utf-8') as file:
    file.write(json_data)