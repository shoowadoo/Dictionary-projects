# cleans up the text for processing

import re

def remove_patterns_from_file(file_path):
    with open(file_path, 'r') as file:
        text = file.read()

    # Remove question marks
    text = text.replace('?', '')

    # Remove "page + num" pattern
    text = re.sub(r'page \d+', '', text)
    
    text = text.replace('Check!', '')
    
    text = text.replace('=', '')

    # Save the modified text back to the file
    with open("dictionary.txt", 'w') as file:
        file.write(text)

# Specify the path to the text file
file_path = 'KU960M1991_March1994.txt'

# Call the function to remove the patterns from the file
remove_patterns_from_file(file_path)