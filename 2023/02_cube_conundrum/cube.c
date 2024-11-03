#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAXLINE   1000
#define MAXTOKEN  100
#define MAXGAMES  100
#define MAXROUNDS 10

#define MAXRED    12
#define MAXGREEN  13
#define MAXBLUE   14

struct Round {
	int red_count;
	int green_count;
	int blue_count;
};

struct Round round_init(void)
{
	struct Round r = { 0, 0, 0 };
	return r;
}

struct Game {
	int num;
	int count;
	struct Round *rounds;
};

struct Game game_init(void)
{
	struct Round *rounds = malloc(sizeof(struct Round) * MAXROUNDS);
	struct Game g = { 0, 0, rounds };
	return g;
}

struct Game game_data(char* s);
struct Round round_data(char *s);
int get_num(char *s);
void print_game(struct Game g);
int sum_valid_game_ids(struct Game games[], int size);
long sum_game_power_sets(struct Game games[], int size);

int main(void)
{
	FILE *fp = fopen("input.txt", "r");
	char *s = malloc(MAXLINE);
	struct Game games[MAXGAMES];

	int g_index = 0;
	while (fgets(s, MAXLINE, fp)) {
		games[g_index++] = game_data(s);
	}

	for (int i = 0; i < g_index; i++) {
		print_game(games[i]);
	}

	int valid_sum = sum_valid_game_ids(games, g_index);
	long power_sum = sum_game_power_sets(games, g_index);

	printf("Sum of valid game IDs is %d\n", valid_sum);
	printf("Sum of game power sets is %ld\n", power_sum);

	return 0;
}

struct Game game_data(char* s)
{
	char *tmp = malloc(strlen(s) + 1);
	strcpy(tmp, s);

	char *savept;
	char *t = strtok_r(tmp, ":", &savept);

	struct Game g = game_init();
	g.num = get_num(t);
	
	t = strtok_r(NULL, ";", &savept);
	while(t != NULL) {
		g.rounds[g.count++] = round_data(t);
		t = strtok_r(NULL, ";", &savept);
	}

	free(tmp);
	return g;
}

struct Round round_data(char *s)
{
	char *tmp = malloc(strlen(s) + 1);
	strcpy(tmp, s);
	
	struct Round r = round_init();

	char *savept;
	char *t = strtok_r(tmp, ",", &savept);

	while (t != NULL) {		
       		if (strstr(t, "red")) {
			r.red_count += get_num(t);
		} else if (strstr(t, "green")) {
			r.green_count += get_num(t);
		} else if (strstr(t, "blue")) {
			r.blue_count += get_num(t);
		}
		t = strtok_r(NULL, ",", &savept);
	}

	free(tmp);
	return r;
}

int get_num(char *s)
{
	int num;

	int i = 0;
	while (s[i] != '\0') {
		if (isdigit(s[i]))
			break;
		i++;
	}

	// return 0 if string has no digits
	if (s[i] == '\0')
		return 0;

	return atoi(s + i);
}

void print_game(struct Game g)
{
	printf("GAME %d:\n", g.num);

	for (int i = 0; i < g.count; i++) {
		struct Round r = g.rounds[i];
		printf("Round %d: R(%d) G(%d) B(%d)\n",
		       i + 1, r.red_count, r.green_count, r.blue_count);
	}
}

int sum_valid_game_ids(struct Game games[], int size)
{
	int sum = 0;

	for (int i = 0; i < size; i++) {
		struct Game g = games[i];
		int valid = 1;

		for (int j = 0; j < g.count; j++) {
			struct Round r = g.rounds[j];
			if (r.red_count > MAXRED ||
			    r.green_count > MAXGREEN ||
			    r.blue_count > MAXBLUE) {
				valid = 0;
				break;
			}
		}

		if (valid) {
			sum += g.num;
		}
	}

	return sum;
}

long sum_game_power_sets(struct Game games[], int size)
{
	long sum = 0;

	for(int i = 0; i < size; i++) {
		struct Game g = games[i];
		int rmax = 0;
		int gmax = 0;
		int bmax = 0;

		for (int j = 0; j < g.count; j++) {
			struct Round r = g.rounds[j];
			if (r.red_count > rmax)
				rmax = r.red_count;
			if (r.green_count > gmax)
				gmax = r.green_count;
			if (r.blue_count > bmax)
				bmax = r.blue_count;
		}

		sum += rmax * gmax * bmax;
	}

	return sum;
}
