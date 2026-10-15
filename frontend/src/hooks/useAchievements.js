import createApiHook from './createApiHook';
import { AchievementData } from '../constants';

// API row -> { id, image, title, description, date }. `id` is the 1-based position,
// because the carousel shows it as the "01, 02…" badge and uses it as the slide key.
export default createApiHook(
  '/achievements',
  (rows) => rows.map((a, i) => ({ id: i + 1, image: a.image_url, title: a.title, description: a.description, date: a.date })),
  () => AchievementData,
);
