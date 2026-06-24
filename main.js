// Main JavaScript file for Aarul Dhawan's Portfolio Website
// Handles all interactive functionality, animations, and user interactions

// Project modal functionality - defined globally
const projectDetails = {
    'shard': {
        title: 'CS598 (Storage Systems): RDMA Distributed KV Store',
        description: 'Distributed key-value store using one-sided RDMA over RoCE, targeting sub-millisecond latencies as an alternative to AWS S3 Express.',
        features: [
            'One-sided RDMA over RoCE for sub-millisecond read/write latency',
            'Reed-Solomon erasure coding for fault-tolerant durability',
            'Tiered RDMA/NVMe storage for hot and cold data',
            'SWIM-inspired failure detection for distributed coordination'
        ],
        technologies: ['C', 'RDMA/RoCE', 'NVMe', 'Erasure Coding'],
        challenges: 'Implementing one-sided RDMA operations correctly while integrating Reed-Solomon coding and SWIM failure detection without introducing latency overhead.',
        outcome: 'Achieved sub-millisecond latency targets for distributed KV store operations, competitive with S3 Express.'
    },
    'sackv': {
        title: 'CS598 (GenAI Systems): Chunk-Level KV Cache Eviction',
        description: 'Fork of vLLM v0.18.0 that adds semantic chunk-level KV cache eviction for RAG workloads, reducing memory pressure while preserving relevant context.',
        features: [
            'Chunk-level KV cache eviction integrated into the vLLM scheduler',
            'Eviction scores combining retrieval relevance, attention signal, and recency',
            'Weights learned offline via logistic regression on MuSiQue multi-hop QA dataset',
            'Drop-in replacement for vLLM\'s default caching policy'
        ],
        technologies: ['Python', 'vLLM', 'PyTorch', 'RAG', 'LLM Systems'],
        challenges: 'Hooking into vLLM\'s scheduler internals to apply eviction at chunk granularity without breaking existing inference correctness.',
        outcome: 'Demonstrated improved cache efficiency for multi-hop RAG workloads compared to vLLM\'s default eviction policy.'
    },
    'payoff': {
        title: 'PayOff — Offline Peer-to-Peer Payments',
        description: 'Peer-to-peer payment system that works with no WiFi or cellular connection, using Apple Bonjour for device discovery and CryptoKit for transaction security.',
        features: [
            'Device discovery via Apple Bonjour — no internet required',
            'ECDH handshake via Apple CryptoKit for cryptographic security',
            'Transactions queue and execute automatically on reconnect',
            'AWS backend for settlement when connectivity is restored'
        ],
        technologies: ['Swift', 'AWS', 'Apple CryptoKit', 'Bonjour', 'ECDH'],
        challenges: 'Ensuring transaction integrity and preventing double-spend in a fully offline mesh network with no central authority.',
        outcome: 'Built end-to-end at Hack@Brown 2026, demonstrating fully functional offline payments between devices.'
    },
    'arcade-karaoke': {
        title: 'Arcade Karaoke — AWS Award Winner',
        description: 'Multiplayer karaoke game with real-time pitch analysis using Librosa. AWS Award Winner at Hack@Brown 2025.',
        features: [
            'Real-time pitch detection using Librosa PYIN',
            'Dynamic Time Warping to score vocals against reference contours',
            'Multiplayer via WebSocket session coordination',
            'Host/player architecture with live leaderboard'
        ],
        technologies: ['Python', 'React', 'Node.js', 'WebSockets', 'Librosa'],
        challenges: 'Implementing accurate pitch detection in real-time while maintaining low latency for multiplayer gameplay.',
        outcome: 'Won AWS Award at Hack@Brown 2025 for innovative use of cloud technology.'
    }
};

function openProjectModal(projectId) {
    console.log('Opening modal for:', projectId);
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    
    console.log('Modal element:', modal);
    console.log('Modal body:', modalBody);
    
    const project = projectDetails[projectId];
    if (project) {
        modalBody.innerHTML = `
            <h2 class="text-3xl font-bold text-gradient mb-4">${project.title}</h2>
            <p class="text-gray-300 mb-6">${project.description}</p>
            
            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-400 mb-3">Key Features</h3>
                <ul class="space-y-2">
                    ${project.features.map(feature => `<li class="flex items-start"><span class="text-blue-400 mr-2">▸</span><span class="text-gray-300">${feature}</span></li>`).join('')}
                </ul>
            </div>
            
            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-400 mb-3">Technologies Used</h3>
                <div class="flex flex-wrap gap-2">
                    ${project.technologies.map(tech => `<span class="px-3 py-1 bg-blue-500 bg-opacity-20 text-blue-400 rounded-full text-sm">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-400 mb-3">Challenges</h3>
                <p class="text-gray-300">${project.challenges}</p>
            </div>
            
            <div>
                <h3 class="text-xl font-semibold text-blue-400 mb-3">Outcome</h3>
                <p class="text-gray-300">${project.outcome}</p>
            </div>
        `;
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        console.log('Project not found:', projectId);
    }
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeAnimations();
    initializeTypewriter();
    initializeScrollEffects();
    
    console.log('Portfolio website initialized successfully');
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Active navigation highlighting
    updateActiveNavigation();
    window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-white');
        link.classList.add('text-gray-300');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.remove('text-gray-300');
            link.classList.add('text-white');
        }
    });
}

// Typewriter effect for hero section
function initializeTypewriter() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                '> distributed systems engineer',
                '> incoming SDE @ AWS S3',
                '> sub-millisecond latency enjoyer',
                '> building on RDMA + RoCE',
                '> MCS @ UIUC · MS FinMath @ JHU'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 1000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Skills visualization chart
function initializeSkillsChart() {
    const chartElement = document.getElementById('skills-chart');
    if (chartElement && typeof echarts !== 'undefined') {
        const chart = echarts.init(chartElement);
        
        const skillsData = [
            { name: 'Python', value: 95, category: 'Languages' },
            { name: 'Rust', value: 85, category: 'Languages' },
            { name: 'Java', value: 90, category: 'Languages' },
            { name: 'C++', value: 80, category: 'Languages' },
            { name: 'JavaScript', value: 85, category: 'Languages' },
            { name: 'React', value: 80, category: 'Frameworks' },
            { name: 'AWS', value: 90, category: 'Cloud' },
            { name: 'Kubernetes', value: 75, category: 'DevOps' },
            { name: 'ML/AI', value: 85, category: 'Specialization' },
            { name: 'Distributed Systems', value: 90, category: 'Specialization' },
            { name: 'Databases', value: 85, category: 'Backend' },
            { name: 'System Design', value: 88, category: 'Architecture' }
        ];
        
        const categories = [...new Set(skillsData.map(item => item.category))];
        const dataByCategory = {};
        
        categories.forEach(category => {
            dataByCategory[category] = skillsData
                .filter(item => item.category === category)
                .map(item => [item.value, item.name]);
        });
        
        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(26, 26, 26, 0.9)',
                borderColor: 'rgba(212, 165, 116, 0.3)',
                textStyle: {
                    color: '#f8f8f6'
                }
            },
            legend: {
                data: categories,
                textStyle: {
                    color: '#f8f8f6'
                },
                top: 20
            },
            radar: {
                indicator: skillsData.map(item => ({
                    name: item.name,
                    max: 100,
                    color: '#d4a574'
                })),
                center: ['50%', '60%'],
                radius: '60%',
                axisName: {
                    color: '#f8f8f6',
                    fontSize: 12
                },
                splitArea: {
                    areaStyle: {
                        color: ['rgba(212, 165, 116, 0.05)', 'rgba(143, 166, 142, 0.05)']
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(212, 165, 116, 0.3)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(212, 165, 116, 0.2)'
                    }
                }
            },
            series: [{
                type: 'radar',
                data: [{
                    value: skillsData.map(item => item.value),
                    name: 'Technical Skills',
                    areaStyle: {
                        color: 'rgba(212, 165, 116, 0.2)'
                    },
                    lineStyle: {
                        color: '#d4a574',
                        width: 2
                    },
                    itemStyle: {
                        color: '#d4a574'
                    }
                }],
                animationDuration: 2000,
                animationEasing: 'cubicOut'
            }]
        };
        
        chart.setOption(option);
        
        // Responsive chart
        window.addEventListener('resize', function() {
            chart.resize();
        });
        
        // Animate chart on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    chart.setOption(option, true);
                }
            });
        });
        
        observer.observe(chartElement);
    }
}

// Scroll-triggered animations
function initializeScrollEffects() {
    // Reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Parallax effect for hero background
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-bg');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// General animations
function initializeAnimations() {
    // Animate cards on hover
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: this,
                    scale: 1.02,
                    rotateX: 5,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: this,
                    scale: 1,
                    rotateX: 0,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            }
        });
    });
    
    // Animate buttons on hover
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: this,
                    scale: 1.05,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: this,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            }
        });
    });
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300`;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.classList.add('bg-blue-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Resume download functionality
function downloadResume() {
    window.open('./resources/Aarul_Dhawan Resume.pdf', '_blank');
}

// Contact form handling (for pages that have it)
function initializeContactForm() {
    // Let Formspree handle the form submission naturally
    console.log('Contact form initialized - using native Formspree submission');
}

// Project filtering (for projects page)
function initializeProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const searchInput = document.getElementById('search-input');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            
            filterProjects(filter, searchTerm);
        });
    });
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            const searchTerm = this.value.toLowerCase();
            
            filterProjects(activeFilter, searchTerm);
        });
    }
}

function filterProjects(filter, searchTerm) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const tags = card.dataset.tags || '';
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        const matchesFilter = filter === 'all' || tags.includes(filter);
        const matchesSearch = searchTerm === '' || 
            title.includes(searchTerm) || 
            description.includes(searchTerm);
        
        if (matchesFilter && matchesSearch) {
            card.style.display = 'block';
            if (typeof anime !== 'undefined') {
                anime({
                    targets: card,
                    opacity: [0, 1],
                    scale: [0.8, 1],
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            }
        } else {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: card,
                    opacity: 0,
                    scale: 0.8,
                    duration: 200,
                    easing: 'easeInCubic',
                    complete: function() {
                        card.style.display = 'none';
                    }
                });
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeProjectFilters();
});

// Performance optimization
const debouncedScroll = debounce(function() {
    updateActiveNavigation();
}, 100);

window.addEventListener('scroll', debouncedScroll);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Export functions for use in other scripts
window.PortfolioUtils = {
    debounce,
    throttle,
    isValidEmail,
    showNotification,
    downloadResume,
    openProjectModal,
    closeProjectModal
};

console.log('Main.js loaded successfully');