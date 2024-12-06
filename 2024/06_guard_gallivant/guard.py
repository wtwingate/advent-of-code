grid = []
with open("input.txt") as f:
    for line in f.read().splitlines():
        grid.append([x for x in line])

height = len(grid)
width = len(grid[0])

start = (0, 0)
obstructions = set()
for y, row in enumerate(grid):
    for x, tile in enumerate(row):
        if tile == "^":
            start = (x, y)
        if tile == "#":
            obstructions.add((x, y))


def rotate(delta):
    if delta == (0, -1):
        return (1, 0)
    elif delta == (1, 0):
        return (0, 1)
    elif delta == (0, 1):
        return (-1, 0)
    elif delta == (-1, 0):
        return (0, -1)


def on_the_grid(coords):
    x, y = coords
    return 0 <= x <= width - 1 and 0 <= y <= height - 1


def record_visited():
    coords = start
    delta = (0, -1)
    visited = set()

    while on_the_grid(coords):
        visited.add(coords)

        next_coords = (coords[0] + delta[0], coords[1] + delta[1])

        while next_coords in obstructions:
            delta = rotate(delta)
            next_coords = (coords[0] + delta[0], coords[1] + delta[1])

        if not on_the_grid(next_coords):
            break

        coords = next_coords

    return visited


def looping_path(ob_coords):
    temp_obstructions = {ob_coords}
    temp_obstructions.update(obstructions)

    coords = start
    prev_coords = (None, None)
    delta = (0, -1)
    visited = set()

    while on_the_grid(coords):
        if (coords, prev_coords) in visited:
            return True

        visited.add((coords, prev_coords))

        next_coords = (coords[0] + delta[0], coords[1] + delta[1])

        while next_coords in temp_obstructions:
            delta = rotate(delta)
            next_coords = (coords[0] + delta[0], coords[1] + delta[1])

        if not on_the_grid(next_coords):
            break

        prev_coords = coords
        coords = next_coords

    return False


visited = record_visited()
p1 = len(visited)

p2 = 0
for coord in visited:
    if looping_path(coord):
        p2 += 1


print(f"Part 1: {p1}")
print(f"Part 2: {p2}")
