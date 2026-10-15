import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiBriefcase } from 'react-icons/fi';

const ExperiencesAdmin = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({ 
    type: 'Work', 
    company_school: '', 
    role: '', 
    start_date: '', 
    end_date: '', 
    description: '' 
  });

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get('/experiences');
      setExperiences(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchExperiences(); }, []);

  const handleOpenModal = (exp = null) => {
    if (exp) {
      setIsEditing(true);
      setCurrentId(exp.id);
      setFormData({ 
        type: exp.type || 'Work', 
        company_school: exp.company_school || '', 
        role: exp.role || '',
        start_date: exp.start_date || '',
        end_date: exp.end_date || '',
        description: exp.description || ''
      });
    } else {
      setIsEditing(false);
      setCurrentId(null);
      setFormData({ type: 'Work', company_school: '', role: '', start_date: '', end_date: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Experience has no files, so we can send raw JSON
      if (isEditing) {
        await apiClient.put(`/experiences/${currentId}`, formData);
      } else {
        await apiClient.post('/experiences', formData);
      }
      setIsModalOpen(false);
      fetchExperiences();
    } catch (err) {
      alert('Failed to save experience');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this experience?')) {
      try {
        await apiClient.delete(`/experiences/${id}`);
        fetchExperiences();
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  if (loading) return <div className="text-white flex justify-center h-64 items-center">Loading...</div>;

  return (
    <div className="text-white animate-fade-in relative z-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Experiences</h1>
          <p className="text-gray-400">Manage your work history and education.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-[#9B72EF] px-5 py-2.5 rounded-lg font-medium hover:bg-[#8A5FD0] transition-colors">
          <FiPlus /> New Experience
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map(exp => (
          <div key={exp.id} className="bg-[#1A1825] border border-white/5 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[#9B72EF]/50 transition-colors">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-[#0C0A12] border border-white/10 flex items-center justify-center shrink-0 mt-1">
                <FiBriefcase className="text-[#9B72EF] text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <div className="text-[#9B72EF] font-medium mb-1">{exp.company_school} <span className="text-gray-500 font-normal px-2">•</span> <span className="text-gray-400 font-normal">{exp.type}</span></div>
                <p className="text-sm text-gray-500 mb-2">
                  {exp.start_date ? new Date(exp.start_date).toLocaleDateString() : 'N/A'} - {exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'Present'}
                </p>
                <p className="text-gray-300 text-sm">{exp.description}</p>
              </div>
            </div>
            
            <div className="flex gap-2 shrink-0">
              <button onClick={() => handleOpenModal(exp)} className="p-2 bg-[#0C0A12] rounded-lg hover:text-[#9B72EF] transition-colors"><FiEdit2 size={16} /></button>
              <button onClick={() => handleDelete(exp.id)} className="p-2 bg-[#0C0A12] rounded-lg hover:text-red-400 transition-colors"><FiTrash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1825] border border-white/10 rounded-2xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{isEditing ? 'Edit Experience' : 'New Experience'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><FiX size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Type *</label>
                  <select name="type" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]">
                    <option value="Work">Work</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Role/Degree *</label>
                  <input type="text" required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Company / School *</label>
                <input type="text" required value={formData.company_school} onChange={e => setFormData({...formData, company_school: e.target.value})} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Start Date</label>
                  <input type="date" value={formData.start_date} onChange={e => setFormData({...formData, start_date: e.target.value})} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">End Date (Leave blank if Present)</label>
                  <input type="date" value={formData.end_date} onChange={e => setFormData({...formData, end_date: e.target.value})} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]"></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/5">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                <button type="submit" disabled={saving} className="bg-[#9B72EF] hover:bg-[#8A5FD0] px-6 py-2 rounded-lg text-white font-medium">{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ExperiencesAdmin;
