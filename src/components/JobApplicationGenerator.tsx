import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Sparkles, Zap, CheckCircle, Users, TrendingUp, Award, Star, ArrowRight } from 'lucide-react';

const JobApplicationGenerator = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    console.log('Generating application...');
  };

  const stats = [
    { icon: CheckCircle, value: "98%", label: "Success Rate", color: "text-accent" },
    { icon: Users, value: "50K+", label: "Happy Users", color: "text-primary" },
    { icon: TrendingUp, value: "3x", label: "More Interviews", color: "text-accent-glow" },
    { icon: Award, value: "#1", label: "AI Tool", color: "text-primary-glow" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-primary rounded-full opacity-10 animate-float"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-accent rounded-full opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-hero rounded-full opacity-5 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="mx-auto max-w-6xl">
          {/* Enhanced Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-3 mb-6 p-3 rounded-full bg-gradient-card border border-primary/20">
              <div className="p-2 rounded-full bg-gradient-primary animate-pulse-glow">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-primary-glow font-medium px-3">Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                AI-Powered Job
              </span>
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Application Generator
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Transform your resume and any job posting into a perfectly tailored application that 
              <span className="text-accent font-semibold"> stands out from the crowd</span>
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`text-center p-4 rounded-xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Main Form */}
          <Card className={`bg-gradient-card border-border/50 shadow-card backdrop-blur-sm p-8 md:p-12 transition-all duration-800 hover:shadow-glow ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Enhanced Resume Upload */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-primary">
                    <Upload className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <Label htmlFor="resume" className="text-xl font-display font-semibold text-foreground">
                    Upload Resume
                  </Label>
                </div>
                
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 group ${
                    isDragOver
                      ? 'border-primary bg-primary/10 scale-105'
                      : selectedFile
                      ? 'border-accent bg-accent/10 shadow-accent'
                      : 'border-input-border bg-input/20 hover:border-primary/50 hover:bg-input/30'
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
                  <div className="space-y-6">
                    {selectedFile ? (
                      <div className="space-y-4 animate-scale-in">
                        <div className="flex items-center justify-center gap-4">
                          <div className="p-3 rounded-full bg-gradient-accent">
                            <FileText className="h-8 w-8 text-accent-foreground" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-foreground text-lg">{selectedFile.name}</p>
                            <p className="text-accent">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready to process
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-accent">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">File uploaded successfully</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="relative">
                          <Upload className="h-16 w-16 text-muted-foreground mx-auto group-hover:text-primary transition-colors duration-300 group-hover:scale-110 transition-transform" />
                          <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 animate-pulse"></div>
                        </div>
                        <div>
                          <p className="text-xl font-semibold text-foreground mb-2">
                            Drop your resume here
                          </p>
                          <p className="text-muted-foreground">
                            or <span className="text-primary font-medium">click to browse</span>
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Supports PDF & DOCX formats
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced Job Description */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-accent">
                    <FileText className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <Label htmlFor="job-description" className="text-xl font-display font-semibold text-foreground">
                    Job Description
                  </Label>
                </div>
                
                <div className="relative">
                  <Textarea
                    id="job-description"
                    placeholder="Paste the complete job posting here...

Include:
• Job title and company
• Required skills and experience
• Responsibilities and requirements
• Company culture and values"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[350px] bg-input/50 border-input-border text-foreground placeholder:text-muted-foreground resize-none focus:border-primary focus:bg-input/70 transition-all duration-300 rounded-2xl p-6 text-base leading-relaxed backdrop-blur-sm"
                  />
                  <div className="absolute bottom-4 right-4 text-sm text-muted-foreground">
                    {jobDescription.length}/5000
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-primary-foreground/90">
                    <span className="font-semibold">Pro Tip:</span> Include requirements, responsibilities, and company info for the most personalized application.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Generate Button */}
            <div className="mt-12 text-center">
              <Button
                variant="hero"
                size="lg"
                onClick={handleGenerate}
                disabled={!selectedFile || !jobDescription.trim()}
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <Zap className="h-6 w-6 group-hover:animate-pulse" />
                  <span>Generate Tailored Application</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Button>
              
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>AI-powered analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Professional formatting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Ready in 30 seconds</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Enhanced Features Grid */}
          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Matching",
                description: "Advanced machine learning algorithms analyze your resume and match your skills perfectly to job requirements",
                gradient: "bg-gradient-primary"
              },
              {
                icon: FileText,
                title: "Professional Output",
                description: "Generate ATS-friendly cover letters and applications that pass through applicant tracking systems",
                gradient: "bg-gradient-accent"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Get your perfectly tailored application ready in under 30 seconds with our optimized AI processing",
                gradient: "bg-gradient-hero"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`group p-8 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-glow ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${0.8 + index * 0.2}s` }}
              >
                <div className={`inline-flex p-4 rounded-2xl ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationGenerator;