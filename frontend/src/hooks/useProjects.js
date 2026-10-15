import createApiHook from './createApiHook';
import { ProjectOverviewData, ExpertiseData } from '../constants';

// Tool names typed in the admin ("ReactJS") resolve to the bundled logos by tooltip.
const iconByName = new Map();
[...ExpertiseData[0].techStacks, ...ProjectOverviewData.flatMap(p => p.tools || [])]
  .forEach(t => { if (t.icon) iconByName.set(t.tooltip.toLowerCase(), t); });

const toTool = (name) => iconByName.get(String(name).toLowerCase()) || { icon: null, tooltip: String(name) };

// API row (snake_case) -> the shape the project pages already render.
const normalize = (p) => ({
  id: p.slug,
  type: p.type,
  pageStatus: p.page_status,
  img: p.thumbnail_url,
  title: p.title,
  desc: p.description,
  roles: p.roles || [],
  poster: p.poster_url,
  content: p.content,
  summary: p.summary,
  siteLink: p.site_link,
  githubLink: p.repo_link,
  category: p.category || [],
  tools: (p.tools || []).map(toTool),
  graphics: Array.isArray(p.graphics) ? p.graphics[0] : p.graphics,
  contributor: p.contributors || [],
  date: p.date_label,
  status: p.status,
});

const useProjectsList = createApiHook(
  '/projects',
  (rows) => rows.map(normalize),
  () => ProjectOverviewData, // static data if the API is unreachable
);

export default function useProjects() {
  const { items, ...rest } = useProjectsList();
  return { projects: items, ...rest };
}
