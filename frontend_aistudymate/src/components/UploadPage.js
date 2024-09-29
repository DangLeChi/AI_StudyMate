import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatboxRef = useRef(null);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/index/index`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setUploadMessage(response.data.message);
        setIsUploaded(true);
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadMessage('Error uploading file: ' + error.message);
      }
    }
  };

  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', content: chatInput, timestamp: new Date() };
    setChatHistory(prev => [...prev, userMessage]);
    setChatInput('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/chat/chitchat`, {
        question: chatInput,
        top_k: 3,
        score: 0.5
      });
      const aiMessage = { role: 'assistant', content: response.data.data, timestamp: new Date() };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending chat message:', error);
      const errorMessage = { role: 'assistant', content: 'Error: Unable to get response', timestamp: new Date() };
      setChatHistory(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg flex flex-col overflow-hidden">
        {!isUploaded ? (
          <div className="p-4">
            <form onSubmit={handleUpload} className="flex flex-col space-y-2">
              <input type="file" onChange={handleFileChange} className="border p-2 rounded" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Upload</button>
            </form>
            {uploadMessage && <p className="mt-2 text-sm text-gray-600">{uploadMessage}</p>}
          </div>
        ) : (
          <div className="flex flex-col h-96 w-full">
            <div ref={chatboxRef} className="flex-1 p-4 overflow-y-auto bg-blue-50 rounded-t-lg">
              {chatHistory.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end space-x-2 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                    <div className="flex flex-col space-y-1 max-w-xs">
                      <div className={`px-4 py-2 rounded-3xl ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                        {message.content}
                      </div>
                      <span className="text-xs text-gray-500 self-start">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleChat} className="border-t p-4 bg-white rounded-b-lg">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Type your message here..."
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPage;
