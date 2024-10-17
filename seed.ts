import { copycat } from "@snaplet/copycat";
import { createSeedClient } from "@snaplet/seed";

const main = async () => {
	const seed = await createSeedClient({ dryRun: true });

	// Truncate all tables in the database
	await seed.$resetDatabase();

	// Seed the database with 10 users
	const { users } = await seed.users((x) =>
		x(10, ({ seed }) => ({
			raw_user_meta_data: {
				display_name: copycat.fullName(seed),
			},
			is_anonymous: true,
		})),
	);

	const { matching_results } = await seed.matching_results((x) => x(2));
	const {
		teams: [winTeam1, loseTeam1, winTeam2, loseTeam2],
	} = await seed.teams([
		{
			is_win: true,
			matching_result_id: matching_results[0].id,
		},
		{
			is_win: false,
			matching_result_id: matching_results[0].id,
		},
		{
			is_win: true,
			matching_result_id: matching_results[1].id,
		},
		{
			is_win: false,
			matching_result_id: matching_results[1].id,
		},
	]);

	const { players: winPlayers1 } = await seed.players([
		{
			team_id: winTeam1.id,
			user_id: users[0].id,
			matching_result_id: matching_results[0].id,
		},
		{
			team_id: winTeam1.id,
			user_id: users[1].id,
			matching_result_id: matching_results[0].id,
		},
		{
			team_id: winTeam1.id,
			user_id: users[2].id,
			matching_result_id: matching_results[0].id,
		},
		{
			team_id: winTeam1.id,
			user_id: users[3].id,
			matching_result_id: matching_results[0].id,
		},
	]);
	const { players: losePlayers1 } = await seed.players([
		{
			team_id: loseTeam1.id,
			user_id: users[4].id,
			matching_result_id: matching_results[0].id,
		},
		{
			team_id: loseTeam1.id,
			user_id: users[5].id,
			matching_result_id: matching_results[0].id,
		},
		{
			team_id: loseTeam1.id,
			user_id: users[6].id,
			matching_result_id: matching_results[0].id,
		},
		{
			team_id: loseTeam1.id,
			user_id: users[7].id,
			matching_result_id: matching_results[0].id,
		},
	]);

	const { players: winPlayers2 } = await seed.players([
		{
			team_id: winTeam2.id,
			user_id: users[1].id,
			matching_result_id: matching_results[1].id,
		},
		{
			team_id: winTeam2.id,
			user_id: users[2].id,
			matching_result_id: matching_results[1].id,
		},
		{
			team_id: winTeam2.id,
			user_id: users[3].id,
			matching_result_id: matching_results[1].id,
		},
		{
			team_id: winTeam2.id,
			user_id: users[4].id,
			matching_result_id: matching_results[1].id,
		},
	]);
	const { players: losePlayers2 } = await seed.players([
		{
			team_id: loseTeam2.id,
			user_id: users[5].id,
			matching_result_id: matching_results[1].id,
		},
		{
			team_id: loseTeam2.id,
			user_id: users[6].id,
			matching_result_id: matching_results[1].id,
		},
		{
			team_id: loseTeam2.id,
			user_id: users[7].id,
			matching_result_id: matching_results[1].id,
		},
		{
			team_id: loseTeam2.id,
			user_id: users[8].id,
			matching_result_id: matching_results[1].id,
		},
	]);

	await seed.matching_results((x) =>
		x(100, () => ({
			teams: (x) =>
				x(2, ({ index }) => ({
					is_win: index === 0,
					players_players_team_idToteams: (x) =>
						x(4, () => ({
							users: ({ seed }) => ({
								raw_user_meta_data: {
									display_name: copycat.fullName(seed),
								},
								is_anonymous: true,
							}),
						})),
				})),
		})),
	);

	process.exit();
};

main();
