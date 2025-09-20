import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Sparkles, Zap } from 'lucide-react';

const JobApplicationGenerator = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setSelectedFile(file);
    }
  };

  const handleGenerate = () => {
    // Placeholder for generation logic
    console.log('Generating application...');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI-Powered Job Application Generator
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your resume and any job posting into a perfectly tailored application in seconds
          </p>
        </div>

        {/* Main Form */}
        <Card className="bg-gradient-card border-border shadow-card p-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Resume Upload */}
            <div className="space-y-4">
              <Label htmlFor="resume" className="text-lg font-semibold text-foreground">
                Upload Resume
              </Label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
                  isDragOver
                    ? 'border-primary bg-primary/10'
                    : selectedFile
                    ? 'border-accent bg-accent/10'
                    : 'border-input-border bg-input/30'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-4">
                  {selectedFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="h-8 w-8 text-accent" />
                      <div>
                        <p className="font-medium text-foreground">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-foreground">
                          Drop your resume here
                        </p>
                        <p className="text-muted-foreground">
                          or click to browse (PDF, DOCX)
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-4">
              <Label htmlFor="job-description" className="text-lg font-semibold text-foreground">
                Job Description
              </Label>
              <Textarea
                id="job-description"
                placeholder="Paste the complete job posting here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[300px] bg-input border-input-border text-foreground placeholder:text-muted-foreground resize-none focus:border-primary transition-smooth"
              />
              <p className="text-sm text-muted-foreground">
                Include requirements, responsibilities, and company info for best results
              </p>
            </div>
          </div>

          {/* Generate Button */}
          <div className="mt-8 text-center">
            <Button
              variant="primary"
              size="lg"
              onClick={handleGenerate}
              disabled={!selectedFile || !jobDescription.trim()}
              className="px-12 py-4 text-lg"
            >
              <Zap className="h-5 w-5" />
              Generate Tailored Application
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              AI will analyze your resume and craft a personalized application
            </p>
          </div>
        </Card>

        {/* Features */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="text-center p-6">
            <div className="inline-flex p-3 rounded-lg bg-gradient-accent mb-4">
              <Sparkles className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">AI-Powered Matching</h3>
            <p className="text-muted-foreground">
              Advanced algorithms match your skills to job requirements
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex p-3 rounded-lg bg-gradient-primary mb-4">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Professional Output</h3>
            <p className="text-muted-foreground">
              Generate cover letters and applications that stand out
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex p-3 rounded-lg bg-gradient-accent mb-4">
              <Zap className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Get your tailored application ready in under 30 seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationGenerator;