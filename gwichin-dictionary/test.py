line = " yellow-billed loon            accidental"

if line.startswith(" "):
    line = line[1:]
new_line = line.split(" ")

print(new_line)

line2 = "moose"

if line2[0].isupper():
    print("Uppercase word")
else:
    print("Lowercase word")