// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Add specific animations based on element type
            if (entry.target.classList.contains('project-card')) {
                entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}ms`;
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.dataset.delay = index * 100;
    observer.observe(card);
});

document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
});

document.querySelectorAll('.achievement-card').forEach(card => {
    observer.observe(card);
});

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        if (i === index) {
            testimonial.style.display = 'block';
            testimonial.classList.add('fade-in');
        } else {
            testimonial.style.display = 'none';
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
    nextBtn.addEventListener('click', nextTestimonial);
    
    // Initialize first testimonial
    showTestimonial(0);
    
    // Auto-rotate testimonials
    setInterval(nextTestimonial, 5000);
}

// Active navigation highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill card animations on hover
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('h3').style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('h3').style.transform = 'scale(1)';
    });
});

// Remove parallax effect that causes overlap
// The hero section will now stay in its fixed position
window.addEventListener('scroll', () => {
    // Removed parallax effect to prevent overlap with About section
});

// Form validation (if contact form is added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Copy email to clipboard functionality
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    // Show notification
    showNotification('Email copied to clipboard!');
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
    // Handle scroll-based animations
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Lazy loading for images (if images are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Chatbot Widget Functionality
const chatbotWidget = document.getElementById('chatbotWidget');
const chatbotHeader = document.getElementById('chatbotHeader');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotProgress = document.getElementById('chatbotProgress');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// Toggle minimize/maximize
function toggleChatbot() {
    chatbotWidget.classList.toggle('minimized');
    
    // Update progress text based on new state
    if (isModelLoading && chatbotProgress.style.display !== 'none') {
        const currentProgress = progressFill.style.width;
        const progressValue = parseInt(currentProgress) || 0;
        progressText.textContent = `${progressValue}%`;
    }
}

chatbotHeader.addEventListener('click', toggleChatbot);
chatbotToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleChatbot();
});

// WebLLM Integration
let engine = null;
let isModelLoading = false;
let isModelReady = false;
let isGenerating = false;
let startTime = 0;

// System prompt for the chatbot
const SYSTEM_PROMPT = `You are Songlin Hou's digital twin helping visitors learn about his professional portfolio.
When answer questions, please use I to represent Songlin Hou.
Songlin is a Software Engineer with 5+ years of experience at Dell Technologies as an A-Team member.

Key information about Songlin:
- Experience: 5+ years at Dell A-Team, leading complex projects in security automation, predictive analytics, AI-assisted troubleshooting, platform integration, containerization, and anomaly detection
- Projects: CAC/PIV Certificate Management, Bug-Stomp Initiative, Performance Forecast Integration, Analytics Engine Dockerization, Anomaly Detection Platform
- Skills: Security & Authentication, AI & Machine Learning, LLM Systems (Multi-Agent Systems, Tool Calling, Fine-tuning, RAG), Platform Engineering, Technical Leadership
- LLM Expertise: Multi-agentic system design, tool calling frameworks, model fine-tuning, RAG (Retrieval-Augmented Generation), prompt engineering
- Contact: songlinhou1993@gmail.com, LinkedIn: https://www.linkedin.com/in/songlin-hou, or use the "Send Message" button in the "Get In Touch" section
- Research: https://songlinhou.github.io/

Answer questions concisely and helpfully. If asked about topics not covered in Songlin's portfolio, politely redirect to relevant information.
DO NOT MENTION ANYTHING THAT YOU ARE A LARGE LANGUAGE MODEL OR AI. FOR PERSONAL QUESTIONS OR ANY QUESTIONS OUTSIDE YOUR KNOWLEDGE OF SONGLIN HOU, LET VISITORS USE "SEND MESSAGE" FUNCTION IN THE "Get In Touch" SECTION.
If you cannot answer the question based on the provided information, let the visitor to send message in the "Get In Touch" section. Also mention you can find more information on Songlin's LinkedIn or personal website.
`;

// Initialize WebLLM engine
async function initializeWebLLM() {
    if (isModelLoading || isModelReady) return;
    
    isModelLoading = true;
    chatbotWidget.classList.add('is-loading');
    startTime = Date.now();
    
    // Show progress bar
    chatbotProgress.style.display = 'block';
    progressFill.style.width = '0%';
    progressText.textContent = 'Loading model...';
    
    try {
        const webllm = await import("https://esm.run/@mlc-ai/web-llm");
        
        const initProgressCallback = (initProgress) => {
            console.log("Model loading progress:", initProgress);
            
            // Update progress bar
            if (initProgress.progress) {
                const progress = Math.round(initProgress.progress * 100);
                progressFill.style.width = `${progress}%`;
                progressText.textContent = `${progress}%`;
            }
        };
        
        // Using Llama-3.2-3B model
        const selectedModel = "Llama-3.2-3B-Instruct-q4f16_1-MLC";
        
        engine = await webllm.CreateMLCEngine(
            selectedModel,
            { initProgressCallback: initProgressCallback }
        );
        
        isModelReady = true;
        isModelLoading = false;
        chatbotWidget.classList.remove('is-loading');
        
        // Hide progress bar and show ready message
        chatbotProgress.style.display = 'none';
        addMessage("Do you have any questions about me? I am happy to answer now!", false);
        
    } catch (error) {
        console.error("Failed to load WebLLM:", error);
        isModelLoading = false;
        chatbotWidget.classList.remove('is-loading');
        
        // Hide progress bar
        chatbotProgress.style.display = 'none';
        
        addMessage("Oops, I couldn't load the AI brain. Please try again later or refresh the page. You can use the 'Send Message' button in the 'Get In Touch' section to contact me too.", false);
        
        // Fallback to simple responses
        useFallbackResponses();
    }
}

function addMessage(text, isUser = false, streaming = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    const p = document.createElement('p');
    messageDiv.appendChild(p);
    chatbotMessages.appendChild(messageDiv);
    if (!streaming && text) {
        p.textContent = text;
    }
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return p;
}

async function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message || isGenerating) return;
    
    // Add user message
    addMessage(message, true);
    chatbotInput.value = '';
    
    if (!isModelReady) {
        if (!isModelLoading) {
            initializeWebLLM();
        } else {
            addMessage("Please wait a moment for my AI brain to load... You can also send me a message using the 'Send Message' button in the \"Get In Touch\" section.", false);
        }
        return;
    }
    
    isGenerating = true;
    try {
        // Generate response using WebLLM
        const messages = [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message }
        ];
        
        const chunks = await engine.chat.completions.create({
            messages: messages,
            stream: true,
            stream_options: { include_usage: true },
        });
        
        const botP = addMessage('', false, true);
        let botResponse = '';
        for await (const chunk of chunks) {
            const delta = chunk.choices[0]?.delta?.content || '';
            if (delta) {
                botResponse += delta;
                botP.textContent = botResponse;
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }
        }
    } catch (error) {
        console.error("Error generating response:", error);
        addMessage("Sorry, I encountered an error generating a response. Please try again.", false);
    } finally {
        isGenerating = false;
    }
}

// Fallback responses if WebLLM fails
function useFallbackResponses() {
    const fallbackResponses = {
        'experience': 'Songlin has 5+ years of experience as a Dell A-Team member, leading complex projects in security automation, predictive analytics, AI-assisted troubleshooting, and anomaly detection.',
        'projects': 'Songlin has led several key projects including CAC/PIV Certificate Management, Bug-Stomp Initiative, Performance Forecast Integration, Analytics Engine Dockerization, and Anomaly Detection Platform.',
        'skills': 'Songlin specializes in Security & Authentication, AI & Machine Learning, LLM Systems, Platform Engineering, and Technical Leadership.',
        'contact': 'You can reach Songlin via email at songlinhou1993@gmail.com or LinkedIn at https://www.linkedin.com/in/songlin-hou',
        'default': 'I\'m here to help! You can ask about Songlin\'s experience, projects, skills, or how to contact him.'
    };
    
    window.getBotResponse = function(userMessage) {
        const message = userMessage.toLowerCase();
        for (const [keyword, response] of Object.entries(fallbackResponses)) {
            if (message.includes(keyword)) {
                return response;
            }
        }
        return fallbackResponses.default;
    };
    
    window.sendMessage = function() {
        const message = chatbotInput.value.trim();
        if (!message) return;
        addMessage(message, true);
        chatbotInput.value = '';
        const botResponse = window.getBotResponse(message);
        addMessage(botResponse, false);
    };
}

// Send message on button click
chatbotSend.addEventListener('click', sendMessage);

// Send message on Enter key
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Auto-load the model when page loads
window.addEventListener('load', () => {
    initializeWebLLM();
});

// Console welcome message
console.log('%c Welcome to Songlin Hou\'s Portfolio! ', 
    'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px;');
console.log('%c Feel free to explore the code! ', 
    'color: #2563eb; font-size: 14px; padding: 5px;');
