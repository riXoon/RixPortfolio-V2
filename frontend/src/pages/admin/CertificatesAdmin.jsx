import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import AdminModal from '../../components/admin/AdminModal';
import { FiPlus, FiEdit2, FiTrash2, FiAward } from 'react-icons/fi';

const CATEGORIES = ['Cybersecurity', 'Capture the Flag', 'Student Builder', 'Seminars/Webinars', 'Other'];
const TEXT_FIELDS = ['title', 'issuer', 'date', 'category', 'description', 'link', 'sort_order'];
const EMPTY_FORM = { title: '', issuer: '', date: '', category: CATEGORIES[0], description: '', link: '', sort_order: '' };
const inputCls = 'w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]';

const CertificatesAdmin = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get('/certificates');
      setCertificates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCertificates(); }, []);

  const handleOpenModal = (cert = null) => {
    if (cert) {
      setIsEditing(true);
      setCurrentId(cert.id);
      const form = { ...EMPTY_FORM };
      TEXT_FIELDS.forEach(k => { if (cert[k] != null) form[k] = cert[k]; });
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
        await apiClient.put(`/certificates/${currentId}`, payload);
      } else {
        await apiClient.post('/certificates', payload);
      }
      setIsModalOpen(false);
      fetchCertificates();
    } catch (err) {
      alert('Failed to save certificate');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this certificate?')) {
      try {
        await apiClient.delete(`/certificates/${id}`);
        fetchCertificates();
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
          <h1 className="text-3xl font-bold mb-2">Certificates</h1>
          <p className="text-gray-400">Manage your certifications and awards.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-[#9B72EF] px-5 py-2.5 rounded-lg font-medium hover:bg-[#8A5FD0] transition-colors">
          <FiPlus /> New Certificate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map(cert => (
          <div key={cert.id} className="bg-[#1A1825] border border-white/5 rounded-xl overflow-hidden hover:border-[#9B72EF]/50 transition-colors group">
            <div className="h-40 bg-[#0C0A12] relative flex items-center justify-center overflow-hidden">
              {cert.image_url ? (
                <img src={cert.image_url} alt={cert.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              ) : (
                <FiAward className="text-4xl text-gray-700" />
              )}
              <div className="absolute top-3 right-3 flex gap-2">
                <button onClick={() => handleOpenModal(cert)} className="p-2 bg-black/60 rounded-lg hover:text-[#9B72EF]"><FiEdit2 size={16} /></button>
                <button onClick={() => handleDelete(cert.id)} className="p-2 bg-black/60 rounded-lg hover:text-red-400"><FiTrash2 size={16} /></button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold mb-1">{cert.title}</h3>
              <p className="text-[#9B72EF] text-sm mb-2">{cert.issuer}</p>
              <p className="text-gray-500 text-xs">{[cert.category, cert.date].filter(Boolean).join(' · ')}</p>
            </div>
          </div>
        ))}
      </div>

      <AdminModal open={isModalOpen} title={isEditing ? 'Edit Certificate' : 'New Certificate'} onClose={() => setIsModalOpen(false)} maxWidth="max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title *</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Issuer *</label>
                <input type="text" required value={formData.issuer} onChange={e => setFormData({...formData, issuer: e.target.value})} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Date</label>
                  <input type="text" value={formData.date} placeholder="December 2025" onChange={e => setFormData({...formData, date: e.target.value})} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className={inputCls}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className={inputCls}></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Credential link</label>
                  <input type="url" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Sort order (lower = first)</label>
                  <input type="number" value={formData.sort_order} onChange={e => setFormData({...formData, sort_order: e.target.value})} className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Image</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 text-sm" />
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
export default CertificatesAdmin;
