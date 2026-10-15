import createApiHook from './createApiHook';
import { ExpertiseData } from '../constants';

const staticCerts = () => {
  const c = ExpertiseData[0].certifications[0];
  return [...c.images01, ...c.images02];
};

// API row -> the shape the certificate components already render.
const useCertificatesList = createApiHook(
  '/certificates',
  (rows) => rows.map(c => ({
    id: c.id,
    src: c.image_url,
    title: c.title,
    issuer: c.issuer,
    date: c.date,
    category: c.category,
    description: c.description,
    link: c.link,
  })),
  staticCerts,
);

export default function useCertificates() {
  const { items, ...rest } = useCertificatesList();
  return { certificates: items, ...rest };
}
