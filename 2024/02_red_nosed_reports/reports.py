def dampened_report_safe(dampened):
    prev_num = None
    delta = dampened[1] - dampened[0]

    for num in dampened:
        if prev_num is None:
            prev_num = num
            continue

        diff = num - prev_num
        if abs(diff) < 1 or abs(diff) > 3:
            return False
        if diff * delta < 0:
            return False

        prev_num = num

    return True


def report_safe(report):
    for i, _ in enumerate(report):
        dampened = report[:i] + report[i + 1 :]
        if dampened_report_safe(dampened):
            return True
    return False


def count_safe_reports(filename):
    reports = []
    with open(filename) as f:
        for line in f.readlines():
            report = [int(n) for n in line.split()]
            reports.append(report)

    safe_count = 0
    for report in reports:
        if report_safe(report):
            safe_count += 1

    return safe_count


count = count_safe_reports("input.txt")
print(count)
