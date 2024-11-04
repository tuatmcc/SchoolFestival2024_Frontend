ALTER TABLE public.profiles
  ALTER COLUMN character_setting SET DEFAULT
  '{
    "character": 0,
    "costume": 0,
    "accessory": 0,
    "hair": "#333333"
  }';
