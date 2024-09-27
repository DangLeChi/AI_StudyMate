import React, { useState } from 'react';

function UploadPage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      // Xử lý tải lên file
      console.log('Tải lên file:', file.name);
    }
  };

  return (
    <div>
      <h1>Tải lên tài liệu</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={!file}>Tải lên</button>
      </form>
    </div>
  );
}

export default UploadPage;