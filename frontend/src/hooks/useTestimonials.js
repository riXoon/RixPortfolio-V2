import createApiHook from './createApiHook';
import { TestimonialData } from '../constants';

// API row -> { profile, name, role, testimonial }, the shape the cards already render.
export default createApiHook(
  '/testimonials',
  (rows) => rows.map(t => ({ id: t.id, profile: t.profile_url, name: t.name, role: t.role, testimonial: t.testimonial })),
  () => TestimonialData,
);
