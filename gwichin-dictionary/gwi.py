import json 
import re
from collections import OrderedDict

# Read the first JSON file
with open('englishToGwichin.json', 'r', encoding='utf-8') as file:
    data1 = json.load(file)

# Read the second JSON file
with open('/Users/kirk/gwi_junior/gwi_junior.json', 'r', encoding='utf-8') as file:
    data2 = json.load(file)
    
merged_data = {**data1, **data2}

# Sort the dictionary by key
sorted_data = OrderedDict(sorted(merged_data.items()))

# Optionally, convert back to a regular dictionary in Python 3.7+ where dictionaries are ordered
sorted_data = dict(sorted_data)


with open('gwi.json', 'w', encoding='utf-8') as file:
    json.dump(sorted_data, file, ensure_ascii=False, indent=4)