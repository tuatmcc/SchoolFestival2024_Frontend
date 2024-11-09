-- プロフィールテーブルにゲストアカウントのフラグを追加
ALTER TABLE public.profiles
  ADD COLUMN is_guest BOOLEAN NOT NULL DEFAULT FALSE;
