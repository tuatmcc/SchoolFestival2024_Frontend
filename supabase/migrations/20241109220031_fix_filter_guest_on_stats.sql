-- ゲストを除外したプロフィールのステータスを取得するビューを作成する
DROP VIEW public.profiles_with_stats;

CREATE VIEW public.profiles_with_stats
WITH (security_invoker = TRUE)
AS
SELECT
  profiles.*,
  CASE 
    WHEN profiles.is_guest = TRUE THEN NULL
    ELSE player_stats.high_score 
  END AS high_score,
  CASE 
    WHEN profiles.is_guest = TRUE THEN 0
    ELSE player_stats.play_count 
  END AS play_count,
  CASE 
    WHEN profiles.is_guest = TRUE THEN NULL
    ELSE player_stats.rank 
  END AS rank
FROM
  public.profiles
LEFT JOIN (
  SELECT 
    profiles.id AS profile_id,
    max(players.score) AS high_score,
    count(players.id) AS play_count,
    CASE WHEN max(players.score) IS NULL
      THEN NULL
      ELSE rank() OVER (ORDER BY max(players.score) DESC NULLS LAST)
    END AS rank
  FROM 
    public.profiles
  LEFT JOIN 
    public.players ON profiles.user_id = players.user_id
  WHERE 
    profiles.is_guest = FALSE
  GROUP BY 
    profiles.id
) AS player_stats ON profiles.id = player_stats.profile_id;
