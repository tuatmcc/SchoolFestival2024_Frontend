-- プロフィールテーブル
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  display_name TEXT NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE public.profiles
  ENABLE ROW LEVEL SECURITY;

-- 参照は全ユーザーに許可、更新は自分のプロフィールのみ許可
CREATE POLICY
  "Can read everyone's profile"
  ON public.profiles
  FOR SELECT
  USING (true);

CREATE POLICY
  "Can only update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- ユーザー作成時(サインアップ)に自動的にプロフィールを作成するトリガー
CREATE OR REPLACE FUNCTION
  public.create_profile_on_signup()
  RETURNS TRIGGER AS
  $$
  BEGIN
    INSERT INTO public.profiles (id, display_name)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data ->> 'display_name', '名無し')
    );

    RETURN NEW;
  END
  $$
  LANGUAGE plpgsql
  SET search_path = ''
  SECURITY DEFINER;

CREATE TRIGGER
  create_profile_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.create_profile_on_signup();
