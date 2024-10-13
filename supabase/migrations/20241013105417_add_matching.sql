-- 対戦結果テーブル
CREATE TABLE public.matching_results (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),

  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- チームテーブル
CREATE TABLE public.teams (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),

  matching_result_id UUID NOT NULL REFERENCES public.matching_results ON DELETE CASCADE,

  is_win BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- 複合外部キー制約のために複合ユニーク制約を設定
  UNIQUE (id, matching_result_id)
);

-- プレイヤーテーブル
CREATE TABLE public.players (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),

  -- そのユーザーがアカウントを削除した場合はNULLにする
  -- アカウント削除はできたほうが良いが、対戦成績は残しておきたいため。
  -- 対戦成績は他ユーザーにも表示される可能性がある。
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  team_id UUID NOT NULL REFERENCES public.teams ON DELETE CASCADE,
  matching_result_id UUID NOT NULL REFERENCES public.matching_results ON DELETE CASCADE,

  score INTEGER NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- ユーザーは対戦結果に対して1つのプレイヤーしか存在できない
  UNIQUE (user_id, matching_result_id),
  -- team_idから参照されるmatching_result_idと一致することを保証する
  FOREIGN KEY (team_id, matching_result_id) REFERENCES public.teams (id, matching_result_id) ON DELETE CASCADE
);


-- データ更新時に更新日時を更新するトリガー
CREATE TRIGGER
  update_matching_result_timestamp
  BEFORE UPDATE ON public.matching_results
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_timestamp();
CREATE TRIGGER
  update_team_timestamp
  BEFORE UPDATE ON public.teams
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_timestamp();
CREATE TRIGGER
  update_player_timestamp
  BEFORE UPDATE ON public.players
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_timestamp();


-- パフォーマンス向上のため、インデックスを設定
CREATE INDEX idx_players_user_id ON public.players (user_id);
CREATE INDEX idx_players_team_id ON public.players (team_id);
CREATE INDEX idx_players_matching_result_id ON public.players (matching_result_id);

CREATE INDEX idx_teams_matching_result_id ON public.teams (matching_result_id);


-- RLSを有効化
ALTER TABLE public.matching_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;


-- 参照のみ全ユーザーに許可
CREATE POLICY
  "Can read everyone's matching result"
  ON public.matching_results
  FOR SELECT
  TO authenticated, anon
  USING ( true );
CREATE POLICY
  "Can read everyone's team"
  ON public.teams
  FOR SELECT
  TO authenticated, anon
  USING ( true );
CREATE POLICY
  "Can read everyone's player"
  ON public.players
  FOR SELECT
  TO authenticated, anon
  USING ( true );
