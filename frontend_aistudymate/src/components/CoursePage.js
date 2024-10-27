import React from 'react';

function CoursePage() {
  const courses = [
    {
      id: 1,
      title: 'Math',
      description: 'The course provides a basic mathematical foundation for students.',
      image: 'https://github.com/user-attachments/assets/8dcc2930-420d-4cc9-bf57-7f21fb030eba', // Replace with actual image URL
      link: 'https://flm.fpt.edu.vn/', // Link for Math course
    },
    {
      id: 2,
      title: 'Python',
      description: 'Beginner course on Python programming.',
      image: 'https://github.com/user-attachments/assets/42fec74f-0ac9-4130-a444-fe30f17f4819', // Replace with actual image URL
      link: 'https://flm.fpt.edu.vn/', // Link for Python course
    },
    {
      id: 3,
      title: 'English communication',
      description: 'The course helps improve English communication skills.',
      image: 'https://github.com/user-attachments/assets/e380fb9a-c6cd-4af0-a0c0-5bf4be965068', // Replace with actual image URL
      link: 'https://flm.fpt.edu.vn/', // Link for English communication course
    },
  ];

  return (
    <div>
      <h1>Courses</h1>
      <div>
        {courses.map((course) => (
          <div key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <img
              src={course.image}
              alt={course.title}
              style={{ height: '25vh', width: '25vw' }}
            />
            <a
              href={course.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'none',
                color: 'blue',
                textDecoration: 'underline',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                font: 'inherit',
              }}
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursePage;