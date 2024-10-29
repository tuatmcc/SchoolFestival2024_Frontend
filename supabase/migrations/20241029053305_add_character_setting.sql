-- プロフィールテーブルにキャラの設定情報のカラムを追加
ALTER TABLE public.profiles
  ADD COLUMN character_setting JSONB NOT NULL DEFAULT '{}';
