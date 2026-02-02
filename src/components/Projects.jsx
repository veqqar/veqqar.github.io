import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../assets/styles/Nav.css';
import '../assets/styles/App.css';

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const isAutoScrollingRef = useRef(false);
  const rafRef = useRef(null);
  const scrollEndTimeoutRef = useRef(null);
  const latestClosestRef = useRef(0);

  const projects = [
    { 
      title: "NexusFlow", 
      infoFormatted: <>June <span className="project__info-numbers">23</span> // Design UI & UX</>,
      link: `www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1`,
      description: "A comprehensive platform for managing and visualizing network data flows with real-time analytics and intuitive dashboards.",
      tools: ["React", "Node.js", "MongoDB", "WebSocket", "Docker"]
    },
    { 
      title: "QuantumCore", 
      infoFormatted: <>April <span className="project__info-numbers">22</span> // Software Dev</>,
      link: `www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1`,
      description: "Quantum computing simulation framework for cryptographic analysis and optimization algorithms in cybersecurity applications.",
      tools: ["Python", "Qiskit", "NumPy", "PostgreSQL", "FastAPI", "Redis"]
    },
    { 
      title: "ShadowNet", 
      infoFormatted: <>March <span className="project__info-numbers">24</span> // Malware Analysis</>,
      link: `www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1`,
      description: "Sandbox environment for dynamic malware analysis with behavioral monitoring and threat intelligence integration.",
      tools: ["C++", "Python", "Volatility", "YARA", "Elasticsearch", "Kibana"]
    },
    { 
      title: "VulnScan Pro", 
      infoFormatted: <>November <span className="project__info-numbers">19</span> // Pentesting</>,
      link: `www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1`,
      description: "Automated vulnerability scanning tool with comprehensive reporting and remediation guidance for security teams.",
      tools: ["Python", "Nmap", "Metasploit", "SQLite", "Flask", "Celery"]
    },
    { 
      title: "CroCoToolz", 
      infoFormatted: <>September <span className="project__info-numbers">25</span> // CyberSec Tools Dev</>,
      link: `www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1`,
      description: "Collection of custom cybersecurity utilities for penetration testing, forensics, and security automation.",
      tools: ["Python", "Bash", "Go", "SQLite", "Docker", "Ansible"]
    },
    { 
      title: "MobiSecure", 
      infoFormatted: <>January <span className="project__info-numbers">23</span> // Mobile App Development</>,
      link: `www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1`,
      description: "Mobile security application with secure communications, file encryption, and device integrity monitoring.",
      tools: ["React Native", "Java", "SQLCipher", "Firebase", "AWS", "WebRTC"]
    },
    { 
      title: "CloudShield", 
      infoFormatted: <>July <span className="project__info-numbers">22</span> // Cloud Infrastructure</>,
      link: `www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1`,
      description: "Cloud security platform for AWS, Azure, and GCP with automated compliance checking and threat detection.",
      tools: ["Terraform", "Python", "AWS Lambda", "Azure Functions", "GCP", "Kubernetes"]
    },
    { 
      title: "DataCrypt", 
      infoFormatted: <>August <span className="project__info-numbers">23</span> // Encryption Systems</>,
      link: `www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1`,
      description: "End-to-end encryption system with quantum-resistant algorithms and secure key management infrastructure.",
      tools: ["C", "OpenSSL", "Python", "PostgreSQL", "Docker", "Kubernetes"]
    },
    { 
      title: "NetWatch", 
      infoFormatted: <>December <span className="project__info-numbers">24</span> // Network Security</>,
      link: `www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1`,
      description: "Network monitoring and intrusion detection system with real-time traffic analysis and anomaly detection.",
      tools: ["Python", "Scapy", "Elastic Stack", "React", "Node.js", "Docker"]
    },
    { 
      title: "SecureComm", 
      infoFormatted: <>May <span className="project__info-numbers">23</span> // Secure Communications</>,
      link: `www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1`,
      description: "Secure messaging platform with military-grade encryption, self-destructing messages, and blockchain verification.",
      tools: ["React", "Node.js", "WebRTC", "Blockchain", "MongoDB", "Docker"]
    }
  ];

  const centerItem = useCallback((index) => {
    const item = itemRefs.current[index];
    const list = listRef.current;
    if (!item || !list) return;

    isAutoScrollingRef.current = true;

    item.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

    setActiveIndex(index);

    window.setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 500);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => centerItem(0), 300);
    return () => clearTimeout(t);
  }, [centerItem]);

  const computeClosestIndex = useCallback(() => {
    const list = listRef.current;
    if (!list || itemRefs.current.length === 0) return 0;

    const center = list.scrollTop + list.clientHeight / 2;
    let closestIndex = 0;
    let minDist = Infinity;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const itemCenter = item.offsetTop + item.offsetHeight / 2;
      const dist = Math.abs(itemCenter - center);
      if (dist < minDist) {
        minDist = dist;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, []);

  const handleScroll = useCallback(() => {
    if (isAutoScrollingRef.current) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const closest = computeClosestIndex();
      latestClosestRef.current = closest;

      setActiveIndex(prev => (prev === closest ? prev : closest));
    });

    if (scrollEndTimeoutRef.current) clearTimeout(scrollEndTimeoutRef.current);
    scrollEndTimeoutRef.current = setTimeout(() => {
      const toCenter = latestClosestRef.current;
      if (!isAutoScrollingRef.current) {
        isAutoScrollingRef.current = true;
        centerItem(toCenter);
        setTimeout(() => { isAutoScrollingRef.current = false; }, 600);
      }
    }, 120);
  }, [centerItem, computeClosestIndex]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      list.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollEndTimeoutRef.current) clearTimeout(scrollEndTimeoutRef.current);
    };
  }, [handleScroll]);

  const handleItemClick = (index) => {
    centerItem(index);
  };

  return (
    <div className="projects__container">
      <div className="project__item__panel">
        <div className="project__item__content">
          <div className="project__item__content__description">
            <div className="project__item__text">
              {projects[activeIndex]?.description || "no description available..."}
            </div>
            <div className="project__item__more__info">
              <a 
                href={`https://${projects[activeIndex]?.link}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project__item__more__info__link"
              >
                CLICK HERE FOR DETAILS <i className="fa-solid fa-square-arrow-up-right"></i>
              </a>
            </div>
          </div>
          <div className="project__item__content__tools">
            <div className="project__item__text">
              <div className="project__tools__grid">
                {projects[activeIndex]?.tools && projects[activeIndex].tools.map((tool, index) => (
                  <div key={index} className="project__tool__item">
                    {tool}
                  </div>
                ))}
              </div>  
            </div>
          </div>
        </div>
      </div>

      <div className="projects__content">
        <div className='projects__list' ref={listRef}>
          {projects.map((project, index) => (
            <div
              key={index}
              className={`project__item ${activeIndex === index ? 'active' : ''}`}
              ref={el => itemRefs.current[index] = el}
              onClick={() => handleItemClick(index)}
            >
              <div className='project__title'>
                {project.title}
              </div>
              <div className='project__info'>{project.infoFormatted}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;