import createApiHook from './createApiHook';
import { ExpertiseData } from '../constants';

// API row -> { icon, tooltip }, the shape the skills ticker already renders.
export default createApiHook(
  '/skills',
  (rows) => rows.map(s => ({ id: s.id, icon: s.icon_url, tooltip: s.name, category: s.category })),
  () => ExpertiseData[0].techStacks,
);
