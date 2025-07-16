import { useState, useEffect } from 'react';
import { Upload, Link, ArrowRight, Minus, Plus } from 'lucide-react';
import './MoodBoardWorkspace.css';

const MoodBoardWorkspace = () => {
  const [openSection, setOpenSection] = useState<'inspiration' | 'brand' | 'competitor'>('inspiration');
  const [sectionTexts, setSectionTexts] = useState({
    inspiration: "I'm creating demo websites for an e-commerce sports company that sells a wide range of sports goods. The look and feel is Bold and Colorful and reminiscent of Gen Z",
    brand: "I'm creating demo websites for an e-commerce sports company that sells a wide range of sports goods. I would like to research all the available content related to this topic from my brand.",
    competitor: "I'm creating demo websites for an e-commerce sports company that sells a wide range of sports goods. I would like to research all the available content related to this topic from a competitor"
  });
  
  const [currentContentSet, setCurrentContentSet] = useState<'set01' | 'set02' | 'set03' | 'set04'>('set01');
  const [isShowingPlaceholders, setIsShowingPlaceholders] = useState(false);
  const [placeholderType, setPlaceholderType] = useState<'inspirational' | 'brand' | 'competitors'>('inspirational');
  const [hasInitialLoaded, setHasInitialLoaded] = useState(false);

  // Initial load: show inspirational placeholders for 1 second, then set01
  useEffect(() => {
    if (!hasInitialLoaded) {
      setIsShowingPlaceholders(true);
      setPlaceholderType('inspirational');
      
      const timer = setTimeout(() => {
        setIsShowingPlaceholders(false);
        setCurrentContentSet('set01');
        setHasInitialLoaded(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [hasInitialLoaded]);

  const handleArrowClick = (section: 'inspiration' | 'brand' | 'competitor') => {
    if (section === 'inspiration') {
      // Show inspirational placeholders for 1 second, then set02
      setIsShowingPlaceholders(true);
      setPlaceholderType('inspirational');
      
      setTimeout(() => {
        setIsShowingPlaceholders(false);
        setCurrentContentSet('set02');
      }, 1000);
    }
  };

  const handleFigmaClick = () => {
    setIsShowingPlaceholders(false);
    setCurrentContentSet('set03');
  };

  const handleCompetitorsClick = () => {
    setIsShowingPlaceholders(false);
    setCurrentContentSet('set04');
  };

  const handleSectionClick = (section: 'inspiration' | 'brand' | 'competitor') => {
    setOpenSection(openSection === section ? openSection : section);
    
    if (section === 'brand') {
      setIsShowingPlaceholders(true);
      setPlaceholderType('brand');
      // Brand placeholders remain static until "Connect to Figma" is clicked
    } else if (section === 'competitor') {
      setIsShowingPlaceholders(true);
      setPlaceholderType('competitors');
      // Competitor placeholders remain static until "All competitors" is clicked
    }
  };

  const toggleSection = (section: 'inspiration' | 'brand' | 'competitor') => {
    handleSectionClick(section);
  };

  const handleTextChange = (section: 'inspiration' | 'brand' | 'competitor', value: string) => {
    setSectionTexts(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const getCurrentImages = () => {
    if (isShowingPlaceholders) {
      return Array.from({ length: 8 }, (_, i) => `/${placeholderType}PlaceHolders/${i + 1}.png`);
    }
    return Array.from({ length: 8 }, (_, i) => `/${currentContentSet}/images/${i + 1}.png`);
  };

  const getCurrentLayouts = () => {
    if (isShowingPlaceholders) {
      return Array.from({ length: 8 }, (_, i) => `/${placeholderType}PlaceHolders/${i + 1}.png`);
    }
    
    // Each set has different layout file names
    const layoutFilesBySet = {
      set01: [
        'image 11825.png',
        'image 11824.png',
        'image 11823.png',
        'image 11822.png',
        'image 11821.png',
        'image 11820.png',
        'image 11819.png',
        'image 11818.png'
      ],
      set02: [
        'image 11799.png',
        'image 11798.png',
        'image 11797.png',
        'image 11796.png',
        'image 11795.png',
        'image 11794.png',
        'image 11793.png',
        'image 11792.png'
      ],
      set03: [
        'Screenshot 2025-07-16 at 16.56.20 1.png',
        'image 11838.png',
        'image 11837.png',
        'image 11836.png',
        'image 11835.png',
        'image 11834.png',
        'image 11832.png'
      ],
      set04: [
        'image 11844.png',
        'image 11843.png',
        'image 11842.png',
        'image 11841.png',
        'image 11840.png',
        'image 11839.png',
        'image 11806.png'
      ]
    };
    
    const layoutNames = layoutFilesBySet[currentContentSet] || [];
    return layoutNames.map(name => `/${currentContentSet}/layouts/${name}`);
  };

  const getCurrentColors = () => {
    if (isShowingPlaceholders) {
      // Use set01 colors for placeholders
      return ['#CDC7C5', '#D3FD49', '#007351', '#000000'];
    }
    
    const colorsBySet = {
      set01: ['#CDC7C5', '#D3FD49', '#007351', '#000000'],
      set02: ['#5E5E5E', '#909192', '#CDC7C5', '#000000'],
      set03: ['#E6E1D0', '#FB5A05', '#9AB298', '#000000'],
      set04: ['#3990F9', '#FF4103', '#F5DB31', '#000000']
    };
    
    return colorsBySet[currentContentSet] || colorsBySet.set01;
  };

  return (
    <div className="mood-board-workspace">
      <div className="subtract-icon">
        <img src="/Subtract.svg" alt="Subtract" />
      </div>
      <div className="workspace-container">
        <div className="workspace-left">
          <div className="project-header">
            <h1 className="project-title">Sport Demo</h1>
          </div>
          
          <div className="inspiration-section">
            <div className="section-header">
              <h2 className="section-title">Inspiration</h2>
              <button 
                className="collapse-button"
                onClick={() => toggleSection('inspiration')}
              >
                {openSection === 'inspiration' ? <Minus size={16} /> : <Plus size={16} />}
              </button>
            </div>
            
            {openSection === 'inspiration' && (
              <>
                <div className="content-box inspiration-content">
                  <textarea
                    className="content-textarea"
                    value={sectionTexts.inspiration}
                    onChange={(e) => handleTextChange('inspiration', e.target.value)}
                    placeholder="Describe your inspiration and vision..."
                  />
                  
                  <div className="content-actions">
                    <button className="add-button">
                      <Plus size={16} />
                    </button>
                    <button className="action-btn">
                      <Upload size={16} />
                      Upload Image
                    </button>
                    <button className="action-btn">
                      <Link size={16} />
                      Add Url
                    </button>
                  </div>
                </div>
                
                <div className="tags-section">
                  <div className="tags-container">
                    <button className="tag">E-commerce</button>
                    <button className="tag">Sports</button>
                    <button className="tag">Gen Z</button>
                    <button className="tag">Bold</button>
                    <button className="tag">Colorful</button>
                    <button className="tag">Trendy</button>
                  </div>
                  <button className="arrow-button inspiration-arrow" onClick={() => handleArrowClick('inspiration')}>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </>
            )}
          </div>
          
          <div className="brand-section">
            <div className="section-header">
              <h2 className="section-title">My Brand</h2>
              <button 
                className="add-section-button"
                onClick={() => toggleSection('brand')}
              >
                {openSection === 'brand' ? <Minus size={16} /> : <Plus size={16} />}
              </button>
            </div>
            
            {openSection === 'brand' && (
              <>
                <div className="content-box brand-content">
                  <textarea
                    className="content-textarea"
                    value={sectionTexts.brand}
                    onChange={(e) => handleTextChange('brand', e.target.value)}
                    placeholder="Describe your brand values and identity..."
                  />
                  <div className="figma-link-container">
                    <a href="#" className="figma-link" onClick={(e) => { e.preventDefault(); handleFigmaClick(); }}>Connect to Figma</a>
                  </div>
                  
                  <div className="content-actions">
                    <button className="add-button">
                      <Plus size={16} />
                    </button>
                    <button className="action-btn">
                      <Upload size={16} />
                      Upload Image
                    </button>
                    <button className="action-btn">
                      <Link size={16} />
                      Add Url
                    </button>
                  </div>
                </div>
                
                <div className="tags-section">
                  <div className="tags-container">
                    <button className="tag">Brand</button>
                    <button className="tag">Identity</button>
                    <button className="tag">Values</button>
                  </div>
                  <button className="arrow-button brand-arrow">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </>
            )}
          </div>
          
          <div className="competitor-section">
            <div className="section-header">
              <h2 className="section-title">Competitor board</h2>
              <button 
                className="add-section-button"
                onClick={() => toggleSection('competitor')}
              >
                {openSection === 'competitor' ? <Minus size={16} /> : <Plus size={16} />}
              </button>
            </div>
            
            {openSection === 'competitor' && (
              <>
                <div className="content-box competitor-content">
                  <textarea
                    className="content-textarea"
                    value={sectionTexts.competitor}
                    onChange={(e) => handleTextChange('competitor', e.target.value)}
                    placeholder="Describe competitor analysis goals..."
                  />
                  <div className="competitors-link-container">
                    <a href="#" className="competitors-link" onClick={(e) => { e.preventDefault(); handleCompetitorsClick(); }}>All competitors</a>
                  </div>
                  
                  <div className="content-actions">
                    <button className="add-button">
                      <Plus size={16} />
                    </button>
                    <button className="action-btn">
                      <Upload size={16} />
                      Upload Image
                    </button>
                    <button className="action-btn">
                      <Link size={16} />
                      Add Url
                    </button>
                  </div>
                </div>
                
                <div className="tags-section">
                  <div className="tags-container">
                    <button className="tag">Competitor</button>
                    <button className="tag">Analysis</button>
                    <button className="tag">Research</button>
                  </div>
                  <button className="arrow-button competitor-arrow">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="workspace-right">
          {/* Masonry Layout Section */}
          <div className="masonry-container">
            <div className="masonry-column column-1">
              <div className="masonry-item">
                <img src={getCurrentImages()[0]} alt="Sports 1" />
              </div>
              <div className="masonry-item">
                <img src={getCurrentImages()[1]} alt="Sports 2" />
              </div>
              <div className="masonry-item">
                <img src={getCurrentImages()[2]} alt="Sports 3" />
              </div>
            </div>
            <div className="masonry-column column-2">
              <div className="masonry-item">
                <img src={getCurrentImages()[3]} alt="Sports 4" />
              </div>
              <div className="masonry-item">
                <img src={getCurrentImages()[4]} alt="Sports 5" />
              </div>
            </div>
            <div className="masonry-column column-3">
              <div className="masonry-item">
                <img src={getCurrentImages()[5]} alt="Sports 6" />
              </div>
              <div className="masonry-item">
                <img src={getCurrentImages()[6]} alt="Sports 7" />
              </div>
              <div className="masonry-item">
                <img src={getCurrentImages()[7]} alt="Sports 8" />
              </div>
            </div>
          </div>

          {/* Color Palette Section */}
          <div className="mood-section">
            <h3 className="mood-section-title">Color palettes</h3>
            <div className="color-palette-container">
              <div className="color-palette">
                {getCurrentColors().map((color, index) => (
                  <div 
                    key={index}
                    className={`color-swatch ${index === 0 ? 'first-swatch' : ''}`} 
                    style={{ backgroundColor: color }} 
                    data-hex={color.replace('#', '')}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Layouts Section */}
          <div className="mood-section">
            <h3 className="mood-section-title">Layouts</h3>
            <div className="layouts-grid">
              {getCurrentLayouts().map((layout, index) => (
                <div key={index} className="layout-item">
                  <img src={layout} alt={`Layout ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Typography Section */}
          <div className="mood-section">
            <h3 className="mood-section-title">Typography</h3>
            <div className="typography-grid">
              <div className="typography-item">
                <img src="/typography/typ1-11.png" alt="Typography 1" />
              </div>
              <div className="typography-item">
                <img src="/typography/typ2-10.png" alt="Typography 2" />
              </div>
              <div className="typography-item">
                <img src="/typography/typ3.png" alt="Typography 3" />
              </div>
              <div className="typography-item">
                <img src="/typography/typ4.png" alt="Typography 4" />
              </div>
            </div>
          </div>

          {/* Icons Section */}
          <div className="mood-section">
            <h3 className="mood-section-title">Icons</h3>
            <div className="icons-container">
              <div className="icon-item">
                <img src="/icons/Kpi.png" alt="KPI Icon" />
              </div>
              <div className="icon-item">
                <img src="/icons/Kpi-1.png" alt="KPI Icon 1" />
              </div>
              <div className="icon-item">
                <img src="/icons/Kpi-2.png" alt="KPI Icon 2" />
              </div>
              <div className="icon-item">
                <img src="/icons/Kpi-3.png" alt="KPI Icon 3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodBoardWorkspace; 