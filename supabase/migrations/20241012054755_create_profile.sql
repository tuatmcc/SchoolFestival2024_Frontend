-- プロフィールテーブル
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users ON DELETE CASCADE,
  display_name TEXT NOT NULL
);

ALTER TABLE public.profiles
  ENABLE ROW LEVEL SECURITY;

-- 参照は全ユーザーに許可、更新は自分のプロフィールのみ許可
CREATE POLICY
  "Can read everyone's profile"
  ON public.profiles
  FOR SELECT
  TO authenticated, anon
  USING ( true );

CREATE POLICY
  "Can only update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING ( (SELECT auth.uid()) = user_id );

-- ユーザー作成時(サインアップ)に自動的にプロフィールを作成するトリガー
CREATE OR REPLACE FUNCTION
  public.create_profile_on_signup()
  RETURNS TRIGGER AS
  $$
  BEGIN
    INSERT INTO public.profiles (user_id, display_name)
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
