#print("Hello")

test_list = {'family': ['Kirk', 'Mark', 'Jeff']}

test_list['family'].append('Lynda')

#print(test_list)

key = "daatsõõ"

#print(key)

print(key.replace('õ', 'ǫ'))


# Function to replace characters based on the mapping
def replace_characters(original_string, mapping):
    for old_char, new_char in mapping.items():
        original_string = original_string.replace(old_char, new_char)
    return original_string

# Using the function

original_dict = {"kõy": "value1", "käy": "value2", "küy": "value3"}
new_dict = {}
replace_mapping = {'õ': 'o', 'ä': 'a', 'ü': 'u'}

for key, value in original_dict.items():
    new_key = replace_characters(key, replace_mapping)  # Using the replace_characters function from Method 1
    new_dict[new_key] = value

print(new_dict)

