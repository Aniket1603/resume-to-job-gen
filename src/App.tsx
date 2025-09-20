import React, { useState } from 'react';
// Import karein baki components jaise Lovable ne banaye hain

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // File handle karne ke liye function
  const handleFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  // Button click par API call karne ke liye function
  const generateApplication = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    // File se text read karein
    const reader = new FileReader();
    reader.onload = async (e) => {
      const resumeText = e.target.result;

      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ resumeText, jobDescription }),
        });

        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();
        setGeneratedContent(data); // Generated content ko state mein save karein

      } catch (err) {
        console.error('API call error:', err);
        setError('Failed to generate application. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (resumeFile) {
      reader.readAsText(resumeFile);
    } else {
      setError('Please upload a resume file.');
      setIsLoading(false);
    }
  };

  return (
    // Yahan Lovable ka poora JSX code paste karein
    <div className="main-container">
      <h1>AI-Powered Job Application Generator</h1>
      <p>Transform your resume and any job posting into a perfectly tailored application in seconds</p>

      <div className="form-container">
        <div className="input-field">
          <h3>Upload Resume</h3>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="input-field">
          <h3>Job Description</h3>
          <textarea
            rows="10"
            placeholder="Paste the complete job posting here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
        </div>
      </div>

      <button onClick={generateApplication} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Tailored Application'}
      </button>

      {/* Generated content display karein */}
      {error && <div style={{ color: 'red', marginTop: '20px' }}>{error}</div>}
      {generatedContent && (
        <div className="output-container" style={{ marginTop: '30px' }}>
          <h2>Generated Content</h2>
          <div>
            <h3>Tailored Resume</h3>
            <p>{generatedContent.resume}</p>
          </div>
          <div>
            <h3>Cover Letter</h3>
            <p>{generatedContent.cover_letter}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;