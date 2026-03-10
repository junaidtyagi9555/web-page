// script.js - Enhanced Terminal Theme Portfolio
// Combined with existing functionality from original portfolio

(function() {
    "use strict";
    
    // ============================================
    // ENHANCED TERMINAL ANIMATION CLASS
    // ============================================
    class TerminalAnimation {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            this.commands = [
                { cmd: "whoami", output: "junaid_tyagi | DevOps & Cloud Specialist with 4+ years experience" },
                { cmd: "pwd", output: "/home/junaid/devops-portfolio" },
                { cmd: "ls -la", output: "total 48\ndrwxr-xr-x  8 junaid staff   256B Mar 09 10:30 .\ndrwxr-xr-x  6 junaid staff   192B Mar 09 14:20 ..\n-rw-r--r--  1 junaid staff   2.1K Mar 09 10:30 terraform.tf\n-rw-r--r--  1 junaid staff   1.5K Mar 09 10:30 docker-compose.yml\n-rw-r--r--  1 junaid staff   876B Mar 09 10:30 deploy.sh\ndrwxr-xr-x  4 junaid staff   128B Mar 09 10:30 src" },
                { cmd: "cat experience.txt", output: "✓ Executive Engineer @ Lava International (Jun 2024 - Present)\n✓ System Engineer @ Jaypee Brothers (Feb 2022 - Jun 2024)\n✓ Desktop Support Engineer @ Max Smart Hospital (May 2021 - Feb 2022)\n✓ 4+ years in IT infrastructure & cloud solutions" },
                { cmd: "terraform version", output: "Terraform v1.5.0\non linux_amd64\n+ AWS Provider v5.0" },
                { cmd: "docker --version", output: "Docker version 24.0.5, build ced0996\n+ Docker Compose v2.20" },
                { cmd: "kubectl version", output: "Client Version: v1.28.2\nServer Version: v1.27.4" },
                { cmd: "aws --version", output: "aws-cli/2.13.0 Python/3.11.4 Linux/6.2.0-36-generic exe/x86_64.ubuntu.22" },
                { cmd: "echo $CERTIFICATIONS", output: "5x AWS Certifications | Cisco Python Essentials | AWS Well-Architected" },
                { cmd: "echo 'DevOps Portfolio Ready!'", output: "✓ System Status: Online\n✓ Infrastructure: Automated\n✓ Monitoring: Enabled\n✓ Last Deploy: " + new Date().toLocaleDateString() }
            ];
            this.currentCommand = 0;
            this.speed = 80;
            this.lineDelay = 1200;
        }

        init() {
            if (!this.container) return;
            this.container.innerHTML = '';
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
                if (!element) {
                    resolve();
                    return;
                }
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
                const cursorLine = this.createLine('<span class="prompt">$</span> <span class="command">echo "System ready"</span> <span class="blinking-cursor">█</span>');
                this.container.appendChild(cursorLine);
                
                // Restart animation after a pause
                setTimeout(() => {
                    this.init();
                }, 15000);
                return;
            }

            const command = this.commands[this.currentCommand];
            
            // Create command line
            const commandLine = this.createLine(`<span class="prompt">$</span> <span class="command">${command.cmd}</span>`);
            this.container.appendChild(commandLine);
            
            // Type command
            const commandSpan = commandLine.querySelector('.command');
            if (commandSpan) {
                await this.typeText(commandSpan, command.cmd, this.speed);
            }
            
            // Small pause before output
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Create output line
            const outputLine = this.createLine('', 'output');
            this.container.appendChild(outputLine);
            
            // Type output with line breaks
            const outputLines = command.output.split('\n');
            for (let i = 0; i < outputLines.length; i++) {
                const lineSpan = document.createElement('div');
                lineSpan.textContent = '';
                outputLine.appendChild(lineSpan);
                
                // Type each character of the line
                await this.typeText(lineSpan, outputLines[i], this.speed / 2);
                
                if (i < outputLines.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
            
            // Wait before next command
            await new Promise(resolve => setTimeout(resolve, this.lineDelay));
            
            this.currentCommand++;
            this.typeNextCommand();
        }
    }

    // ============================================
    // EMAIL HANDLER CLASS (Using EmailJS)
    // ============================================
    class EmailHandler {
        constructor() {
            this.form = document.getElementById('emailForm');
            this.messageDiv = document.getElementById('formMessage');
            this.serviceID = 'service_a7zqpft';
            this.templateID = 'template_oltq72j';
            this.initEmailJS();
        }

        initEmailJS() {
            // Check if EmailJS is loaded
            if (typeof emailjs !== 'undefined') {
                emailjs.init('P4eHnSbBdVEX-hs5A');
            } else {
                console.warn('EmailJS not loaded, loading dynamically...');
                this.loadEmailJS();
            }
            
            if (this.form) {
                this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            }
        }

        loadEmailJS() {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = () => {
                if (typeof emailjs !== 'undefined') {
                    emailjs.init('P4eHnSbBdVEX-hs5A');
                    console.log('EmailJS loaded successfully');
                }
            };
            document.head.appendChild(script);
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
            const originalText = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
            }

            try {
                // Check if EmailJS is available
                if (typeof emailjs === 'undefined') {
                    throw new Error('EmailJS not loaded');
                }

                // Send email using EmailJS
                await emailjs.send(this.serviceID, this.templateID, data);
                this.showMessage('✓ Message sent successfully! I\'ll respond within 24 hours.', 'success');
                this.form.reset();
                
                // Add terminal-style success message
                this.addTerminalMessage('success', data);
                
            } catch (error) {
                console.error('Email sending error:', error);
                
                // Fallback to mailto
                const mailtoLink = `mailto:junaidtyagi9555@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`From: ${data.from_name} (${data.from_email})\n\nMessage: ${data.message}`)}`;
                
                this.showMessage('Using fallback email client. Please click the link that will open.', 'info');
                
                // Open mailto as fallback
                setTimeout(() => {
                    window.location.href = mailtoLink;
                }, 1000);
                
                this.addTerminalMessage('fallback', data);
                
            } finally {
                if (submitBtn) {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }
        }

        showMessage(text, type) {
            if (!this.messageDiv) return;
            
            this.messageDiv.innerHTML = text;
            this.messageDiv.className = `mt-3 text-center form-message ${type}`;
            
            if (type === 'success') {
                this.messageDiv.style.color = '#2dde98';
            } else if (type === 'error') {
                this.messageDiv.style.color = '#ff5f56';
            } else {
                this.messageDiv.style.color = '#00b8ff';
            }
            
            setTimeout(() => { 
                if (this.messageDiv) {
                    this.messageDiv.innerHTML = ''; 
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
                    <span class="prompt">$</span> <span class="command">./send_message.sh --status</span>
                    <div class="output" style="color: #2dde98;">
                        ✓ Email queued for delivery<br>
                        ✓ From: ${data.from_name} &lt;${data.from_email}&gt;<br>
                        ✓ Subject: ${data.subject}<br>
                        ✓ Timestamp: ${new Date().toLocaleTimeString()}<br>
                        ✓ Response time: &lt; 24 hours
                    </div>
                `;
            } else {
                messageDiv.innerHTML = `
                    <span class="prompt">$</span> <span class="command">./send_message.sh --status</span>
                    <div class="output" style="color: #ffbd2e;">
                        ⚠ Using fallback email client<br>
                        ⚠ From: ${data.from_name} &lt;${data.from_email}&gt;<br>
                        ⚠ Subject: ${data.subject}<br>
                        ⚠ Click the link to send via your email client
                    </div>
                `;
            }
            
            terminalBody.appendChild(messageDiv);
            messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Remove after 10 seconds
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 10000);
        }
    }

    // ============================================
    // RESUME DOWNLOAD HANDLER
    // ============================================
    class ResumeDownloadHandler {
        constructor() {
            // Use GitHub raw link for direct download
            this.resumeUrl = 'https://github.com/junaidtyagi9555/web-page/raw/main/junaid-resume.pdf';
            this.init();
        }

        init() {
            // Add event listeners to download buttons
            const buttons = [
                document.getElementById('downloadResumeNav'),
                document.getElementById('downloadResumeHero')
            ];
            
            buttons.forEach(btn => {
                if (btn) {
                    btn.addEventListener('click', (e) => this.handleDownload(e));
                }
            });
        }

        handleDownload(e) {
            e.preventDefault();
            
            const btn = e.currentTarget;
            
            // Show terminal message
            this.showTerminalMessage();
            
            // Update button text temporarily
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            btn.classList.add('downloaded');
            
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = this.resumeUrl;
            link.target = '_blank';
            link.download = 'Junaid_Tyagi_Resume.pdf';
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show success message
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            }, 1000);
            
            // Reset button after 3 seconds
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('downloaded');
            }, 3000);
        }

        showTerminalMessage() {
            const terminalBody = document.querySelector('#contact .terminal-body');
            if (!terminalBody) return;
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'command-line';
            messageDiv.innerHTML = `
                <span class="prompt">$</span> <span class="command">curl -O Junaid_Alam_Tyagi_Resume.pdf</span>
                <div class="output status-running" style="color: #2dde98;">
                    ✓ Connecting to GitHub...<br>
                    ✓ Download started: Junaid_Tyagi_Resume.pdf<br>
                    ✓ File size: ~2.4 MB<br>
                    ✓ Status: Transferring...
                </div>
            `;
            
            terminalBody.appendChild(messageDiv);
            messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Remove after 5 seconds
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }

    // ============================================
    // PIPELINE MONITOR CLASS
    // ============================================
    class PipelineMonitor {
        constructor() {
            this.buildNumber = 42;
            this.init();
        }

        init() {
            // Update build number every 30 seconds
            setInterval(() => {
                this.updateBuildInfo();
            }, 30000);

            // Simulate pipeline activity
            setInterval(() => {
                this.simulateActivity();
            }, 15000);

            // Add click handlers to pipeline steps
            this.addStepInteractivity();
        }

        updateBuildInfo() {
            const buildElement = document.querySelector('.last-build');
            const durationElement = document.querySelector('.build-duration');
            
            if (buildElement && durationElement) {
                this.buildNumber++;
                buildElement.textContent = `#${this.buildNumber}`;
                
                // Random build duration between 1-5 minutes
                const minutes = Math.floor(Math.random() * 4) + 1;
                const seconds = Math.floor(Math.random() * 60);
                durationElement.textContent = `${minutes}m ${seconds}s`;
            }
        }

        simulateActivity() {
            const steps = document.querySelectorAll('.pipeline-step');
            if (steps.length === 0) return;
            
            const randomStep = Math.floor(Math.random() * steps.length);
            
            // Highlight random step
            steps.forEach(step => {
                step.style.borderColor = 'var(--border-color)';
                const statusEl = step.querySelector('.step-status');
                if (statusEl) {
                    statusEl.style.color = 'var(--terminal-green)';
                }
            });
            
            steps[randomStep].style.borderColor = 'var(--terminal-blue)';
            steps[randomStep].style.boxShadow = '0 0 15px rgba(0, 184, 255, 0.3)';
            
            // Update status indicator
            const statusIndicator = document.querySelector('.status-indicator');
            const statusText = document.querySelector('.status-text');
            
            if (statusIndicator && statusText) {
                statusIndicator.className = 'status-indicator running';
                statusText.textContent = 'running';
                
                // Randomly show building state
                if (Math.random() > 0.7) {
                    statusIndicator.className = 'status-indicator pending';
                    statusText.textContent = 'building';
                    
                    setTimeout(() => {
                        statusIndicator.className = 'status-indicator running';
                        statusText.textContent = 'running';
                    }, 2000);
                }
            }
        }

        addStepInteractivity() {
            const steps = document.querySelectorAll('.pipeline-step');
            
            steps.forEach(step => {
                step.addEventListener('click', function() {
                    const label = this.querySelector('.step-label')?.textContent || 'Unknown step';
                    const terminalOutput = document.querySelector('#pipeline .terminal-body');
                    
                    if (!terminalOutput) return;
                    
                    // Add command execution to terminal
                    const commandLine = document.createElement('div');
                    commandLine.className = 'command-line';
                    commandLine.innerHTML = `
                        <span class="prompt">$</span>
                        <span class="command">./inspect-step.sh "${label}"</span>
                        <div class="output" style="color: var(--terminal-green);">
                            ✓ Step configuration loaded<br>
                            ✓ Status: operational<br>
                            ✓ Last execution: ${new Date().toLocaleTimeString()}
                        </div>
                    `;
                    
                    terminalOutput.appendChild(commandLine);
                    
                    // Scroll to show new command
                    commandLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Remove after 5 seconds
                    setTimeout(() => {
                        if (commandLine.parentNode) {
                            commandLine.remove();
                        }
                    }, 5000);
                });
            });
        }
    }

    // ============================================
    // MAIN APPLICATION
    // ============================================
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 DevOps Portfolio Terminal v2.0 loaded');
        
        // ============================================
        // Initialize AOS
        // ============================================
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: false,
                mirror: true,
                offset: 50,
                easing: 'ease-in-out'
            });

            window.addEventListener('resize', () => {
                AOS.refresh();
            });
        }

        // ============================================
        // Initialize Pipeline Monitor
        // ============================================
        if (document.getElementById('pipeline')) {
            const pipelineMonitor = new PipelineMonitor();
        }

        // ============================================
        // Loading Screen
        // ============================================
        const loadingEl = document.getElementById('loading');
        if (loadingEl) {
            setTimeout(() => {
                loadingEl.classList.add('hidden');
                setTimeout(() => {
                    if (typeof AOS !== 'undefined') {
                        AOS.refresh();
                    }
                }, 100);
            }, 800);
        }

        // ============================================
        // Terminal Animation
        // ============================================
        // Check if terminal container exists
        const terminalContainer = document.getElementById('terminalOutput');
        if (terminalContainer) {
            const terminal = new TerminalAnimation('terminalOutput');
            setTimeout(() => terminal.init(), 1500);
        }

        // ============================================
        // Email Handler
        // ============================================
        const emailHandler = new EmailHandler();

        // ============================================
        // Resume Download Handler
        // ============================================
        const resumeHandler = new ResumeDownloadHandler();

        // ============================================
        // Mobile Menu
        // ============================================
        const mobileBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        if (mobileBtn && navLinks) {
            mobileBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileBtn.innerHTML = navLinks.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });

            // Close menu when clicking outside
            document.addEventListener('click', (event) => {
                if (!navLinks.contains(event.target) && !mobileBtn.contains(event.target)) {
                    navLinks.classList.remove('active');
                    if (mobileBtn) {
                        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });

            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    if (mobileBtn) {
                        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
            });
        }

        // ============================================
        // Scroll to Top Button
        // ============================================
        const scrollBtn = document.getElementById('scrollTop');
        if (scrollBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    scrollBtn.classList.add('visible');
                } else {
                    scrollBtn.classList.remove('visible');
                }
            });
            
            scrollBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // ============================================
        // Typewriter Effects (Original)
        // ============================================
        
        // Hero section typewriter
        const typedElement = document.querySelector('.typed');
        if (typedElement) {
            const titles = [
                'DevOps Engineer',
                'Cloud Engineer', 
                'Infrastructure Automation Specialist',
                'CI/CD Architect'
            ];
            
            let currentIndex = 0;
            let currentText = '';
            let isDeleting = false;
            let charIndex = 0;
            
            function typeEffect() {
                const fullText = titles[currentIndex];
                
                if (isDeleting) {
                    currentText = fullText.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    currentText = fullText.substring(0, charIndex + 1);
                    charIndex++;
                }
                
                typedElement.textContent = currentText;
                
                let typeSpeed = isDeleting ? 50 : 100;
                
                if (!isDeleting && currentText === fullText) {
                    typeSpeed = 2000;
                    isDeleting = true;
                    charIndex = fullText.length;
                } else if (isDeleting && currentText === '') {
                    isDeleting = false;
                    currentIndex = (currentIndex + 1) % titles.length;
                    charIndex = 0;
                    typeSpeed = 500;
                }
                
                setTimeout(typeEffect, typeSpeed);
            }
            
            setTimeout(typeEffect, 1000);
        }

        // About section typewriter
        const typedAboutElement = document.querySelector('.typed-about');
        if (typedAboutElement) {
            const aboutTexts = [
                'Junaid Alam Tyagi · DevOps & Cloud Specialist with hands‑on experience in AWS, Docker, Kubernetes, Terraform, and CI/CD.',
                '4+ years of experience in cloud native technologies and infrastructure automation.',
                'Passionate about building scalable, resilient infrastructure with a code-first approach.'
            ];
            
            let currentIndex = 0;
            let currentText = '';
            let isDeleting = false;
            let charIndex = 0;
            
            function typeAboutEffect() {
                const fullText = aboutTexts[currentIndex];
                
                if (isDeleting) {
                    currentText = fullText.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    currentText = fullText.substring(0, charIndex + 1);
                    charIndex++;
                }
                
                typedAboutElement.textContent = currentText;
                
                let typeSpeed = isDeleting ? 30 : 60;
                
                if (!isDeleting && currentText === fullText) {
                    typeSpeed = 3000;
                    isDeleting = true;
                    charIndex = fullText.length;
                } else if (isDeleting && currentText === '') {
                    isDeleting = false;
                    currentIndex = (currentIndex + 1) % aboutTexts.length;
                    charIndex = 0;
                    typeSpeed = 500;
                }
                
                setTimeout(typeAboutEffect, typeSpeed);
            }
            
            setTimeout(typeAboutEffect, 2000);
        }

        // ============================================
        // Dynamic Dates
        // ============================================
        const now = new Date();
        const year = now.getFullYear();
        const dateStr = now.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        document.querySelectorAll('#currentYear').forEach(el => {
            if (el) el.textContent = year;
        });
        
        document.querySelectorAll('#currentDate').forEach(el => {
            if (el) el.textContent = dateStr;
        });

        // ============================================
        // Smooth Scrolling
        // ============================================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // ============================================
        // Blinking cursor animation
        // ============================================
        setInterval(() => {
            const cursors = document.querySelectorAll('.blinking-cursor');
            cursors.forEach(cursor => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            });
        }, 500);

        // ============================================
        // Keyboard shortcuts
        // ============================================
        document.addEventListener('keydown', function(e) {
            // Ctrl + D to download resume
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                const resumeBtn = document.getElementById('downloadResumeHero');
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
            
            // Ctrl + K to focus contact form
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                const nameInput = document.querySelector('#emailForm input[name="name"]');
                if (nameInput) {
                    nameInput.focus();
                }
            }
        });

        // ============================================
        // Viewport height fix for mobile
        // ============================================
        function setViewportHeight() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);

        // ============================================
        // Intersection Observer for animations
        // ============================================
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
            
            document.querySelectorAll('.skill-card, .project-card, .credly-badge-card').forEach(el => {
                observer.observe(el);
            });
        }

        // ============================================
        // Terminal Status Update
        // ============================================
        const statusElement = document.querySelector('#status .output');
        if (statusElement) {
            setInterval(() => {
                const statuses = [
                    '● Active: running | Uptime: ' + Math.floor(Math.random() * 30) + ' days',
                    '● Infrastructure: automated | Last sync: ' + new Date().toLocaleTimeString(),
                    '● Monitoring: enabled | All systems operational',
                    '● Deployments: ready | Git hash: ' + Math.random().toString(36).substring(2, 10)
                ];
                const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
                statusElement.innerHTML = '<pre>' + randomStatus + '</pre>';
            }, 10000);
        }

        console.log('✅ All systems initialized and ready');
    });

    // ============================================
    // Error Handling
    // ============================================
    window.addEventListener('error', function(e) {
        console.error('Portfolio error:', e.error);
    });

})();
