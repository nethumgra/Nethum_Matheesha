// Portfolio Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Portfolio Filter
    const filterButtons = document.querySelectorAll('#portfolio-filter .portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('#portfolio-grid .portfolio-item');
    const portfolioGrid = document.getElementById('portfolio-grid');
    
    if (!filterButtons.length || !portfolioItems.length) return;
    
    // Portfolio filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, 300);
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Add a small delay to allow for animations
            setTimeout(() => {
                portfolioGrid.style.opacity = 1;
            }, 350);
        });
    });
    
    // Portfolio Modal
    const modal = document.getElementById('portfolio-modal');
    const modalContent = document.getElementById('portfolio-modal-content');
    const closeModal = document.getElementById('close-modal');
    const viewButtons = document.querySelectorAll('.portfolio-view-btn');
    
    if (!modal || !modalContent || !closeModal) return;
    
    // Open modal when clicking on a portfolio item
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const portfolioId = this.getAttribute('data-portfolio-id');
            openPortfolioModal(portfolioId);
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.classList.remove('opacity-100', 'pointer-events-auto');
        modal.classList.add('opacity-0', 'pointer-events-none');
        
        // Clear modal content after fade out
        setTimeout(() => {
            modalContent.innerHTML = '';
        }, 300);
    });
    
    // Close modal if clicking outside content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal.click();
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('opacity-100')) {
            closeModal.click();
        }
    });
    
    // Function to open portfolio modal with specific content
    function openPortfolioModal(id) {
        // Get portfolio data based on id
        const portfolioData = getPortfolioData(id);
        
        // Create modal content HTML
        const contentHTML = `
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <div class="bg-gradient-to-br ${portfolioData.gradientClasses} aspect-square rounded-lg flex items-center justify-center text-6xl">
                        <i class="${portfolioData.icon} text-white/20"></i>
                    </div>
                    ${portfolioData.additionalImages ? `
                        <div class="grid grid-cols-3 gap-3 mt-3">
                            ${portfolioData.additionalImages.map(img => `
                                <div class="bg-gradient-to-br ${img.gradient} aspect-square rounded-lg"></div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                <div>
                    <h3 class="text-2xl font-semibold mb-4">${portfolioData.title}</h3>
                    <p class="text-gray-300 mb-6">${portfolioData.description}</p>
                    
                    <div class="mb-6">
                        <h4 class="text-lg font-medium mb-2">Project Details</h4>
                        <div class="grid grid-cols-2 gap-x-4 gap-y-2">
                            <div class="text-gray-400">Client:</div>
                            <div>${portfolioData.client}</div>
                            <div class="text-gray-400">Category:</div>
                            <div>${portfolioData.category}</div>
                            <div class="text-gray-400">Date:</div>
                            <div>${portfolioData.date}</div>
                            <div class="text-gray-400">Tools:</div>
                            <div>${portfolioData.tools}</div>
                        </div>
                    </div>
                    
                    ${portfolioData.technologies ? `
                        <div class="mb-6">
                            <h4 class="text-lg font-medium mb-2">Technologies & Skills</h4>
                            <div class="flex flex-wrap gap-2">
                                ${portfolioData.technologies.map(tech => `
                                    <span class="px-3 py-1 bg-white/10 rounded-full text-sm">${tech}</span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <a href="#contact" class="btn-primary" onclick="closeModal.click()">
                        Interested in a similar project? <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        `;
        
        // Set modal content
        modalContent.innerHTML = contentHTML;
        
        // Show modal
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100', 'pointer-events-auto');
    }
    
    // Function to get portfolio data by id
    function getPortfolioData(id) {
        // Portfolio items data
        const portfolioData = {
            '1': {
                title: 'Modern Brand Identity',
                description: 'A comprehensive brand identity design for a tech startup that includes logo design, color palette, typography selection, and brand guidelines. The design focuses on creating a modern, professional look that reflects the company\'s innovative spirit.',
                client: 'TechStart Inc.',
                category: 'Branding, Visual Identity',
                date: 'March 2023',
                tools: 'Adobe Illustrator, Photoshop',
                gradientClasses: 'from-primary/20 to-secondary/20',
                icon: 'fas fa-layer-group',
                technologies: ['Logo Design', 'Typography', 'Color Theory', 'Brand Guidelines', 'Print Design'],
                additionalImages: [
                    { gradient: 'from-primary/30 to-primary/10' },
                    { gradient: 'from-secondary/30 to-secondary/10' },
                    { gradient: 'from-primary/20 to-secondary/20' }
                ]
            },
            '2': {
                title: 'Minimalist Logo Design',
                description: 'A clean, minimalist logo design for a boutique fashion brand. The design emphasizes simplicity and elegance, with careful attention to typography and negative space to create a timeless brand mark that works across various applications.',
                client: 'Elegance Fashion',
                category: 'Logo, Brand Mark',
                date: 'January 2023',
                tools: 'Adobe Illustrator',
                gradientClasses: 'from-[#00BFA6]/20 to-[#6C63FF]/20',
                icon: 'fas fa-pen-nib',
                technologies: ['Logo Design', 'Typography', 'Minimalism', 'Vector Graphics'],
                additionalImages: [
                    { gradient: 'from-[#00BFA6]/30 to-[#00BFA6]/10' },
                    { gradient: 'from-[#6C63FF]/30 to-[#6C63FF]/10' },
                    { gradient: 'from-[#00BFA6]/20 to-[#6C63FF]/20' }
                ]
            },
            '3': {
                title: 'E-Commerce Website Design',
                description: 'A complete user interface design for an e-commerce platform selling handcrafted home goods. The design focuses on creating an intuitive user experience with clean navigation, visually appealing product displays, and a streamlined checkout process.',
                client: 'Artisan Home',
                category: 'UI/UX, Web Design',
                date: 'May 2023',
                tools: 'Figma, Adobe Photoshop',
                gradientClasses: 'from-[#FF6584]/20 to-[#FFC75F]/20',
                icon: 'fas fa-desktop',
                technologies: ['UI Design', 'UX Design', 'Wireframing', 'Prototyping', 'User Research'],
                additionalImages: [
                    { gradient: 'from-[#FF6584]/30 to-[#FF6584]/10' },
                    { gradient: 'from-[#FFC75F]/30 to-[#FFC75F]/10' },
                    { gradient: 'from-[#FF6584]/20 to-[#FFC75F]/20' }
                ]
            },
            '4': {
                title: 'Social Media Campaign',
                description: 'A comprehensive social media campaign for a cosmetic brand launch. The project includes template designs for Instagram posts, stories, and Facebook covers, along with a content calendar and strategy recommendations.',
                client: 'GlowUp Cosmetics',
                category: 'Social Media, Graphics',
                date: 'April 2023',
                tools: 'Adobe Photoshop, Illustrator',
                gradientClasses: 'from-[#6C63FF]/20 to-[#00BFA6]/20',
                icon: 'fas fa-mobile-alt',
                technologies: ['Social Media Design', 'Content Strategy', 'Digital Marketing', 'Graphic Design'],
                additionalImages: [
                    { gradient: 'from-[#6C63FF]/30 to-[#6C63FF]/10' },
                    { gradient: 'from-[#00BFA6]/30 to-[#00BFA6]/10' },
                    { gradient: 'from-[#6C63FF]/20 to-[#00BFA6]/20' }
                ]
            },
            '5': {
                title: 'Restaurant Branding',
                description: 'A full branding package for a modern fusion restaurant. The project includes logo design, menu layouts, signage, packaging, and interior design consultation to create a cohesive dining experience that reflects the restaurant\'s culinary vision.',
                client: 'Fusion Kitchen',
                category: 'Branding, Packaging',
                date: 'February 2023',
                tools: 'Adobe Illustrator, InDesign, Photoshop',
                gradientClasses: 'from-[#FFC75F]/20 to-[#FF6584]/20',
                icon: 'fas fa-utensils',
                technologies: ['Branding', 'Print Design', 'Packaging Design', 'Typography', 'Menu Design'],
                additionalImages: [
                    { gradient: 'from-[#FFC75F]/30 to-[#FFC75F]/10' },
                    { gradient: 'from-[#FF6584]/30 to-[#FF6584]/10' },
                    { gradient: 'from-[#FFC75F]/20 to-[#FF6584]/20' }
                ]
            },
            '6': {
                title: 'Technology Logo Suite',
                description: 'A collection of related logos for a technology company\'s suite of software products. The design creates a unified visual language while giving each product a distinct identity, ensuring brand recognition across the company\'s offerings.',
                client: 'Nexus Software',
                category: 'Logo Design, Branding',
                date: 'June 2023',
                tools: 'Adobe Illustrator',
                gradientClasses: 'from-[#00BFA6]/20 to-[#6C63FF]/20',
                icon: 'fas fa-code',
                technologies: ['Logo Design', 'Brand Architecture', 'Vector Graphics', 'Visual Identity'],
                additionalImages: [
                    { gradient: 'from-[#00BFA6]/30 to-[#00BFA6]/10' },
                    { gradient: 'from-[#6C63FF]/30 to-[#6C63FF]/10' },
                    { gradient: 'from-[#00BFA6]/20 to-[#6C63FF]/20' }
                ]
            },
            '7': {
                title: 'Fashion Lookbook Design',
                description: 'A stylish and contemporary lookbook design for a seasonal fashion collection. The design showcases the clothing line through elegant typography, creative layouts, and a cohesive visual narrative that highlights the unique aesthetic of the brand.',
                client: 'Urban Threads',
                category: 'Print Design, Fashion',
                date: 'July 2023',
                tools: 'Adobe InDesign, Photoshop',
                gradientClasses: 'from-primary/20 to-[#FF6584]/20',
                icon: 'fas fa-tshirt',
                technologies: ['Editorial Design', 'Typography', 'Print Layout', 'Fashion Photography'],
                additionalImages: [
                    { gradient: 'from-primary/30 to-primary/10' },
                    { gradient: 'from-[#FF6584]/30 to-[#FF6584]/10' },
                    { gradient: 'from-primary/20 to-[#FF6584]/20' }
                ]
            },
            '8': {
                title: 'Mobile App UI Design',
                description: 'A user interface design for a fitness tracking mobile application. The design features an intuitive navigation system, custom iconography, engaging data visualizations, and a vibrant color scheme that motivates users to achieve their fitness goals.',
                client: 'FitTrack',
                category: 'UI/UX, Mobile App',
                date: 'August 2023',
                tools: 'Figma, Adobe Illustrator',
                gradientClasses: 'from-[#00BFA6]/20 to-[#FFC75F]/20',
                icon: 'fas fa-mobile-alt',
                technologies: ['UI Design', 'Mobile UX', 'App Prototyping', 'Icon Design', 'Interaction Design'],
                additionalImages: [
                    { gradient: 'from-[#00BFA6]/30 to-[#00BFA6]/10' },
                    { gradient: 'from-[#FFC75F]/30 to-[#FFC75F]/10' },
                    { gradient: 'from-[#00BFA6]/20 to-[#FFC75F]/20' }
                ]
            },
            '9': {
                title: 'Annual Report Design',
                description: 'A visually compelling annual report design for a financial services company. The design transforms complex financial data into accessible infographics and charts, while maintaining a professional and trustworthy aesthetic throughout the document.',
                client: 'Global Finance Partners',
                category: 'Print Design, Corporate',
                date: 'September 2023',
                tools: 'Adobe InDesign, Illustrator',
                gradientClasses: 'from-[#6C63FF]/20 to-primary/20',
                icon: 'fas fa-chart-pie',
                technologies: ['Data Visualization', 'Editorial Design', 'Corporate Identity', 'Information Design'],
                additionalImages: [
                    { gradient: 'from-[#6C63FF]/30 to-[#6C63FF]/10' },
                    { gradient: 'from-primary/30 to-primary/10' },
                    { gradient: 'from-[#6C63FF]/20 to-primary/20' }
                ]
            },
            '10': {
                title: 'Product Packaging Design',
                description: 'A distinctive packaging design for a premium tea brand. The design incorporates elegant illustrations, thoughtful typography, and a tactile finish that reflects the high-quality nature of the product and stands out on retail shelves.',
                client: 'Ceylon Treasures',
                category: 'Packaging, Branding',
                date: 'October 2023',
                tools: 'Adobe Illustrator, Photoshop',
                gradientClasses: 'from-[#FFC75F]/20 to-[#00BFA6]/20',
                icon: 'fas fa-box-open',
                technologies: ['Packaging Design', 'Illustration', 'Print Production', 'Retail Design'],
                additionalImages: [
                    { gradient: 'from-[#FFC75F]/30 to-[#FFC75F]/10' },
                    { gradient: 'from-[#00BFA6]/30 to-[#00BFA6]/10' },
                    { gradient: 'from-[#FFC75F]/20 to-[#00BFA6]/20' }
                ]
            },
            '11': {
                title: 'Event Branding & Promotion',
                description: 'A comprehensive branding and promotional package for a music festival. The design includes logo, posters, social media assets, merchandise, and environmental graphics that create an immersive and cohesive experience for attendees.',
                client: 'Rhythm Fusion Festival',
                category: 'Branding, Event Design',
                date: 'November 2023',
                tools: 'Adobe Illustrator, Photoshop, InDesign',
                gradientClasses: 'from-primary/20 to-[#6C63FF]/20',
                icon: 'fas fa-music',
                technologies: ['Event Branding', 'Environmental Graphics', 'Promotional Design', 'Merchandise Design'],
                additionalImages: [
                    { gradient: 'from-primary/30 to-primary/10' },
                    { gradient: 'from-[#6C63FF]/30 to-[#6C63FF]/10' },
                    { gradient: 'from-primary/20 to-[#6C63FF]/20' }
                ]
            },
            '12': {
                title: 'Book Cover Design Series',
                description: 'A series of distinctive book cover designs for a science fiction trilogy. The designs use a combination of typography, illustration, and color to create a cohesive visual language across the series while making each book unique.',
                client: 'Quantum Press',
                category: 'Book Design, Illustration',
                date: 'December 2023',
                tools: 'Adobe Photoshop, Illustrator',
                gradientClasses: 'from-[#00BFA6]/20 to-secondary/20',
                icon: 'fas fa-book',
                technologies: ['Cover Design', 'Typography', 'Illustration', 'Series Design'],
                additionalImages: [
                    { gradient: 'from-[#00BFA6]/30 to-[#00BFA6]/10' },
                    { gradient: 'from-secondary/30 to-secondary/10' },
                    { gradient: 'from-[#00BFA6]/20 to-secondary/20' }
                ]
            },
            '13': {
                title: 'Corporate Identity System',
                description: 'A comprehensive corporate identity system for a consulting firm. The design includes logo, stationery, digital templates, and brand guidelines that establish a professional and consistent visual presence across all touchpoints.',
                client: 'Insight Consulting Group',
                category: 'Branding, Corporate Design',
                date: 'January 2024',
                tools: 'Adobe Illustrator, InDesign',
                gradientClasses: 'from-[#FFC75F]/20 to-[#6C63FF]/20',
                icon: 'fas fa-briefcase',
                technologies: ['Corporate Identity', 'Logo Design', 'Stationery Design', 'Brand Guidelines'],
                additionalImages: [
                    { gradient: 'from-[#FFC75F]/30 to-[#FFC75F]/10' },
                    { gradient: 'from-[#6C63FF]/30 to-[#6C63FF]/10' },
                    { gradient: 'from-[#FFC75F]/20 to-[#6C63FF]/20' }
                ]
            },
            '14': {
                title: 'Magazine Layout Design',
                description: 'A modern and engaging magazine layout design for a lifestyle publication. The design features dynamic grid systems, thoughtful typography hierarchy, and innovative use of white space to create a visually appealing reading experience.',
                client: 'Urban Living Magazine',
                category: 'Editorial Design, Print',
                date: 'February 2024',
                tools: 'Adobe InDesign, Photoshop',
                gradientClasses: 'from-primary/20 to-[#FFC75F]/20',
                icon: 'fas fa-newspaper',
                technologies: ['Editorial Design', 'Typography', 'Grid Systems', 'Print Production'],
                additionalImages: [
                    { gradient: 'from-primary/30 to-primary/10' },
                    { gradient: 'from-[#FFC75F]/30 to-[#FFC75F]/10' },
                    { gradient: 'from-primary/20 to-[#FFC75F]/20' }
                ]
            },
            '15': {
                title: 'Educational App Design',
                description: 'A user-friendly educational app design for language learning. The interface features engaging visuals, gamified elements, and clear navigation to create an effective and enjoyable learning experience for users of all ages.',
                client: 'LinguaLearn',
                category: 'UI/UX, Educational',
                date: 'March 2024',
                tools: 'Figma, Adobe Illustrator',
                gradientClasses: 'from-[#00BFA6]/20 to-primary/20',
                icon: 'fas fa-graduation-cap',
                technologies: ['Educational UX', 'App Design', 'UI Animation', 'Gamification', 'Instructional Design'],
                additionalImages: [
                    { gradient: 'from-[#00BFA6]/30 to-[#00BFA6]/10' },
                    { gradient: 'from-primary/30 to-primary/10' },
                    { gradient: 'from-[#00BFA6]/20 to-primary/20' }
                ]
            },
            '16': {
                title: 'Infographic Design Series',
                description: 'A series of visually compelling infographics that transform complex data into accessible and engaging visual stories. The designs use custom illustrations, thoughtful color coding, and clear hierarchy to communicate information effectively.',
                client: 'Data Insights Lab',
                category: 'Information Design, Data Visualization',
                date: 'April 2024',
                tools: 'Adobe Illustrator, Photoshop',
                gradientClasses: 'from-[#6C63FF]/20 to-[#FFC75F]/20',
                icon: 'fas fa-chart-bar',
                technologies: ['Information Design', 'Data Visualization', 'Visual Storytelling', 'Icon Design'],
                additionalImages: [
                    { gradient: 'from-[#6C63FF]/30 to-[#6C63FF]/10' },
                    { gradient: 'from-[#FFC75F]/30 to-[#FFC75F]/10' },
                    { gradient: 'from-[#6C63FF]/20 to-[#FFC75F]/20' }
                ]
            }
        };
        
        return portfolioData[id] || {
            title: 'Portfolio Item',
            description: 'Portfolio description not available.',
            client: 'Client Name',
            category: 'Category',
            date: 'Date',
            tools: 'Tools Used',
            gradientClasses: 'from-primary/20 to-secondary/20',
            icon: 'fas fa-image'
        };
    }
});
