// Terminal Animation
class TerminalAnimation {
    constructor(terminalId) {
        this.terminal = document.getElementById(terminalId);
        this.commands = [
            { cmd: "whoami", output: "junaid_tyagi" },
            { cmd: "pwd", output: "/home/junaid/devops-portfolio" },
            { cmd: "ls -la", output: "total 48\ndrwxr-xr-x  8 junaid staff   256B Jan 15 10:30 .\ndrwxr-xr-x  6 junaid staff   192B Jan 12 14:20 ..\n-rw-r--r--  1 junaid staff   2.1K Jan 15 10:30 terraform.tf\n-rw-r--r--  1 junaid staff   1.5K Jan 15 10:30 docker-compose.yml\n-rw-r--r--  1 junaid staff   876B Jan 15 10:30 deploy.sh\ndrwxr-xr-x  4 junaid staff   128B Jan 15 10:30 src" },
            { cmd: "cat skills.txt", output: "AWS | Docker | Kubernetes | Terraform | CI/CD\nPython | Bash | YAML | Git | Linux\nCloudFormation | Nginx | GitHub Actions" },
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
        this.terminal.innerHTML = '';
        this.typeNextCommand();
    }

    createLine(text, className = '') {
        const line = document.createElement('p');
        line.className = `terminal-output ${className}`;
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
            const cursorLine = this.createLine('<span class="prompt">$</span> <span class="cursor">█</span>');
            this.terminal.appendChild(cursorLine);
            return;
        }

        const command = this.commands[this.currentCommand];
        
        // Create command line
        const commandLine = this.createLine(`<span class="prompt">$</span> ${command.cmd}`);
        this.terminal.appendChild(commandLine);
        
        // Type command
        await this.typeText(commandLine, command.cmd, this.speed);
        
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
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toLocaleString()
        };

        // Validation
        if (!data.name || !data.email || !data.message) {
            this.showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Send email using EmailJS
            await this.sendEmail(data);
            this.showMessage('✓ Message sent successfully! I\'ll respond soon.', 'success');
            this.form.reset();
        } catch (error) {
            console.error('Email sending error:', error);
            this.showMessage('✗ Failed to send. Please email me directly at junaidtyagi9555@gmail.com', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async sendEmail(data) {
        // Your EmailJS configuration
        const serviceID = 'service_a7zqpft';
        const templateID = 'template_noyrtgh';
        
        return emailjs.send(serviceID, templateID, {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject || 'Portfolio Contact Form',
            message: data.message,
            timestamp: data.timestamp,
            to_email: 'junaidtyagi9555@gmail.com'
        });
    }

    showMessage(text, type) {
        this.messageDiv.textContent = text;
        this.messageDiv.className = `form-message ${type}`;
        this.messageDiv.style.display = 'block';
        
        setTimeout(() => {
            this.messageDiv.style.display = 'none';
        }, 5000);
    }
}

// Main application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize terminal animation
    const terminal = new TerminalAnimation('terminalOutput');
    terminal.init();

    // Load EmailJS and initialize handler
    const emailjsScript = document.createElement('script');
    emailjsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    emailjsScript.onload = () => {
        new EmailHandler();
    };
    document.head.appendChild(emailjsScript);

    // Smooth scrolling
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

    // Project card animations
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // Typewriter effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        setTimeout(typeWriter, 1000);
    }

    // Update footer year
    const footerYear = document.querySelector('footer p');
    if (footerYear && footerYear.textContent.includes('2024')) {
        footerYear.textContent = footerYear.textContent.replace('2024', new Date().getFullYear());
    }

    // Terminal cursor animation
    setInterval(() => {
        const cursors = document.querySelectorAll('.cursor');
        cursors.forEach(cursor => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        });
    }, 500);

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + L to clear terminal
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            const terminalEl = document.getElementById('terminalOutput');
            if (terminalEl) {
                terminalEl.innerHTML = '';
                const termAnim = new TerminalAnimation('terminalOutput');
                termAnim.init();
            }
        }
    });
});