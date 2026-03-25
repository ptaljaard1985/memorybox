-- Seed: 14 moment categories from spec Appendix A
INSERT INTO categories (slug, label, emoji, display_order) VALUES
  ('pregnancy',       'Pregnancy / Expecting',  '🤰', 1),
  ('birth_story',     'Birth Story',            '👶', 2),
  ('life_milestone',  'Life Milestone',         '🌟', 3),
  ('special_memory',  'Special Memory',         '📸', 4),
  ('education',       'Education',              '🎓', 5),
  ('medical',         'Medical',                '⚕️', 6),
  ('family',          'Family',                 '👨‍👩‍👧', 7),
  ('achievement',     'Achievement',            '🏆', 8),
  ('everyday_joy',    'Everyday Joy',           '☀️', 9),
  ('letter_to_child', 'Letter to Child',        '✉️', 10),
  ('artwork',         'Artwork & Drawings',     '🎨', 11),
  ('favourites',      'Favourites',             '❤️', 12),
  ('trips',           'Trips & Adventures',     '✈️', 13),
  ('document',        'Document',               '📄', 14)
ON CONFLICT (slug) DO NOTHING;
