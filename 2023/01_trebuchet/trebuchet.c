#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAXLINE 80  /* maximum line length */

const char *number_names[] = {
	"zero", "one", "two", "three", "four",
	"five", "six", "seven", "eight", "nine",
};

long get_line_num(char *s);

int main(void)
{
	FILE *fp = fopen("input.txt", "r");
	/* FILE *fp = fopen("example1.txt", "r"); */
	/* FILE *fp = fopen("example2.txt", "r"); */

	char line[MAXLINE];
	long sum = 0L;

	while(fgets(line, MAXLINE, fp) != NULL) {
		sum += get_line_num(line);
	}

	printf("%ld\n", sum);

	return EXIT_SUCCESS;
}

/* get value of two-digit number embedded in string */
long get_line_num(char *s)
{
	int first_num;
	int second_num;
	int full_num;

	/* search string from start for first number */
	for (int i = 0; s[i] != '\0'; i++) {
		if (isdigit(s[i])) {
			first_num = s[i] - '0';
			break;
		} else {
			int found = 0;
			for (int k = 0; k < 10; k++) {
				if (strstr(s + i, number_names[k]) == s + i) {
					first_num = k;
					found = 1;
					break;
				}
			}
			if (found) {
				break;
			}
		}
	}

	/* search string from end for second number */
	for (int j = strlen(s); s[j] >= 0; j--) {
		if (isdigit(s[j])) {
			second_num = s[j] - '0';
			break;
		} else {
			int found = 0;
			for (int k = 0; k < 10; k++) {
				if (strstr(s + j, number_names[k]) == s + j) {
					second_num = k;
					found = 1;
					break;
				}
			}
			if (found) {
				break;
			}
		}
	}

	full_num = first_num * 10 + second_num;

	printf("%d\t%s", full_num, s);

	return (long) full_num;
}
