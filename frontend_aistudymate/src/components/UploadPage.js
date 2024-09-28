import React, { useState } from 'react';
import axios from 'axios';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:8080/api/v1/index/index', {
          method: 'POST',
          body: formData,
        });
        console.log(response);

        if (response.message === 'Hoàn thành lập chỉ mục') {
          setMessage(response.message);
        } else {
          setMessage('Có lỗi xảy ra khi tải lên file.');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setMessage('Có lỗi xảy ra khi tải lên file.');
      }
    }
  };

  return (
    <div>
      <h1>Tải lên tài liệu</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={!file}>Tải lên</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadPage;