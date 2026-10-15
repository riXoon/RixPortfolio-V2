import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { FiTrash2, FiMail, FiCheckCircle } from 'react-icons/fi';

const MessagesAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get('/messages');
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleMarkAsRead = async (id, currentStatus) => {
    try {
      await apiClient.put(`/messages/${id}`, { is_read: !currentStatus });
      fetchMessages();
    } catch (err) {
      alert('Failed to update message status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message permanently?')) {
      try {
        await apiClient.delete(`/messages/${id}`);
        fetchMessages();
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  if (loading) return <div className="text-white flex justify-center h-64 items-center">Loading...</div>;

  return (
    <div className="text-white animate-fade-in relative z-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Inbox Messages</h1>
        <p className="text-gray-400">View and manage messages from your public portfolio contact form.</p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-xl text-gray-400">
            No messages yet.
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={`border rounded-xl p-6 transition-all ${msg.is_read ? 'bg-[#1A1825] border-white/5 opacity-70' : 'bg-[#1A1825] border-[#9B72EF]/30 shadow-[0_0_15px_rgba(155,114,239,0.1)]'}`}>
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.is_read ? 'bg-[#0C0A12] text-gray-500' : 'bg-[#9B72EF]/20 text-[#9B72EF]'}`}>
                    <FiMail />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      {msg.sender_name}
                      {!msg.is_read && <span className="bg-[#9B72EF] text-white text-[10px] uppercase px-2 py-0.5 rounded-full font-bold tracking-wider">New</span>}
                    </h3>
                    <a href={`mailto:${msg.sender_email}`} className="text-sm text-[#9B72EF] hover:underline mb-4 inline-block">{msg.sender_email}</a>
                    <p className="text-gray-300 whitespace-pre-wrap">{msg.message}</p>
                    <p className="text-xs text-gray-500 mt-4">{new Date(msg.created_at).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 shrink-0">
                  <button 
                    onClick={() => handleMarkAsRead(msg.id, msg.is_read)} 
                    className={`p-2 rounded-lg transition-colors text-sm flex items-center gap-2 ${msg.is_read ? 'text-gray-500 hover:text-white bg-[#0C0A12]' : 'text-[#9B72EF] hover:bg-[#9B72EF]/10 bg-[#9B72EF]/5'}`}
                  >
                    <FiCheckCircle /> {msg.is_read ? 'Mark Unread' : 'Mark Read'}
                  </button>
                  <button onClick={() => handleDelete(msg.id)} className="p-2 bg-[#0C0A12] rounded-lg hover:text-red-400 transition-colors text-sm flex items-center gap-2 justify-center text-gray-400">
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default MessagesAdmin;
