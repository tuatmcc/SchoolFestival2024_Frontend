import { createClient } from "@supabase/supabase-js";
import type { Database as DatabaseGenerated } from "./database";
import type { MergeDeep } from "type-fest";

export type Database = MergeDeep<
	DatabaseGenerated,
	{
		public: {
			Views: {
				profiles_with_stats: {
					Row: DatabaseGenerated["public"]["Tables"]["profiles"]["Row"] & {
						play_count: number;
					};
				};
			};
		};
	}
>;

export const supabase = createClient<Database>(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY,
);
