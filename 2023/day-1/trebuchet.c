#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAXLINE 1000

int get_line(char line[], int max);
void get_digits(char line[]);
int get_calval(char string[]);

int main(void)
{
	int len;
	int sum;
	char line[MAXLINE];

	while ((len = get_line(line, MAXLINE)) > 0) {
		get_digits(line);
		printf("%s\n", line);
		printf("%d\n", get_calval(line));
		sum += get_calval(line);
	}
	printf("Calibration value: %d\n", sum);

	return 0;
}

int get_line(char line[], int max)
{
	int i, c;
	int len;

	for (i = 0; i < max-1 && (c = getchar()) != EOF && c != '\n'; i++) {
		line[i] = c;
	}
	line[i] = '\0';

	return i;
}

void get_digits(char line[])
{
	int i, j;
	char *pword;
	char num_words[9][10] = { "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" };

	for (i = 0; i < 9; i++) {
		while ((pword = strstr(line, num_words[i])) != NULL) {
			for (j = 0; line[j] != '\0'; j++) {
				if (&line[j] == pword) {
					line[j] = '1' + i;
				}
			}
		}
	}
}

// Make function that walks through each line character by character
// if character is a digit, add it to digit array
// if character is a letter, mark the location, and begin checking forward to see if subsequent letters spell a number
// if it does spell a number, add the equivalent digit to digit array
// return to location mark and move forward by one character

int get_calval(char string[])
{
	int i, j;
	int digit_count = 0;
	char all_digits[MAXLINE];
	char two_digits[2];

	for (i = j = 0; string[i] != '\0'; i++) {
		if (string[i] >= '0' && string[i] <= '9') {
			digit_count++;
			all_digits[j++] = string[i];
		}
	}

	two_digits[0] = all_digits[0];
	two_digits[1] = all_digits[digit_count -1];

	return atoi(two_digits);
}
