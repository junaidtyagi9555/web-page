// Enhanced Terminal Animation
class TerminalAnimation {
    constructor(terminalId) {
        this.terminal = document.getElementById(terminalId);
        this.commands = [
            { cmd: "whoami", output: "junaid_tyagi | DevOps & Cloud Specialist" },
            { cmd: "pwd", output: "/home/junaid/devops-portfolio" },
            { cmd: "ls -la", output: "total 48\ndrwxr-xr-x  8 junaid staff   256B Jan 15 10:30 .\ndrwxr-xr-x  6 junaid staff   192B Jan 12 14:20 ..\n-rw-r--r--  1 junaid staff   2.1K Jan 15 10:30 terraform.tf\n-rw-r--r--  1 junaid staff   1.5K Jan 15 10:30 docker-compose.yml\n-rw-r--r--  1 junaid staff   876B Jan 15 10:30 deploy.sh\ndrwxr-xr-x  4 junaid staff   128B Jan 15 10:30 src" },
            { cmd: "cat experience.txt", output: "✓ 4+ years in IT infrastructure\n✓ AWS Cloud Solutions\n✓ DevOps Automation\n✓ System Administration" },
            { cmd: "terraform version", output: "Terraform v1.5.0\non linux_amd64" },
            { cmd: "docker --version", output: "Docker version 24.0.5, build ced0996" },
            { cmd: "aws --version", output: "aws-cli/2.13.0 Python/3.11.4 Linux/6.2.0-36-generic exe/x86_64.ubuntu.22" },
            { cmd: "echo 'DevOps Portfolio Ready!'", output: "DevOps Portfolio Ready!" }
        ];
        this.currentCommand = 0;
        this.speed = 80;
        this.lineDelay = 1500;
    }

    init() {
        if (!this.terminal) return;
        this.terminal.innerHTML = '';
        this.typeNextCommand();
    }

    createLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `command-line ${className}`;
        line.innerHTML = text;
        return line;
    }

    typeText(element, text, speed) {
        return new Promise(resolve => {
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                    resolve();
                }
            }, speed);
        });
    }

    async typeNextCommand() {
        if (this.currentCommand >= this.commands.length) {
            this.currentCommand = 0;
            // Add blinking cursor at the end
            const cursorLine = this.createLine('<span class="prompt">$</span> <span class="blinking-cursor">█</span>');
            this.terminal.appendChild(cursorLine);
            return;
        }

        const command = this.commands[this.currentCommand];
        
        // Create command line
        const commandLine = this.createLine(`<span class="prompt">$</span> ${command.cmd}`);
        this.terminal.appendChild(commandLine);
        
        // Type command
        await this.typeText(commandLine.querySelector('.command'), command.cmd, this.speed);
        
        // Create output line
        const outputLine = this.createLine(command.output, 'output');
        this.terminal.appendChild(outputLine);
        
        // Type output
        await this.typeText(outputLine, command.output, this.speed / 2);
        
        // Wait before next command
        await new Promise(resolve => setTimeout(resolve, this.lineDelay));
        
        this.currentCommand++;
        this.typeNextCommand();
    }
}

// Email form handling using EmailJS
class EmailHandler {
    constructor() {
        this.form = document.getElementById('emailForm');
        this.messageDiv = document.getElementById('formMessage');
        this.serviceID = 'service_a7zqpft';
        this.templateID = 'template_oltq72j';  // Using your actual template ID
        this.initEmailJS();
    }

    initEmailJS() {
        // Initialize EmailJS with your public key
        emailjs.init('P4eHnSbBdVEX-hs5A');
        
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const data = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            reply_to: formData.get('email'),
            to_email: 'junaidtyagi9555@gmail.com'
        };

        // Validation
        if (!data.from_name || !data.from_email || !data.message || !data.subject) {
            this.showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.from_email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Send email using EmailJS
            await emailjs.send(this.serviceID, this.templateID, data);
            this.showMessage('✓ Message sent successfully! I\'ll respond within 24 hours.', 'success');
            this.form.reset();
            
            // Add terminal-style success message
            this.addTerminalMessage('success', data);
            
        } catch (error) {
            console.error('Email sending error:', error);
            
            let errorMsg = 'Failed to send message. ';
            if (error.text) {
                if (error.text.includes('Invalid template ID')) {
                    errorMsg += 'Template configuration error. ';
                } else if (error.text.includes('Invalid user ID')) {
                    errorMsg += 'Public key error. ';
                }
                errorMsg += error.text;
            } else {
                errorMsg += 'Please try again or email me directly.';
            }
            
            this.showMessage(errorMsg, 'error');
            
            // Add fallback email link
            const mailtoLink = `mailto:junaidtyagi9555@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`From: ${data.from_name} (${data.from_email})\n\nMessage: ${data.message}`)}`;
            
            setTimeout(() => {
                if (this.messageDiv) {
                    this.messageDiv.innerHTML += `<br><br>Alternatively, <a href="${mailtoLink}" style="color: #00ffff;">click here to email me directly</a>.`;
                }
            }, 500);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    showMessage(text, type) {
        if (!this.messageDiv) return;
        
        this.messageDiv.textContent = text;
        this.messageDiv.className = `form-message ${type}`;
        this.messageDiv.style.display = 'block';
        
        setTimeout(() => {
            if (this.messageDiv) {
                this.messageDiv.style.display = 'none';
            }
        }, 5000);
    }

    addTerminalMessage(type, data) {
        const terminalBody = document.querySelector('#contact .terminal-body');
        if (!terminalBody) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'command-line';
        
        if (type === 'success') {
            messageDiv.innerHTML = `
                <span class="prompt">$</span> <span class="command">echo "Message Status"</span>
                <div class="output status-running">
                    ✓ Email queued for delivery<br>
                    ✓ From: ${data.from_name} <${data.from_email}><br>
                    ✓ Subject: ${data.subject}<br>
                    ✓ Timestamp: ${new Date().toLocaleTimeString()}
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <span class="prompt">$</span> <span class="command">echo "Message Status"</span>
                <div class="output status-error">
                    ✗ Email delivery failed<br>
                    ✗ Fallback: Send email to junaidtyagi9555@gmail.com<br>
                    ✗ Subject: ${data.subject}
                </div>
            `;
        }
        
        terminalBody.appendChild(messageDiv);
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Resume Download Handler
class ResumeDownloadHandler {
    constructor() {
        // Use Google Drive direct download link
        this.resumeUrl = 'https://drive.google.com/uc?export=download&id=1-XHP5X9vv3-sevIUmQKbl3J0Oxmq_w_j';
        this.init();
    }

    init() {
        // Add event listeners to all download buttons
        const buttons = [
            document.getElementById('downloadResumeBtn'),
            document.getElementById('downloadResumeBtnHero'),
            document.getElementById('downloadResumeBtnNav')
        ];
        
        buttons.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', (e) => this.handleDownload(e));
            }
        });
    }

    handleDownload(e) {
        e.preventDefault();
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = this.resumeUrl;
        link.target = '_blank';
        link.download = 'Junaid_Alam_Tyagi_DevOps_Resume.pdf';
        
        // Add terminal-style message
        this.showTerminalMessage();
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Update button text temporarily
        const originalText = e.target.innerHTML;
        e.target.innerHTML = '<i class="fas fa-check"></i> Downloading...';
        e.target.classList.add('downloaded');
        
        setTimeout(() => {
            e.target.innerHTML = originalText;
            e.target.classList.remove('downloaded');
        }, 2000);
    }

    showTerminalMessage() {
        const terminalBody = document.querySelector('#contact .terminal-body');
        if (!terminalBody) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'command-line';
        messageDiv.innerHTML = `
            <span class="prompt">$</span> <span class="command">wget resume.pdf</span>
            <div class="output status-running">
                ✓ Downloading resume...<br>
                ✓ File: Junaid_Tyagi_DevOps_Resume.pdf<br>
                ✓ Status: Download in progress
            </div>
        `;
        
        terminalBody.appendChild(messageDiv);
        messageDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

// Main application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio loaded successfully!');
    
    // Initialize terminal animation
    const terminal = new TerminalAnimation('terminalOutput');
    setTimeout(() => terminal.init(), 1500);

    // Initialize EmailJS handler
    const emailHandler = new EmailHandler();
    
    // Initialize Resume Download handler
    const resumeHandler = new ResumeDownloadHandler();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Blinking cursor animation
    setInterval(() => {
        const cursors = document.querySelectorAll('.blinking-cursor');
        cursors.forEach(cursor => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        });
    }, 500);

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + D to download resume
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            const resumeBtn = document.getElementById('downloadResumeBtn');
            if (resumeBtn) {
                resumeBtn.click();
            }
        }
        
        // Esc to close mobile menu
        if (e.key === 'Escape') {
            const navLinks = document.getElementById('navLinks');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        }
    });

    // Viewport height fix for mobile browsers
    function setViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);

    // Intersection Observer for animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1
        });
        
        document.querySelectorAll('.skill-category, .terminal-window').forEach(el => {
            observer.observe(el);
        });
    }
});