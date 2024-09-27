import React, { useState } from 'react';

function StudyPlanPage() {
  const [plan, setPlan] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi kế hoạch học tập đến backend
    console.log('Kế hoạch học tập:', plan);
  };

  return (
    <div>
      <h1>Kế hoạch học tập</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          placeholder="Nhập kế hoạch học tập của bạn"
          rows="10"
          cols="50"
        />
        <br />
        <button type="submit">Lưu kế hoạch</button>
      </form>
    </div>
  );
}

export default StudyPlanPage;