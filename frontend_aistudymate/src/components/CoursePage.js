import React from 'react';

function CoursePage() {
  const courses = [
    { id: 1, title: 'Toán học cơ bản' },
    { id: 2, title: 'Lập trình Python' },
    { id: 3, title: 'Tiếng Anh giao tiếp' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Khóa học</h1>
      <ul className="space-y-2">
        {courses.map(course => (
          <li key={course.id} className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300">
            {course.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CoursePage;