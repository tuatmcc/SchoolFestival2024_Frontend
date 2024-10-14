-- 統計情報付きのプロフィールビュー
CREATE VIEW public.profiles_with_stats
WITH (security_invoker = TRUE)
AS
SELECT
  profiles.*,
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
GROUP BY
  profiles.id;
