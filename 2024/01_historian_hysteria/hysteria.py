left = []
right = []

with open("input.txt", "r") as f:
    for line in f.readlines():
        left.append(int(line.split()[0]))
        right.append(int(line.split()[1]))

# left.sort()
# right.sort()

# sum = 0
# for i in range(len(left)):
#     sum += abs(left[i] - right[i])
# print(sum)

occurences = {}
for m in right:
    if m not in occurences:
        occurences[m] = 0
    occurences[m] += 1

sum = 0
for n in left:
    o = occurences.get(n)
    if o:
        sum += n * o

print(sum)
