import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import AdminModal from '../../components/admin/AdminModal';
import { FiPlus, FiEdit2, FiTrash2, FiImage, FiExternalLink, FiGithub } from 'react-icons/fi';

const ARRAY_FIELDS = ['roles', 'category', 'tools'];
const TEXT_FIELDS = ['title', 'slug', 'type', 'page_status', 'status', 'date_label',
  'summary', 'description', 'content', 'site_link', 'repo_link'];

const EMPTY_FORM = {
  title: '', slug: '', type: 'personal', page_status: 'Done', status: 'Finished',
  date_label: '', summary: '', description: '', content: '', site_link: '', repo_link: '',
  roles: '', category: '', tools: '', // comma separated in the UI, sent as JSON arrays
};

const fromProject = (p) => {
  const form = { ...EMPTY_FORM };
  TEXT_FIELDS.forEach(k => { if (p[k] != null) form[k] = p[k]; });
  ARRAY_FIELDS.forEach(k => { form[k] = Array.isArray(p[k]) ? p[k].join(', ') : ''; });
  return form;
};

const inputCls = 'w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 focus:border-[#9B72EF] outline-none';

const toArray =(s) => s.split(',').map(t => t.trim()).filter(Boolean);

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [files, setFiles] = useState({ thumbnail: null, poster: null, graphics: [] });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get('/projects');
      setProjects(data);
    } catch (err) {
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project = null) => {
    if (project) {
      setIsEditing(true);
      setCurrentId(project.id);
      setFormData(fromProject(project));
    } else {
      setIsEditing(false);
      setCurrentId(null);
      setFormData(EMPTY_FORM);
    }
    setFiles({ thumbnail: null, poster: null, graphics: [] });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (field) => (e) => {
    setFiles(prev => ({
      ...prev,
      [field]: field === 'graphics' ? Array.from(e.target.files) : e.target.files[0] || null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Because we have files, we MUST use FormData
      const payload = new FormData();
      TEXT_FIELDS.forEach(k => payload.append(k, formData[k]));
      ARRAY_FIELDS.forEach(k => payload.append(k, JSON.stringify(toArray(formData[k]))));

      if (files.thumbnail) payload.append('thumbnail', files.thumbnail);
      if (files.poster) payload.append('poster', files.poster);
      files.graphics.forEach(f => payload.append('graphics', f));

      if (isEditing) {
        await apiClient.put(`/projects/${currentId}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await apiClient.post('/projects', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      closeModal();
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await apiClient.delete(`/projects/${id}`);
        fetchProjects();
      } catch (err) {
        alert('Failed to delete project');
      }
    }
  };

  if (loading) {
    return <div className="text-white flex items-center justify-center h-64">Loading projects...</div>;
  }

  return (
    <div className="text-white animate-fade-in relative z-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-gray-400">Manage your portfolio projects and case studies.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-gradient-to-r from-[#7B4FD0] to-[#9B72EF] px-5 py-2.5 rounded-lg font-medium hover:shadow-[0_0_15px_rgba(155,114,239,0.4)] transition-all"
        >
          <FiPlus /> New Project
        </button>
      </div>

      {error && <div className="bg-red-500/10 text-red-400 p-4 rounded-lg mb-6">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-[#1A1825] border border-white/5 rounded-xl overflow-hidden hover:border-[#9B72EF]/50 transition-colors group">
            <div className="h-48 bg-[#0C0A12] relative flex items-center justify-center overflow-hidden">
              {project.thumbnail_url ? (
                <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              ) : (
                <FiImage className="text-4xl text-gray-700" />
              )}
              <div className="absolute top-3 right-3 flex gap-2">
                <button onClick={() => handleOpenModal(project)} className="p-2 bg-black/60 backdrop-blur rounded-lg hover:text-[#9B72EF] transition-colors">
                  <FiEdit2 size={16} />
                </button>
                <button onClick={() => handleDelete(project.id)} className="p-2 bg-black/60 backdrop-blur rounded-lg hover:text-red-400 transition-colors">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <span className="text-xs font-medium bg-[#9B72EF]/20 text-[#9B72EF] px-2 py-1 rounded-md">
                  {project.type}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.summary}</p>
              
              <div className="flex gap-3 text-sm text-gray-500">
                {project.site_link && (
                  <a href={project.site_link} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                    <FiExternalLink /> Live
                  </a>
                )}
                {project.repo_link && (
                  <a href={project.repo_link} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                    <FiGithub /> Repo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-xl">
            <p className="text-gray-400">No projects found. Create your first one!</p>
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      <AdminModal open={isModalOpen} title={isEditing ? 'Edit Project' : 'New Project'} onClose={closeModal} maxWidth="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Title *</label>
                  <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 focus:border-[#9B72EF] outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Slug * (unique url path)</label>
                  <input type="text" name="slug" required value={formData.slug} onChange={handleInputChange} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 focus:border-[#9B72EF] outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Summary</label>
                <textarea name="summary" rows="2" value={formData.summary} onChange={handleInputChange} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 focus:border-[#9B72EF] outline-none"></textarea>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Description (shown on the project card)</label>
                <textarea name="description" rows="3" value={formData.description} onChange={handleInputChange} className={inputCls}></textarea>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Content (shown on the project page)</label>
                <textarea name="content" rows="4" value={formData.content} onChange={handleInputChange} className={inputCls}></textarea>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Project Type</label>
                  <select name="type" value={formData.type} onChange={handleInputChange} className={inputCls}>
                    <option value="special">Special</option>
                    <option value="school">School</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className={inputCls}>
                    <option>Finished</option>
                    <option>Work in progress</option>
                    <option>Discontinued/On-hold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Page status</label>
                  <select name="page_status" value={formData.page_status} onChange={handleInputChange} className={inputCls}>
                    <option>Done</option>
                    <option>In progress</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Date label</label>
                  <input type="text" name="date_label" value={formData.date_label} onChange={handleInputChange} placeholder="March 2026" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Roles (comma separated)</label>
                  <input type="text" name="roles" value={formData.roles} onChange={handleInputChange} placeholder="Frontend Developer, UI/UX Designer" className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Categories (comma separated)</label>
                  <input type="text" name="category" value={formData.category} onChange={handleInputChange} placeholder="Fullstack Project, Team Project" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Tools (comma separated)</label>
                  <input type="text" name="tools" value={formData.tools} onChange={handleInputChange} placeholder="ReactJS, NodeJS, Tailwind CSS" className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Live Site URL</label>
                  <input type="url" name="site_link" value={formData.site_link} onChange={handleInputChange} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 focus:border-[#9B72EF] outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">GitHub Repo URL</label>
                  <input type="url" name="repo_link" value={formData.repo_link} onChange={handleInputChange} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 focus:border-[#9B72EF] outline-none" />
                </div>
              </div>

              {[
                ['thumbnail', 'Thumbnail image (card)', false],
                ['poster', 'Poster / banner image (project page background)', false],
                ['graphics', 'Graphics image (project page main visual — first one is shown)', true],
              ].map(([field, label, multiple]) => (
                <div key={field}>
                  <label className="block text-sm text-gray-400 mb-1">{label}</label>
                  <input type="file" accept="image/*" multiple={multiple} onChange={handleFileChange(field)} className={`${inputCls} text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-[#9B72EF]/20 file:text-[#9B72EF] hover:file:bg-[#9B72EF]/30`} />
                </div>
              ))}
              {isEditing && <p className="text-xs text-gray-500">Leave images empty to keep the current ones.</p>}

              <div className="pt-4 flex justify-end gap-3 border-t border-white/5">
                <button type="button" onClick={closeModal} className="px-5 py-2 rounded-lg text-gray-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="bg-[#9B72EF] hover:bg-[#8A5FD0] text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
      </AdminModal>
    </div>
  );
};

export default ProjectsAdmin;
