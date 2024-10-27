import React, { useState, useRef, useEffect } from 'react';

function UploadPage() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');
    const [chatInput, setChatInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Added loading state
    const chatboxRef = useRef(null);

    useEffect(() => {
        // Fetch list of available PDFs
        const fetchFiles = async () => {
            try {
                const response = await fetch('https://duyduongth-studymate.hf.space/api/v1/existed_exam/list_pdfs', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                });
                const data = await response.json();
                setFiles(data.pdf_files);  // Populate files list
            } catch (error) {
                console.error('Error fetching PDF files:', error);
            }
        };
        
        fetchFiles();
    }, []);

    useEffect(() => {
        // Scroll chatbox to the bottom when chatHistory changes
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleFileSelect = async (e) => {
        const selectedFilename = e.target.value;
        setSelectedFile(selectedFilename);
    
        // Fetch and display the selected PDF
        try {
            const response = await fetch(
                `https://duyduongth-studymate.hf.space/api/v1/existed_exam/get-pdf?filename=${encodeURIComponent(selectedFilename)}`,
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
            setPdfUrl(pdfUrl);  // Set PDF URL to display in UI
        } catch (error) {
            console.error('Error fetching PDF file:', error);
            setPdfUrl(''); // Clear PDF URL if there's an error
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
            const response = await fetch('https://duyduongth-studymate.hf.space/api/v1/chat/chitchat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: chatInput,
                    file_name: selectedFile,
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
        <div className="bg-gray-200 min-h-screen flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg flex flex-col overflow-hidden">
                <div className="p-4">
                    <h1 className="text-3xl font-bold mb-6">Choose Existing Exam & Chat</h1>
                    <p className="mb-4 text-gray-600">Select an existing document to chat with our system.</p>
                    <select
                        className="border p-2 rounded w-full mb-4"
                        value={selectedFile}
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
                
                {pdfUrl && (
                    <div className="flex-grow flex flex-col items-center justify-center p-0 h-full w-full mb-4">
                        {/* Display the PDF iframe */}
                        <iframe
                            src={pdfUrl}
                            title="Selected PDF"
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
                
                <div className="flex flex-col h-96 w-full">
                    <div ref={chatboxRef} className="flex-1 p-4 overflow-y-auto bg-blue-50 rounded-t-lg">
                        {chatHistory.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`flex items-end space-x-2 ${
                                        message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                                    }`}
                                >
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                                    <div className="flex flex-col space-y-1 max-w-xs">
                                        <div
                                            className={`px-4 py-2 rounded-3xl ${
                                                message.role === 'user'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-800'
                                            }`}
                                        >
                                            {message.content}
                                        </div>
                                        <span className="text-xs text-gray-500 self-start">
                                            {new Date(message.timestamp).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleChat} className="border-t p-4 bg-white rounded-b-lg">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder="Type your message here..."
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={!selectedFile || isLoading}  // Disable button if no file selected or loading
                            >
                                {isLoading ? "Sending..." : "Send"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UploadPage;
