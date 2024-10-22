import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // Your base API URL

function TestPage() {
  const [selectedFile, setSelectedFile] = useState(null); // For file upload
  const [pdfUrl, setPdfUrl] = useState(null); // For storing the generated PDF URL
  const [uploadMessage, setUploadMessage] = useState(""); // Message after uploading
  const [isLoading, setIsLoading] = useState(false); // Loading state for APIs

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to upload file and create exam
  const uploadDataAndCreateExam = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      // Create FormData object to upload file
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Call the index API to upload data
      const responseIndex = await axios.post(`${API_BASE_URL}/api/v1/index/index`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadMessage(responseIndex.data.message); // Success message from index API

      // Call the create_exam API to generate the PDF after successful upload
      const responsePDF = await axios.post(`${API_BASE_URL}/api/v1/create_exam/creat_exam`, {}, {
        responseType: "blob", // Expect a blob (PDF) in the response
      });

      // Convert the blob response into a URL for display
      const pdfBlob = new Blob([responsePDF.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl); // Store the URL for rendering the PDF

    } catch (error) {
      console.error("Error during API calls:", error);
      setUploadMessage("Failed to upload data or generate exam.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-100 to-blue-300">
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Upload File & Generate Exam</h1>

        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button
          onClick={uploadDataAndCreateExam}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Upload and Generate Exam
        </button>

        {isLoading && <p>Đang tải...</p>} {/* Loading message */}
        {uploadMessage && <p>{uploadMessage}</p>} {/* Show upload message */}
      </div>

      {pdfUrl && (
        <div className="flex-grow flex flex-col items-center justify-center p-0 h-full w-full">
          {/* Display the PDF iframe */}
          <iframe
            src={pdfUrl}
            title="Generated Exam PDF"
            className="w-full h-full border-none"
            style={{ height: '80vh', width: '80vw' }} // Adjust the height and width as needed
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
