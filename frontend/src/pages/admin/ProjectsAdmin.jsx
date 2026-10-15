import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiImage, FiExternalLink, FiGithub } from 'react-icons/fi';

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
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    type: 'Frontend',
    summary: '',
    site_link: '',
    repo_link: '',
    tools: '', // We'll handle this as comma-separated in the UI, but send as JSON array
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);

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
      setFormData({
        title: project.title || '',
        slug: project.slug || '',
        type: project.type || 'Frontend',
        summary: project.summary || '',
        site_link: project.site_link || '',
        repo_link: project.repo_link || '',
        tools: Array.isArray(project.tools) ? project.tools.join(', ') : '',
      });
    } else {
      setIsEditing(false);
      setCurrentId(null);
      setFormData({
        title: '', slug: '', type: 'Frontend', summary: '', site_link: '', repo_link: '', tools: ''
      });
    }
    setThumbnailFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Because we have files, we MUST use FormData
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('slug', formData.slug);
      payload.append('type', formData.type);
      payload.append('summary', formData.summary);
      payload.append('site_link', formData.site_link);
      payload.append('repo_link', formData.repo_link);
      
      // Convert tools comma separated string to JSON array
      const toolsArray = formData.tools.split(',').map(t => t.trim()).filter(Boolean);
      payload.append('tools', JSON.stringify(toolsArray));

      if (thumbnailFile) {
        payload.append('thumbnail', thumbnailFile);
      }

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
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1A1825] border border-white/10 rounded-2xl w-full max-w-2xl my-8">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-2xl font-bold">{isEditing ? 'Edit Project' : 'New Project'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
                <FiX size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Project Type</label>
                  <input type="text" name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 focus:border-[#9B72EF] outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Tools (comma separated)</label>
                  <input type="text" name="tools" value={formData.tools} onChange={handleInputChange} placeholder="React, Node, Supabase" className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 focus:border-[#9B72EF] outline-none" />
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

              <div>
                <label className="block text-sm text-gray-400 mb-1">Thumbnail Image</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-[#9B72EF]/20 file:text-[#9B72EF] hover:file:bg-[#9B72EF]/30" />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/5">
                <button type="button" onClick={closeModal} className="px-5 py-2 rounded-lg text-gray-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="bg-[#9B72EF] hover:bg-[#8A5FD0] text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsAdmin;
