import json


with open('dictionary.txt', 'r', encoding='utf-8') as file:
    text = file.read()


lines = text.split('\n')

# Define an empty dictionary to store the entries
dictionary = {}
count = 0
count2 = 0
count3 = 0

for line in lines:
    line = line.strip()
    count += 1
    
    if line == '' or line.startswith(' '):
        count3 +=1
        continue
    
    if line[0].isupper() and ' ' not in line and "'" not in line and "Ruff" not in line and "Savannah" not in line:
        
        category = line
        dictionary[category] = {}
        continue
    
    parts = line.split(' ')
    
    if len(parts) < 2:
        count2 += 1
        
    
    if len(parts) > 1:
        # Extract the Gwich'in word and English translation
        gwichin_word = parts[0].strip()
        english_translation = parts[1].strip()
    
    #initial_letter = gwichin_word[0].upper()
        
    #if initial_letter not in dictionary:
        #dictionary[initial_letter] = {}

    # Add the entry to the dictionary under the initial letter
    
    dictionary[category][gwichin_word] = english_translation

json_data = json.dumps(dictionary, indent=2, ensure_ascii=False)

# Save the JSON to a file
with open('tp_dictionary.json', 'w', encoding='utf-8') as file:
    file.write(json_data)