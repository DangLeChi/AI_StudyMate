import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked'; // Import marked

const API_BASE_URL = 'https://duyduongth-studymate.hf.space'; // Replace with your actual API base URL

function UploadPage() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [generatedPdfUrl, setGeneratedPdfUrl] = useState(null);
    const [uploadMessage, setUploadMessage] = useState(""); // Message after uploading
    const [isLoading, setIsLoading] = useState(false); // Loading state for APIs
    const [chatInput, setChatInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const chatboxRef = useRef(null);

    useEffect(() => {
        // Fetch list of available PDFs on component mount
        fetchFiles();
    }, []);

    useEffect(() => {
        // Scroll chatbox to the bottom when chatHistory changes
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const fetchFiles = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/existed_exam/list_pdfs`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
            });
            const data = await response.json();
            setFiles(data.pdf_files); // Populate files list
        } catch (error) {
            console.error('Error fetching PDF files:', error);
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); // Set selected file
    };

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

            // Call the create_exam API to generate the PDF
            const responsePDF = await fetch(`${API_BASE_URL}/api/v1/create_exam/creat_exam_v2`, {
                method: 'POST',
                body: formData,
            });

            const pdfBlob = await responsePDF.blob();
            const pdfUrl = URL.createObjectURL(pdfBlob);
            setGeneratedPdfUrl(pdfUrl); // Store the URL for later selection
            setUploadMessage("Exam generated successfully! You can select it from the list below.");

            // Fetch the updated list of PDF files
            await fetchFiles(); // Refresh the list of PDFs after creating an exam

        } catch (error) {
            console.error("Error during API calls:", error);
            setUploadMessage("Failed to upload data or generate exam.");
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    const handleFileSelect = async (e) => {
        const selectedFilename = e.target.value;
        setSelectedFile(selectedFilename);

        // Fetch and display the selected existing PDF
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/v1/existed_exam/get-pdf?filename=${encodeURIComponent(selectedFilename)}`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                }
            );

            if (!response.ok) throw new Error("Failed to load PDF");

            const blob = await response.blob();
            const pdfUrl = URL.createObjectURL(blob);
            setGeneratedPdfUrl(pdfUrl); // Set PDF URL to display in UI
        } catch (error) {
            console.error('Error fetching PDF file:', error);
            setGeneratedPdfUrl(''); // Clear PDF URL if there's an error
        }
    };

    const handleChat = async (e) => {
        e.preventDefault();
        if (!chatInput.trim() || !selectedFile) return;

        const userMessage = { role: 'user', content: chatInput, timestamp: new Date() };
        setChatHistory((prev) => [...prev, userMessage]);
        setChatInput('');
        setIsLoading(true); // Start loading when sending chat message

        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/chat/chitchatv2`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: chatInput,
                    file_name: selectedFile, // Use the name of the selected file
                }),
            });
            const responseData = await response.json();
            const aiMessage = { role: 'assistant', content: responseData.data, timestamp: new Date() };
            setChatHistory((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error sending chat message:', error);
            const errorMessage = { role: 'assistant', content: 'Error: Unable to get response', timestamp: new Date() };
            setChatHistory((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false); // Stop loading after chat message is handled
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen flex justify-center items-center p-0"> {/* Thay đổi padding để chiếm toàn bộ màn hình */}
            <div className="bg-white w-full h-full rounded-lg shadow-lg flex flex-col overflow-hidden" style={{ position: 'relative', top: '-20%' }}> {/* Thay đổi chiều cao để chiếm toàn bộ màn hình */}
                <div className="p-4 flex-grow"> {/* Thêm flex-grow để chiếm không gian */}
                    <h1 className="text-3xl font-bold mb-6">Upload File & Generate Exam</h1>
                    <p className="mb-4">Please upload your documents, we will create a test for you!</p>
                    
                    <input type="file" onChange={handleFileChange} className="mb-4" />
                    <button
                        onClick={uploadDataAndCreateExam}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Upload and Generate Exam
                    </button>
                    
                    {isLoading && <p>Loading...</p>} {/* Loading message */}
                    {uploadMessage && <p>{uploadMessage}</p>} {/* Show upload message */}

                    <h2 className="text-xl mt-6 mb-4">Choose Existing Exam to Chat</h2>
                    <select
                        className="border p-2 rounded w-full mb-4"
                        onChange={handleFileSelect}
                    >
                        <option value="">Select a file</option>
                        {files.map((file, index) => (
                            <option key={index} value={file}>
                                {file}
                            </option>
                        ))}
                    </select>
                </div>
                
                {generatedPdfUrl && (
                    <div className="flex-grow flex flex-col items-center justify-center p-0 h-full w-full mb-4">
                        <iframe
                            src={generatedPdfUrl}
                            title="Exam PDF"
                            className="w-full h-full border-none"
                            style={{ height: '80vh', width: '80vw' }} // Adjust the height and width as needed
                        />
                        <button
                            onClick={() => {
                                const link = document.createElement("a");
                                link.href = generatedPdfUrl;
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
                
                <div className="flex flex-col h-96 w-full">
                    <div ref={chatboxRef} className="flex-1 p-4 overflow-y-auto bg-blue-50 rounded-t-lg">
                        {chatHistory.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`flex items-end space-x-2 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                                >
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                                    <div className="flex flex-col space-y-1 max-w-xs">
                                        {/* Separate container for user messages */}
                                        {message.role === 'user' ? (
                                            <div
                                                className={`px-4 py-2 rounded-3xl bg-blue-600 text-white`}
                                                style={{ width: '100%', margin: '0 auto' }} // Set width to 80% and center it
                                            >
                                                <span dangerouslySetInnerHTML={{ __html: marked(message.content) }} /> {/* Render Markdown */}
                                            </div>
                                        ) : (
                                            // Separate container for assistant messages
                                            <div
                                                className={`px-4 py-2 rounded-3xl bg-gray-200 text-gray-800`}
                                                style={{ width: '400%', margin: '0 auto' }} // Set width to 80% and center it
                                            >
                                                <span dangerouslySetInnerHTML={{ __html: marked(message.content) }} /> {/* Render Markdown */}
                                            </div>
                                        )}
                                        <span className="text-xs text-gray-500 self-start">
                                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleChat} className="flex">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ask a question..."
                            className="flex-1 border rounded-l-lg px-4 py-2"
                        />
                        <button type="submit" className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UploadPage;