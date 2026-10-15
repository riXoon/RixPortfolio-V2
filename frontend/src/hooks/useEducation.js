import createApiHook from './createApiHook';
import { AboutData } from '../constants';

// Education entries live in the `experiences` table with type = 'Education'.
// Column mapping: short_title -> title, company_school -> name,
// duration -> level, role -> course, logo_url -> logo.
export default createApiHook(
  '/experiences',
  (rows) => rows
    .filter(e => e.type === 'Education')
    .map(e => ({
      id: e.id,
      logo: e.logo_url,
      title: e.short_title || e.company_school,
      name: e.company_school,
      level: e.duration,
      course: e.role,
    })),
  // static data is oldest-first (SFHS, QCU); the page shows the newest first
  () => [...AboutData[0].education].reverse(),
);
