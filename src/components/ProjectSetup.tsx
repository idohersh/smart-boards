import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Link, ArrowRight } from 'lucide-react';
import './ProjectSetup.css';

interface ProjectSetupData {
  name: string;
  projectType: string;
  boardType: 'inspiration' | 'competitor' | 'brand';
  question1: string;
  question2: string;
}

type QuestionStep = 'board-selection' | 'question1' | 'question2' | 'complete';

const ProjectSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProjectSetupData>({
    name: 'Sport Demo',
    projectType: '',
    boardType: 'inspiration',
    question1: '',
    question2: ''
  });
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<QuestionStep>('question1');

  const questions = {
    inspiration: {
      question1: "What are you designing?",
      question2: "Style or Look & Feel"
    },
    competitor: {
      question1: "Which competitors should we analyze and compare against?",
      question2: "What specific aspects of their approach do you want to explore?"
    },
    brand: {
      question1: "What are the core values and personality of your brand?",
      question2: "How do you want your brand to be perceived by your audience?"
    }
  };

  const handleBoardTypeChange = (boardType: 'inspiration' | 'competitor' | 'brand') => {
    setFormData(prev => ({ ...prev, boardType, question1: '', question2: '' }));
    setCurrentStep('question1');
  };

  const handleNext = () => {
    if (currentStep === 'question1' && formData.question1.trim()) {
      setCurrentStep('question2');
    } else if (currentStep === 'question2' && formData.question2.trim()) {
      setCurrentStep('complete');
      // Navigate to workspace with project data
      navigate('/project/sport-demo', { state: formData });
    }
  };

  const canContinue = () => {
    if (currentStep === 'question1') {
      return formData.question1.trim().length > 0;
    }
    if (currentStep === 'question2') {
      return formData.question2.trim().length > 0;
    }
    return false;
  };

  const getCurrentQuestion = () => {
    if (currentStep === 'question1') {
      return questions[formData.boardType].question1;
    }
    if (currentStep === 'question2') {
      return questions[formData.boardType].question2;
    }
    return '';
  };

  const getCurrentValue = () => {
    if (currentStep === 'question1') {
      return formData.question1;
    }
    if (currentStep === 'question2') {
      return formData.question2;
    }
    return '';
  };

  const getCurrentPlaceholder = () => {
    if (currentStep === 'question1') {
      if (formData.boardType === 'inspiration') {
        return 'e.g. landing page for eco brand, app for kids, packaging for tea';
      }
      return 'Enter your answer here...';
    }
    if (currentStep === 'question2') {
      if (formData.boardType === 'inspiration') {
        return 'e.g. minimal, vintage, bold, futuristic';
      }
      return 'Enter your answer here...';
    }
    return 'Enter your answer here...';
  };

  const handleInputChange = (value: string) => {
    if (currentStep === 'question1') {
      setFormData(prev => ({ ...prev, question1: value }));
    } else if (currentStep === 'question2') {
      setFormData(prev => ({ ...prev, question2: value }));
    }
  };

  return (
    <div className="project-setup">
              <div className="subtract-icon">
          <img src="./Subtract.svg" alt="Subtract" />
        </div>
      <div className="setup-container">
        <div className="setup-left">
          <main className="setup-main">
            <div className="setup-form">
              <div className="form-top">
                <h1 className="setup-title">Start a new project</h1>

                <div className="project-fields">
                  <div className="project-field">
                    <label className="field-label">Project name</label>
                    <input
                      type="text"
                      className="field-input"
                      placeholder="Name your project"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="project-field">
                    <label className="field-label">Project type</label>
                    <input
                      type="text"
                      className="field-input"
                      placeholder="e.g branding / Campaign / Product Page / Photoshoot etc."
                      value={formData.projectType}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="form-bottom">

              <div className="form-group tooltip-container">
                <div className="board-type-selector">
                  <label className="form-label">Select mood board type:</label>
                  
                  <div className="button-with-tooltip">
                    <button
                      type="button"
                      className={`board-type-button inspiration ${formData.boardType === 'inspiration' ? 'active' : ''}`}
                      onClick={() => handleBoardTypeChange('inspiration')}
                      onMouseEnter={() => setHoveredTooltip('inspiration')}
                      onMouseLeave={() => setHoveredTooltip(null)}
                    >
                      Inspiration board
                    </button>
                    {hoveredTooltip === 'inspiration' && (
                      <div className="hover-tooltip inspiration-tooltip">
                        <div className="tooltip-content">
                          <div className="tooltip-text">
                            <h3>Inspiration board</h3>
                            <p>Pulls fresh ideas from top global design sources</p>
                          </div>
                          <div className="tooltip-icon">
                            <img src="./Inspiration-icon.png" alt="Inspiration" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="button-with-tooltip">
                    <button
                      type="button"
                      className={`board-type-button brand ${formData.boardType === 'brand' ? 'active' : ''}`}
                      onClick={() => handleBoardTypeChange('brand')}
                      onMouseEnter={() => setHoveredTooltip('brand')}
                      onMouseLeave={() => setHoveredTooltip(null)}
                    >
                      Brand board
                    </button>
                                         {hoveredTooltip === 'brand' && (
                       <div className="hover-tooltip brand-tooltip">
                         <div className="tooltip-content">
                           <div className="tooltip-text">
                             <h3>Brand board</h3>
                             <p>Builds on your brand's past visual assets</p>
                           </div>
                                                     <div className="tooltip-icon">
                            <img src="./Brand-icon.png" alt="Brand" />
                          </div>
                         </div>
                       </div>
                     )}
                  </div>
                  
                  <div className="button-with-tooltip">
                    <button
                      type="button"
                      className={`board-type-button competitor ${formData.boardType === 'competitor' ? 'active' : ''}`}
                      onClick={() => handleBoardTypeChange('competitor')}
                      onMouseEnter={() => setHoveredTooltip('competitor')}
                      onMouseLeave={() => setHoveredTooltip(null)}
                    >
                      Competitor board
                    </button>
                    {hoveredTooltip === 'competitor' && (
                      <div className="hover-tooltip competitor-tooltip">
                        <div className="tooltip-content">
                          <div className="tooltip-text">
                            <h3>Competitor board</h3>
                            <p>Analyzes visual language from a brand you name</p>
                          </div>
                          <div className="tooltip-icon">
                            <img src="./Competitor-icon.png" alt="Competitor" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {(currentStep === 'question1' || currentStep === 'question2') && (
                <div className="form-section">
                  <div className="form-group">
                    <label className="form-label">{getCurrentQuestion()}</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder={getCurrentPlaceholder()}
                      value={getCurrentValue()}
                      onChange={(e) => handleInputChange(e.target.value)}
                    />
                  </div>

                  <div className="action-buttons">
                    <button type="button" className="action-button">
                      <Upload size={16} />
                      Upload Image
                    </button>
                    <button type="button" className="action-button">
                      <Link size={16} />
                      Add Url
                    </button>
                  </div>
                </div>
              )}

              {(currentStep === 'question1' || currentStep === 'question2') && (
                <button 
                  className={`next-button ${formData.boardType}`} 
                  onClick={handleNext}
                  disabled={!canContinue()}
                  style={{ opacity: canContinue() ? 1 : 0.5 }}
                >
                  <ArrowRight size={20} />
                </button>
              )}
              </div>
            </div>
          </main>
        </div>

        <div className="setup-right">
          <div className={`gradient-background ${formData.boardType}-background`}>
            <div className="heart-design">
              <div className="heart-shape"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSetup; 