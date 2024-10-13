-- プロフィールテーブルに作成日時と更新日時のカラムを追加する
ALTER TABLE public.profiles
  ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- データ更新時に更新日時を更新するトリガー
CREATE OR REPLACE FUNCTION
  public.update_timestamp()
  RETURNS TRIGGER AS
  $$
  BEGIN
    NEW.updated_at = now();

    RETURN NEW;
  END
  $$
  LANGUAGE plpgsql
  SET search_path = ''
  SECURITY DEFINER;

-- プロフィールテーブルにトリガーを追加
CREATE TRIGGER
  update_timestamp
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_timestamp();
