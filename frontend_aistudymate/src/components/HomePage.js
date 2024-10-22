import React from 'react';

function HomePage() {
  return (
    <div className="home-page">
      {/* Wrapper div for Reminder, Top 3, and Quiz */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex space-x-6">
          {/* Reminder card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Reminder</h2>
            <ul className="list-disc pl-5">
              <li><strong>Review:</strong> 15 new words</li>
              <li><strong>Continue:</strong> 7th exam</li>
              <li><strong>Keywords:</strong> environment, artificial intelligence, population,...</li>
            </ul>
          </div>

          {/* Top 3 card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Top 3</h2>
            <ol className="list-decimal pl-5">
              <li><span role="img" aria-label="Gold medal">🥇</span> Dang Thanh An</li>
              <li><span role="img" aria-label="Silver medal">🥈</span> Tran Minh Hieu</li>
              <li><span role="img" aria-label="Bronze medal">🥉</span> Le Quang Hung</li>
            </ol>
            <div className="mt-4">
              <span role="img" aria-label="Three stars" className="text-2xl">⭐⭐⭐</span>
            </div>
          </div>

          {/* Quiz card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Quiz</h2>
            <p className="mb-4">Question 6. They _____ a large amount of money for developing this city last year.</p>
            <ol className="list-[upper-alpha] pl-5">
              <li>investor</li>
              <li>investment</li>
              <li>invested</li>
              <li>investing</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Fixed chatbox and assistant */}
      <div className="fixed bottom-6 right-6 flex items-end">
        <div className="bg-white rounded-lg shadow-md p-4 mr-4">
          Xin chào, AI Studymate có thể giúp gì được cho bạn.
        </div>
        <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center text-white text-3xl">
          <span role="img" aria-label="Robot assistant">🤖</span>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
