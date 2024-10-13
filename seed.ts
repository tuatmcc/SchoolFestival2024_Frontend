/**
 * ! Executing this script will delete all data in your database and seed it with 10 users.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";
import { copycat } from "@snaplet/copycat";

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

	const { battle_results } = await seed.battle_results((x) => x(2));
	const {
		teams: [winTeam1, loseTeam1, winTeam2, loseTeam2],
	} = await seed.teams([
		{
			is_win: true,
			battle_result_id: battle_results[0].id,
		},
		{
			is_win: false,
			battle_result_id: battle_results[0].id,
		},
		{
			is_win: true,
			battle_result_id: battle_results[1].id,
		},
		{
			is_win: false,
			battle_result_id: battle_results[1].id,
		},
	]);

	const { players: winPlayers1 } = await seed.players([
		{
			team_id: winTeam1.id,
			user_id: users[0].id,
			battle_result_id: battle_results[0].id,
		},
		{
			team_id: winTeam1.id,
			user_id: users[1].id,
			battle_result_id: battle_results[0].id,
		},
		{
			team_id: winTeam1.id,
			user_id: users[2].id,
			battle_result_id: battle_results[0].id,
		},
		{
			team_id: winTeam1.id,
			user_id: users[3].id,
			battle_result_id: battle_results[0].id,
		},
	]);
	const { players: losePlayers1 } = await seed.players([
		{
			team_id: loseTeam1.id,
			user_id: users[4].id,
			battle_result_id: battle_results[0].id,
		},
		{
			team_id: loseTeam1.id,
			user_id: users[5].id,
			battle_result_id: battle_results[0].id,
		},
		{
			team_id: loseTeam1.id,
			user_id: users[6].id,
			battle_result_id: battle_results[0].id,
		},
		{
			team_id: loseTeam1.id,
			user_id: users[7].id,
			battle_result_id: battle_results[0].id,
		},
	]);

	const { players: winPlayers2 } = await seed.players([
		{
			team_id: winTeam2.id,
			user_id: users[1].id,
			battle_result_id: battle_results[1].id,
		},
		{
			team_id: winTeam2.id,
			user_id: users[2].id,
			battle_result_id: battle_results[1].id,
		},
		{
			team_id: winTeam2.id,
			user_id: users[3].id,
			battle_result_id: battle_results[1].id,
		},
		{
			team_id: winTeam2.id,
			user_id: users[4].id,
			battle_result_id: battle_results[1].id,
		},
	]);
	const { players: losePlayers2 } = await seed.players([
		{
			team_id: loseTeam2.id,
			user_id: users[5].id,
			battle_result_id: battle_results[1].id,
		},
		{
			team_id: loseTeam2.id,
			user_id: users[6].id,
			battle_result_id: battle_results[1].id,
		},
		{
			team_id: loseTeam2.id,
			user_id: users[7].id,
			battle_result_id: battle_results[1].id,
		},
		{
			team_id: loseTeam2.id,
			user_id: users[8].id,
			battle_result_id: battle_results[1].id,
		},
	]);

	process.exit();
};

main();
