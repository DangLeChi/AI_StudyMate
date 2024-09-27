import React, { useState, useEffect } from 'react';

const subjects = [
  { id: 'math', name: 'Toán' },
  { id: 'physics', name: 'Lý' },
  { id: 'chemistry', name: 'Hóa' },
];

function TestPage() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [randomExam, setRandomExam] = useState(null);

  useEffect(() => {
    if (selectedSubject) {
      const exams = [
        { id: 1, name: 'Đề thi 1', file: `exams/${selectedSubject.id}/exam1.pdf` },
        { id: 2, name: 'Đề thi 2', file: `exams/${selectedSubject.id}/exam2.pdf` },
      ];
      const randomIndex = Math.floor(Math.random() * exams.length);
      setRandomExam(exams[randomIndex]);
    }
  }, [selectedSubject]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-100 to-blue-300">
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Kiểm tra</h1>
        <div className="flex space-x-4 mb-4">
          {subjects.map(subject => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              className={`px-4 py-2 rounded-md ${
                selectedSubject?.id === subject.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {subject.name}
            </button>
          ))}
        </div>
      </div>
      {randomExam && (
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="w-full h-[calc(100vh-150px)] flex items-center justify-center">
            <div className="w-1/2 h-1/2 relative">
              <h2 className="text-xl font-semibold mb-2 text-center">Đề thi {selectedSubject.name}</h2>
              <h3 className="text-lg font-semibold mb-2 text-center">{randomExam.name}</h3>
              <iframe
                src={randomExam.file}
                title={randomExam.name}
                className="w-full h-full border-2 border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestPage;