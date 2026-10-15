import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiAward } from 'react-icons/fi';

const CertificatesAdmin = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({ title: '', issuer: '', date: '' });
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
      setFormData({ title: cert.title || '', issuer: cert.issuer || '', date: cert.date || '' });
    } else {
      setIsEditing(false);
      setCurrentId(null);
      setFormData({ title: '', issuer: '', date: '' });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('issuer', formData.issuer);
      if (formData.date) payload.append('date', formData.date);
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
              {cert.date && <p className="text-gray-500 text-xs">{new Date(cert.date).toLocaleDateString()}</p>}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1825] border border-white/10 rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{isEditing ? 'Edit Certificate' : 'New Certificate'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><FiX size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title *</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Issuer *</label>
                <input type="text" required value={formData.issuer} onChange={e => setFormData({...formData, issuer: e.target.value})} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Date</label>
                <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-[#0C0A12] border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#9B72EF]" />
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
          </div>
        </div>
      )}
    </div>
  );
};
export default CertificatesAdmin;
