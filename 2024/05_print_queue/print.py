before_after = {}
after_before = {}
queues = []

with open("input.txt") as f:
    data = f.read().split("\n\n")
    for order in data[0].splitlines():
        before, after = [int(x) for x in order.split("|")]

        if before not in before_after:
            before_after[before] = set()
        before_after[before].add(after)

        if after not in after_before:
            after_before[after] = set()
        after_before[after].add(before)

    for queue in data[1].splitlines():
        queues.append([int(x) for x in queue.split(",")])


def valid_queue(queue: list[int]) -> bool:
    prev_pages = set()

    for page in queue:
        must_come_after = before_after.get(page)
        if must_come_after is None:
            prev_pages.add(page)
            continue

        for prev_page in prev_pages:
            if prev_page in must_come_after:
                return False
        prev_pages.add(page)

    return True


def sum_of_valid() -> int:
    sum = 0
    for queue in queues:
        if valid_queue(queue):
            sum += queue[len(queue) // 2]
    return sum


def reorder_queue(queue: list[int]) -> list[int]:
    reordered = queue[:]
    last = len(reordered) - 1

    unordered = True
    while unordered:
        unordered = False
        for i in range(last):
            must_come_before = after_before.get(reordered[i])
            if must_come_before is None:
                continue

            if reordered[i + 1] in must_come_before:
                reordered[i], reordered[i + 1] = reordered[i + 1], reordered[i]
                unordered = True
        last -= 1
    return reordered


def sum_of_invalid() -> int:
    invalid = []
    for queue in queues:
        if not valid_queue(queue):
            invalid.append(queue)

    reordered = []
    for queue in invalid:
        reordered.append(reorder_queue(queue))

    sum = 0
    for queue in reordered:
        sum += queue[len(queue) // 2]
    return sum


print(f"Part 1: {sum_of_valid()}")
print(f"Part 2: {sum_of_invalid()}")
