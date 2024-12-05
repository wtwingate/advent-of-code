import re

with open("input.txt") as f:
    data = f.read().strip()


def sum_of_muls(data: str) -> int:
    muls = re.findall(r"mul\((\d+),(\d+)\)", data)

    sum = 0
    for a, b in muls:
        sum += int(a) * int(b)

    return sum


def remove_dont_blocks(data: str) -> str:
    blocks = re.split(r"(do\(\)|don't\(\))", data)

    do = ""
    for i in range(len(blocks)):
        if i == 0:
            do += blocks[i]
            continue

        if blocks[i - 1] == "do()":
            do += blocks[i]

    return do


sum_of_muls(remove_dont_blocks(data))
