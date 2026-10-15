import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiStar } from 'react-icons/fi';

const SkillsAdmin = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', category: '', proficiency: 50 });
  const [iconFile, setIconFile] = useState(null);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get('/skills');
      setSkills(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleOpenModal = (skill = null) => {
    if (skill) {
      setIsEditing(true);
      setCurrentId(skill.id);
      setFormData({ name: skill.name || '', category: skill.category || '', proficiency: skill.proficiency || 50 });
    } else {
      setIsEditing(false);
      setCurrentId(null);
      setFormData({ name: '', category: '', proficiency: 50 });
    }
    setIconFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('category', formData.category);
      payload.append('proficiency', formData.proficiency);
      if (iconFile) payload.append('icon', iconFile);

      if (isEditing) {
        await apiClient.put(`/skills/${currentId}`, payload);
      } else {
        await apiClient.post('/skills', payload);
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (err) {
      alert('Failed to save skill');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this skill?')) {
      try {
        await apiClient.delete(`/skills/${id}`);
        fetchSkills();
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
          <h1 className="text-3xl font-bold mb-2">Skills</h1>
          <p className="text-gray-400">Manage your technical skills and proficiencies.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-[#9B72EF] px-5 py-2.5 rounded-lg font-medium hover:bg-[#8A5FD0] transition-colors">
          <FiPlus /> New Skill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map(skill => (
          <div key={skill.id} className="bg-[#1A1825] border border-white/5 rounded-xl p-5 hover:border-[#9B72EF]/50 transition-colors relative group">
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleOpenModal(skill)} className="text-gray-400 hover:text-[#9B72EF]"><FiEdit2 size={16} /></button>
              <button onClick={() => handleDelete(skill.id)} className="text-gray-400 hover:text-red-400"><FiTrash2 size={16} /></button>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#0C0A12] rounded-lg flex items-center justify-center p-2">
                {skill.icon_url ? <img src={skill.icon_url} alt={skill.name} className="w-full h-full object-contain" /> : <FiStar className="text-2xl text-[#9B72EF]" />}
              </div>
              <div>
                <h3 className="font-bold">{skill.name}</h3>
                <span className="text-xs text-gray-500">{skill.category}</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Proficiency</span>
                <span className="text-[#9B72EF]">{skill.proficiency}%</span>
              </div>
              <div className="w-full bg-[#0C0A12] rounded-full h-1.5">
                <div className="bg-gradient-to-r from-[#7B4FD0] to-[#9B72EF] h-1.5 rounded-full" style={{ width: `${skill.proficiency}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1825] border border-white/10 rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{isEditing ? 'Edit Skill' : 'New Skill'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><FiX size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name *</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Category</label>
                <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]" placeholder="e.g. Frontend, Backend" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Proficiency (0-100)</label>
                <input type="number" min="0" max="100" value={formData.proficiency} onChange={e => setFormData({...formData, proficiency: e.target.value})} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Icon Image</label>
                <input type="file" accept="image/*" onChange={e => setIconFile(e.target.files[0])} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 text-sm" />
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
export default SkillsAdmin;
