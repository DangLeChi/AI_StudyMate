import React, { useState, useEffect } from "react";

const subjects = [
  { id: "math", name: "Toán" },
  { id: "physics", name: "Lý" },
  { id: "chemistry", name: "Hóa" },
  { id: "english", name: "English" }, // Added English as a subject
];

function TestPage() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null); // State to store the PDF URL

  useEffect(() => {
    if (selectedSubject) {
      // Call the backend API to create an exam when a subject is selected
      createExam();
    }
  }, [selectedSubject]);

  // Function to call the backend API
  const createExam = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/create_exam/creat_exam",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Create a Blob from the PDF response
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url); // Store the URL to display the PDF
      } else {
        console.error("Error creating exam:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating exam:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-100 to-blue-300">
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Kiểm tra</h1>
        <div className="flex space-x-4 mb-4">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              className={`px-4 py-2 rounded-md ${
                selectedSubject?.id === subject.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {subject.name}
            </button>
          ))}
        </div>
      </div>

      {pdfUrl && ( // Show the PDF if it's created
        <div className="flex-grow flex flex-col items-center justify-center p-0">
          {" "}
          {/* Adjusted padding */}
          <h2 className="text-xl font-semibold mb-2">Exam Content:</h2>
          <iframe
            src={pdfUrl}
            title="Generated Exam PDF"
            className="w-full h-screen border-none" // Full width and height of the viewport
          />
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = pdfUrl;
              link.target = "_blank"; // Open in a new tab
              link.download = "exam_output.pdf"; // Filename for download
              link.click();
            }}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default TestPage;
