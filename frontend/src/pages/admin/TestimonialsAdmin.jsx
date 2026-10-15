import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import AdminModal from '../../components/admin/AdminModal';
import { FiPlus, FiEdit2, FiTrash2, FiUser } from 'react-icons/fi';

const TEXT_FIELDS = ['name', 'role', 'testimonial', 'sort_order'];
const EMPTY_FORM = { name: '', role: '', testimonial: '', sort_order: '' };
const inputCls = 'w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]';

const TestimonialsAdmin = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [profileFile, setProfileFile] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get('/testimonials');
      setItems(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch testimonials');
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
    setProfileFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = new FormData();
      TEXT_FIELDS.forEach(k => payload.append(k, formData[k]));
      if (profileFile) payload.append('profile', profileFile);

      if (isEditing) {
        await apiClient.put(`/testimonials/${currentId}`, payload);
      } else {
        await apiClient.post('/testimonials', payload);
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this testimonial?')) {
      try {
        await apiClient.delete(`/testimonials/${id}`);
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
          <h1 className="text-3xl font-bold mb-2">Testimonials</h1>
          <p className="text-gray-400">What people say about working with you.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-[#9B72EF] px-5 py-2.5 rounded-lg font-medium hover:bg-[#8A5FD0] transition-colors">
          <FiPlus aria-hidden="true" /> New Testimonial
        </button>
      </div>

      {error && <div className="bg-red-500/10 text-red-400 p-4 rounded-lg mb-6">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-[#1A1825] border border-white/5 rounded-xl p-5 hover:border-[#9B72EF]/50 transition-colors flex flex-col">
            <p className="text-gray-300 text-sm line-clamp-5 flex-1">&ldquo;{item.testimonial}&rdquo;</p>
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
              <div className="w-10 h-10 rounded-full bg-[#0C0A12] flex items-center justify-center overflow-hidden shrink-0">
                {item.profile_url ? <img src={item.profile_url} alt={item.name} className="w-full h-full object-cover" /> : <FiUser className="text-[#9B72EF]" aria-hidden="true" />}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold truncate">{item.name}</h3>
                <p className="text-xs text-gray-500 truncate">{item.role}</p>
              </div>
              <button onClick={() => handleOpenModal(item)} aria-label={`Edit ${item.name}`} className="p-2 text-gray-400 hover:text-[#9B72EF]"><FiEdit2 size={16} aria-hidden="true" /></button>
              <button onClick={() => handleDelete(item.id)} aria-label={`Delete ${item.name}`} className="p-2 text-gray-400 hover:text-red-400"><FiTrash2 size={16} aria-hidden="true" /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-xl">
            <p className="text-gray-400">No testimonials yet. Add your first one!</p>
          </div>
        )}
      </div>

      <AdminModal open={isModalOpen} title={isEditing ? 'Edit Testimonial' : 'New Testimonial'} onClose={() => setIsModalOpen(false)} maxWidth="max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name *</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Role</label>
              <input type="text" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} placeholder="Frontend Developer" className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Testimonial *</label>
            <textarea required rows="5" value={formData.testimonial} onChange={e => setFormData({ ...formData, testimonial: e.target.value })} className={inputCls}></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Profile photo</label>
              <input type="file" accept="image/*" onChange={e => setProfileFile(e.target.files[0] || null)} className={`${inputCls} text-sm`} />
              {isEditing && <p className="text-xs text-gray-500 mt-1">Leave empty to keep the current one.</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Sort order (lower = first)</label>
              <input type="number" value={formData.sort_order} onChange={e => setFormData({ ...formData, sort_order: e.target.value })} className={inputCls} />
            </div>
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
export default TestimonialsAdmin;
