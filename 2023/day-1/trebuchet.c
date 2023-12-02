#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAXLINE 1000

int get_line(char line[], int max);
void word_to_digit(char line[]);
int get_calval(char string[]);

int main(void)
{
	int len;
	int sum;
	char line[MAXLINE];

	while ((len = get_line(line, MAXLINE)) > 0) {
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

void word_to_digit(char line[])
{
	char num_words[10][10] = { "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" };

	return;
}

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
