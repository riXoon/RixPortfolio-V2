import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import AdminModal from '../../components/admin/AdminModal';
import { FiPlus, FiEdit2, FiTrash2, FiImage } from 'react-icons/fi';

const TEXT_FIELDS = ['title', 'description', 'date', 'sort_order'];
const EMPTY_FORM = { title: '', description: '', date: '', sort_order: '' };
const inputCls = 'w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]';

const AchievementsAdmin = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get('/achievements');
      setItems(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch achievements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setIsEditing(true);
      setCurrentId(item.id);
      const form = { ...EMPTY_FORM };
      TEXT_FIELDS.forEach(k => { if (item[k] != null) form[k] = item[k]; });
      setFormData(form);
    } else {
      setIsEditing(false);
      setCurrentId(null);
      setFormData(EMPTY_FORM);
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = new FormData();
      TEXT_FIELDS.forEach(k => payload.append(k, formData[k]));
      if (imageFile) payload.append('image', imageFile);

      if (isEditing) {
        await apiClient.put(`/achievements/${currentId}`, payload);
      } else {
        await apiClient.post('/achievements', payload);
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save achievement');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this achievement?')) {
      try {
        await apiClient.delete(`/achievements/${id}`);
        fetchItems();
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
          <h1 className="text-3xl font-bold mb-2">Achievements</h1>
          <p className="text-gray-400">Wins and recognitions shown in the home page carousel.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-[#9B72EF] px-5 py-2.5 rounded-lg font-medium hover:bg-[#8A5FD0] transition-colors">
          <FiPlus aria-hidden="true" /> New Achievement
        </button>
      </div>

      {error && <div className="bg-red-500/10 text-red-400 p-4 rounded-lg mb-6">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-[#1A1825] border border-white/5 rounded-xl overflow-hidden hover:border-[#9B72EF]/50 transition-colors group">
            <div className="h-40 bg-[#0C0A12] relative flex items-center justify-center overflow-hidden">
              {item.image_url ? (
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              ) : (
                <FiImage className="text-4xl text-gray-700" aria-hidden="true" />
              )}
              <div className="absolute top-3 right-3 flex gap-2">
                <button onClick={() => handleOpenModal(item)} aria-label={`Edit ${item.title}`} className="p-2 bg-black/60 rounded-lg hover:text-[#9B72EF]"><FiEdit2 size={16} aria-hidden="true" /></button>
                <button onClick={() => handleDelete(item.id)} aria-label={`Delete ${item.title}`} className="p-2 bg-black/60 rounded-lg hover:text-red-400"><FiTrash2 size={16} aria-hidden="true" /></button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              {item.date && <p className="text-[#9B72EF] text-xs mb-2">{item.date}</p>}
              <p className="text-gray-400 text-sm line-clamp-3">{item.description}</p>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-xl">
            <p className="text-gray-400">No achievements yet. Add your first one!</p>
          </div>
        )}
      </div>

      <AdminModal open={isModalOpen} title={isEditing ? 'Edit Achievement' : 'New Achievement'} onClose={() => setIsModalOpen(false)} maxWidth="max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title *</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea rows="4" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className={inputCls}></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Date</label>
              <input type="text" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} placeholder="2026" className={inputCls} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Sort order (lower = first)</label>
              <input type="number" value={formData.sort_order} onChange={e => setFormData({ ...formData, sort_order: e.target.value })} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Image (landscape works best)</label>
            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0] || null)} className={`${inputCls} text-sm`} />
            {isEditing && <p className="text-xs text-gray-500 mt-1">Leave empty to keep the current one.</p>}
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-white/5">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
            <button type="submit" disabled={saving} className="bg-[#9B72EF] hover:bg-[#8A5FD0] px-6 py-2 rounded-lg text-white font-medium disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};
export default AchievementsAdmin;
