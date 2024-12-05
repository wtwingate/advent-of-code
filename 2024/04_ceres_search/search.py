data = []
with open("input.txt") as f:
    data = [line.strip() for line in f.readlines()]

num_rows = len(data)
num_cols = len(data[0])
deltas = ((0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1), (-1, 0), (-1, 1))
matches = [["M", "A", "S"], ["S", "A", "M"]]


# Part 1
def check_for_word(row, col, delta, word):
    # full word has been found
    if word == "":
        return True

    # off the grid
    if not 0 <= row <= num_rows - 1:
        return False
    if not 0 <= col <= num_cols - 1:
        return False

    # letter does not match
    if data[row][col] != word[0]:
        return False

    next_row = row + delta[0]
    next_col = col + delta[1]

    # continue checking next letter
    return check_for_word(next_row, next_col, delta, word[1:])


# Part 2
def check_for_x_mas(row, col):
    # off the grid
    if row - 1 < 0 or row + 1 > num_rows - 1:
        return False
    if col - 1 < 0 or col + 1 > num_cols - 1:
        return False

    diag1 = [data[row - 1][col - 1], data[row][col], data[row + 1][col + 1]]
    diag2 = [data[row + 1][col - 1], data[row][col], data[row - 1][col + 1]]

    return diag1 in matches and diag2 in matches


p1 = 0
p2 = 0
for row in range(num_rows):
    for col in range(num_cols):
        # Part 1
        if data[row][col] == "X":
            for delta in deltas:
                if check_for_word(row, col, delta, "XMAS"):
                    p1 += 1

        # Part 2
        if data[row][col] == "A":
            if check_for_x_mas(row, col):
                p2 += 1

print(p1)
print(p2)
