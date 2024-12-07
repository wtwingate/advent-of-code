# depth = num of operands - 1
# possible permutations = 2^n where n is num of operators
# Depth 1:  +                 *
# Depth 2:  ++       +*       *+       **
# Depth 3:  +++ ++*  +*+ +**  *++ *+*  **+ ***


def make_permutations(ops, depth) -> list[str]:
    if depth == 1:
        return ops

    perms = make_permutations(ops, depth - 1)

    new_perms = []
    for perm in perms:
        for op in ops:
            new_perms.append(op + perm)

    return new_perms


def calc_result(operands, operators) -> int:
    rand_stack = operands[::-1]
    rator_stack = operators[::-1]

    # there are operators to apply
    while len(rator_stack) > 0:
        n1 = rand_stack.pop()
        n2 = rand_stack.pop()
        op = rator_stack.pop()

        if op == "+":
            res = n1 + n2
        elif op == "*":
            res = n1 * n2
        elif op == "|":
            s1, s2 = str(n1), str(n2)
            res = int(s1 + s2)

        rand_stack.append(res)

    # return sole value in stack
    return rand_stack.pop()


operands = {}
with open("input.txt") as f:
    lines = f.read().splitlines()
    for line in lines:
        res, ops = line.split(": ")
        operands[int(res)] = [int(x) for x in ops.split(" ")]

p1 = 0
p2 = 0
for res, rands in operands.items():
    perms_p1 = make_permutations(["+", "*"], len(rands) - 1)
    for rators in perms_p1:
        if res == calc_result(rands, list(rators)):
            p1 += res
            break
    # NOTE: according to the problem description, the string
    # concatenation operator is supposed to be "||". I've opted
    # to use a single "|" instead to keep things simpler
    perms_p2 = make_permutations(["+", "*", "|"], len(rands) - 1)
    for rators in perms_p2:
        if res == calc_result(rands, list(rators)):
            p2 += res
            break


print(f"Part 1: {p1}")
print(f"Part 2: {p2}")
