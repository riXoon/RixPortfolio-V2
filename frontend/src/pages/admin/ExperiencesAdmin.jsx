import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import AdminModal from '../../components/admin/AdminModal';
import { FiPlus, FiEdit2, FiTrash2, FiBriefcase } from 'react-icons/fi';

const TEXT_FIELDS = ['type', 'short_title', 'company_school', 'role', 'duration', 'description', 'sort_order'];
const EMPTY_FORM = { type: 'Work', short_title: '', company_school: '', role: '', duration: '', description: '', sort_order: '' };
const inputCls = 'w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]';

const ExperiencesAdmin = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [logoFile, setLogoFile] = useState(null);

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
      const form = { ...EMPTY_FORM };
      TEXT_FIELDS.forEach(k => { if (exp[k] != null) form[k] = exp[k]; });
      setFormData(form);
    } else {
      setIsEditing(false);
      setCurrentId(null);
      setFormData(EMPTY_FORM);
    }
    setLogoFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = new FormData();
      TEXT_FIELDS.forEach(k => payload.append(k, formData[k]));
      if (logoFile) payload.append('logo', logoFile);

      if (isEditing) {
        await apiClient.put(`/experiences/${currentId}`, payload);
      } else {
        await apiClient.post('/experiences', payload);
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
                  {exp.duration || 'No duration set'}
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

      <AdminModal open={isModalOpen} title={isEditing ? 'Edit Experience' : 'New Experience'} onClose={() => setIsModalOpen(false)} maxWidth="max-w-lg">
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
                  <label className="block text-sm text-gray-400 mb-1">Role / Course *</label>
                  <input type="text" required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Company / School *</label>
                <input type="text" required value={formData.company_school} onChange={e => setFormData({...formData, company_school: e.target.value})} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Duration / Level</label>
                  <input type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="Tertiary (2023 - Present)" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Sort order (lower = first)</label>
                  <input type="number" value={formData.sort_order} onChange={e => setFormData({...formData, sort_order: e.target.value})} className={inputCls} />
                </div>
              </div>

              {formData.type === 'Education' && (
                <>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Short title (big heading, e.g. QCU)</label>
                    <input type="text" value={formData.short_title} onChange={e => setFormData({...formData, short_title: e.target.value})} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">School logo</label>
                    <input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files[0] || null)} className={`${inputCls} text-sm`} />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]"></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/5">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                <button type="submit" disabled={saving} className="bg-[#9B72EF] hover:bg-[#8A5FD0] px-6 py-2 rounded-lg text-white font-medium">{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
      </AdminModal>
    </div>
  );
};
export default ExperiencesAdmin;
