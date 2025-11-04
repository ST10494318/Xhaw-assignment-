// Course data with prices
const courses = [
    { id: 'first-aid', name: 'First Aid (6-Month)', price: 1500 , duration: '6 Months' },
    { id: 'sewing', name: 'Sewing (6-Month)', price: 1500, duration: '6 Months' },
    { id: 'landscaping', name: 'Landscaping (6-Month)', price: 1500, duration: '6 Months' },
    { id: 'life-skills', name: 'Life Skills (6-Month)', price: 1500, duration: '6 Months' },
    { id: 'child-minding', name: 'Child Minding (6-Week)', price: 750, duration: '6 Weeks' },
    { id: 'cooking', name: 'Cooking (6-Week)', price: 750, duration: '6 Weeks' },
    { id: 'garden-maintenance', name: 'Garden Maintenance (6-Week)', price: 750, duration: '6 Weeks' }
];

// Discount structure
const discountRates = {
    1: 0.00,   // 0% for 1 course
    2: 0.05,   // 5% for 2 courses
    3: 0.10,   // 10% for 3 courses
    4: 0.15    // 15% for 4+ courses
};

// VAT rate
const vatRate = 0.15;

// Testimonials data
const testimonials = [
    {
        text: "The First Aid course changed my career completely. I now earn 30% more and feel confident in emergency situations!",
        author: "Sarah M., Domestic Worker",
        course: "First Aid"
    },
    {
        text: "After completing the Sewing course, I started my own small business doing alterations. Empowering the Nation gave me the skills and confidence I needed.",
        author: "John D., Entrepreneur",
        course: "Sewing"
    },
    {
        text: "As an employer, sending my staff for Life Skills training was the best investment. Their professionalism and communication have improved dramatically.",
        author: "Mrs. van der Merwe, Employer",
        course: "Life Skills"
    }
];

// Blog posts data
const blogPosts = [
    {
        title: "5 Ways Upskilling Benefits Domestic Workers",
        excerpt: "Discover how additional training can transform careers and increase earning potential for domestic workers across South Africa.",
        date: "2024-01-15",
        category: "Career Growth"
    },
    {
        title: "The Importance of First Aid Training in Households",
        excerpt: "Learn why first aid certification is becoming essential for domestic workers and how it enhances household safety.",
        date: "2024-01-08",
        category: "Safety"
    },
    {
        title: "From Employee to Entrepreneur: Success Stories",
        excerpt: "Inspiring stories of individuals who used their training to start successful small businesses in their communities.",
        date: "2024-01-02",
        category: "Entrepreneurship"
    }
];

// Course calendar data
const courseCalendar = {
    '2024-02': [
        { date: '2024-02-05', course: 'First Aid', type: '6-Month', location: 'Johannesburg CBD' },
        { date: '2024-02-12', course: 'Sewing', type: '6-Month', location: 'Sandton' },
        { date: '2024-02-19', course: 'Child Minding', type: '6-Week', location: 'Soweto' },
        { date: '2024-02-26', course: 'Landscaping', type: '6-Month', location: 'Johannesburg CBD' }
    ],
    '2024-03': [
        { date: '2024-03-04', course: 'Cooking', type: '6-Week', location: 'Sandton' },
        { date: '2024-03-11', course: 'Life Skills', type: '6-Month', location: 'Soweto' },
        { date: '2024-03-18', course: 'Garden Maintenance', type: '6-Week', location: 'Johannesburg CBD' }
    ]
};

// ===== MOBILE NAVIGATION FUNCTIONALITY =====
function initializeMobileNavigation() {
    // Create hamburger button
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (!nav || !navLinks) return;
    
    // Create hamburger button if it doesn't exist
    if (!document.querySelector('.nav-toggle')) {
        const navToggle = document.createElement('button');
        navToggle.className = 'nav-toggle';
        navToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        
        // Insert hamburger button after logo
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.parentNode.insertBefore(navToggle, logo.nextSibling);
        }
        
        // Add click event to toggle menu
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = nav.contains(event.target);
            if (!isClickInsideNav && navLinks.classList.contains('active')) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

// Initialize courses checklist
function initializeCourses() {
    const coursesContainer = document.getElementById('coursesCheckbox');
    if (!coursesContainer) return;

    coursesContainer.innerHTML = '';

    courses.forEach(course => {
        const checkboxItem = document.createElement('div');
        checkboxItem.className = 'checkbox-item';
        checkboxItem.innerHTML = `
            <input type="checkbox" id="${course.id}" name="courses" value="${course.id}" data-price="${course.price}" onchange="calculateQuote()">
            <label for="${course.id}" class="checkbox-label">
                ${course.name}
                <span class="course-fee">R${course.price.toLocaleString()}</span>
            </label>
        `;
        coursesContainer.appendChild(checkboxItem);
    });
}

// Calculate quote with discounts and VAT
function calculateQuote() {
    const selectedCourses = document.querySelectorAll('input[name="courses"]:checked');
    const subtotalElement = document.getElementById('subtotal');
    const discountElement = document.getElementById('discount');
    const vatElement = document.getElementById('vat');
    const totalElement = document.getElementById('total');

    if (!subtotalElement) return;

    let subtotal = 0;
    selectedCourses.forEach(course => {
        subtotal += parseFloat(course.getAttribute('data-price'));
    });

    // Calculate discount based on number of courses
    const courseCount = selectedCourses.length;
    let discountRate = 0;
    
    if (courseCount >= 4) {
        discountRate = discountRates[4];
    } else if (courseCount >= 1) {
        discountRate = discountRates[courseCount];
    }

    const discountAmount = subtotal * discountRate;
    const discountedSubtotal = subtotal - discountAmount;
    const vatAmount = discountedSubtotal * vatRate;
    const totalAmount = discountedSubtotal + vatAmount;

    // Update display
    subtotalElement.textContent = `R ${subtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    discountElement.textContent = `-R ${discountAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (${(discountRate * 100).toFixed(0)}%)`;
    vatElement.textContent = `R ${vatAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    totalElement.textContent = `R ${totalAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    // Show discount explanation
    showDiscountExplanation(courseCount, discountRate);
    
    // Update checkbox visual state
    updateCheckboxStates();
}

// Update checkbox visual states
function updateCheckboxStates() {
    const checkboxes = document.querySelectorAll('.checkbox-item');
    checkboxes.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            item.classList.add('checked');
        } else {
            item.classList.remove('checked');
        }
    });
}

// Show discount explanation
function showDiscountExplanation(courseCount, discountRate) {
    // Remove existing explanation if any
    const existingExplanation = document.getElementById('discountExplanation');
    if (existingExplanation) {
        existingExplanation.remove();
    }

    if (courseCount > 0 && discountRate > 0) {
        const discountExplanation = document.createElement('div');
        discountExplanation.id = 'discountExplanation';
        discountExplanation.style.cssText = 'background: #f0f9ff; padding: 1rem; border-radius: 8px; margin: 1rem 0; border-left: 4px solid var(--primary-color);';
        
        let explanationText = `You've selected ${courseCount} course${courseCount > 1 ? 's' : ''}. `;
        
        if (courseCount === 1) {
            explanationText += "You qualify for a 0% discount on your first course!";
        } else if (courseCount === 2) {
            explanationText += "You qualify for our 5% bundle discount!";
        } else if (courseCount === 3) {
            explanationText += "You qualify for our 10% bundle discount!";
        } else {
            explanationText += "You qualify for our maximum 15% bundle discount!";
        }

        discountExplanation.textContent = explanationText;
        const quoteSummary = document.getElementById('quoteSummary');
        if (quoteSummary) {
            quoteSummary.parentNode.insertBefore(discountExplanation, quoteSummary);
        }
    }
}

// Load testimonials
function loadTestimonials() {
    const container = document.getElementById('testimonialsContainer');
    if (!container) return;

    container.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-card">
            <p>"${testimonial.text}"</p>
            <span>- ${testimonial.author}</span>
            <div class="testimonial-course">Course: ${testimonial.course}</div>
        </div>
    `).join('');
}

// Load blog posts
function loadBlogPosts() {
    const container = document.getElementById('blogContainer');
    if (!container) return;

    container.innerHTML = blogPosts.map(post => `
        <article class="blog-card">
            <div class="blog-image">📝</div>
            <div class="blog-content">
                <span class="category">${post.category}</span>
                <h3>${post.title}</h3>
                <p class="date">${new Date(post.date).toLocaleDateString()}</p>
                <p>${post.excerpt}</p>
                <a href="#" class="btn btn-outline">Read More</a>
            </div>
        </article>
    `).join('');
}

// Initialize FAQ functionality
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('active');
            });
            
            // Toggle current answer
            if (!isActive) {
                answer.classList.add('active');
            }
        });
    });
}

// Course Finder Wizard
let currentWizardStep = 1;
const wizardSelections = {};

function initializeWizard() {
    showWizardStep(1);
    updateWizardNavigation();
}

function showWizardStep(step) {
    document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
    const stepElement = document.getElementById(`wizardStep${step}`);
    if (stepElement) {
        stepElement.classList.add('active');
    }
    currentWizardStep = step;
    updateWizardNavigation();
}

function updateWizardNavigation() {
    const nav = document.getElementById('wizardNavigation');
    if (!nav) return;
    
    const prevBtn = nav.querySelector('button:first-child');
    const nextBtn = nav.querySelector('button:last-child');
    const stepIndicator = document.getElementById('currentStep');
    
    if (stepIndicator) {
        stepIndicator.textContent = currentWizardStep;
    }
    
    // Show/hide previous button
    if (prevBtn) {
        prevBtn.style.visibility = currentWizardStep > 1 ? 'visible' : 'hidden';
        prevBtn.onclick = () => showWizardStep(currentWizardStep - 1);
    }
    
    // Show/hide next button
    if (nextBtn) {
        if (currentWizardStep < 3) {
            nextBtn.style.visibility = 'visible';
            nextBtn.textContent = 'Next →';
            nextBtn.onclick = () => showWizardStep(currentWizardStep + 1);
        } else {
            nextBtn.style.visibility = 'hidden';
        }
    }
}

function selectWizardOption(step, value) {
    wizardSelections[`step${step}`] = value;
    
    if (step === 3) {
        showRecommendedCourses();
    } else {
        showWizardStep(step + 1);
    }
}

function showRecommendedCourses() {
    const recommendations = getCourseRecommendations();
    const container = document.getElementById('wizardResults');
    
    if (!container) return;
    
    container.innerHTML = `
        <h3>Recommended Courses for You</h3>
        <div class="recommended-courses">
            ${recommendations.map(course => `
                <div class="course-recommendation" style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
                    <h4>${course.name}</h4>
                    <p>${course.reason}</p>
                    <a href="${course.id}.html" class="btn">View Course Details</a>
                </div>
            `).join('')}
        </div>
        <div class="wizard-nav">
            <button onclick="showWizardStep(1)" class="btn btn-outline">Start Over</button>
            <a href="get-quote.html" class="btn btn-primary">Get Quote for These Courses</a>
        </div>
    `;
    
    showWizardStep(4);
}

function getCourseRecommendations() {
    const goal = wizardSelections.step1;
    const experience = wizardSelections.step2;
    const schedule = wizardSelections.step3;
    
    let recommendations = [];
    
    if (goal === 'career-advancement' || goal === 'income-increase') {
        recommendations.push({
            name: 'First Aid',
            id: 'first-aid',
            reason: 'Essential certification that increases employability and earning potential by up to 30%.'
        });
    }
    
    if (goal === 'entrepreneur' || experience === 'some-experience') {
        recommendations.push({
            name: 'Sewing',
            id: 'sewing',
            reason: 'Perfect for starting a small alterations business or fashion enterprise with low startup costs.'
        });
    }
    
    if (goal === 'new-skills' || schedule === 'flexible') {
        recommendations.push({
            name: 'Life Skills',
            id: 'life-skills',
            reason: 'Fundamental skills that benefit all aspects of personal and professional life.'
        });
    }
    
    // Always include at least one recommendation
    if (recommendations.length === 0) {
        recommendations.push({
            name: 'Life Skills',
            id: 'life-skills',
            reason: 'A great starting point for personal and professional development.'
        });
    }
    
    return recommendations;
}

// Calendar functionality
let currentCalendarDate = new Date();

function initializeCalendar() {
    renderCalendar(currentCalendarDate);
}

function renderCalendar(date) {
    const calendarGrid = document.getElementById('calendarGrid');
    const monthYear = document.getElementById('calendarMonthYear');
    
    if (!calendarGrid || !monthYear) return;
    
    const year = date.getFullYear();
    const month = date.getMonth();
    
    monthYear.textContent = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    // Create calendar header
    let calendarHTML = '';
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    days.forEach(day => {
        calendarHTML += `<div class="calendar-day header">${day}</div>`;
    });
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
        calendarHTML += `<div class="calendar-day"></div>`;
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
        const dayCourses = courseCalendar[monthKey]?.filter(course => course.date === dateString) || [];
        
        const hasCourse = dayCourses.length > 0;
        const dayClass = hasCourse ? 'calendar-day has-course' : 'calendar-day';
        
        calendarHTML += `<div class="${dayClass}">${day}`;
        
        dayCourses.forEach(course => {
            calendarHTML += `<div class="course-event">${course.course}</div>`;
        });
        
        calendarHTML += `</div>`;
    }
    
    calendarGrid.innerHTML = calendarHTML;
}

function prevMonth() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderCalendar(currentCalendarDate);
}

function nextMonth() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderCalendar(currentCalendarDate);
}

// Newsletter subscription
function subscribeNewsletter(event) {
    if (event) event.preventDefault();
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput ? emailInput.value : '';
    
    if (email && validateEmail(email)) {
        // In a real application, you would send this to your backend
        localStorage.setItem('newsletterSubscribed', 'true');
        alert('Thank you for subscribing to our newsletter!');
        if (emailInput) emailInput.value = '';
    } else {
        alert('Please enter a valid email address.');
    }
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Save quote functionality
function saveQuote() {
    const selectedCourses = document.querySelectorAll('input[name="courses"]:checked');
    if (selectedCourses.length === 0) {
        alert('Please select at least one course to save your quote.');
        return;
    }
    
    const quoteData = {
        courses: Array.from(selectedCourses).map(course => course.id),
        timestamp: new Date().toISOString(),
        total: document.getElementById('total').textContent
    };
    
    localStorage.setItem('savedQuote', JSON.stringify(quoteData));
    alert('Quote saved! You can return to it later.');
}

// Load saved quote
function loadSavedQuote() {
    const savedQuote = localStorage.getItem('savedQuote');
    if (savedQuote) {
        const quoteData = JSON.parse(savedQuote);
        // Pre-select courses from saved quote
        quoteData.courses.forEach(courseId => {
            const checkbox = document.getElementById(courseId);
            if (checkbox) checkbox.checked = true;
        });
        calculateQuote();
    }
}

// Form submission handler
function initializeFormHandlers() {
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleQuoteSubmission();
        });
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', subscribeNewsletter);
    }
}

function handleQuoteSubmission() {
    const selectedCourses = document.querySelectorAll('input[name="courses"]:checked');
    if (selectedCourses.length === 0) {
        alert('Please select at least one course before submitting.');
        return;
    }

    // Get form data
    const formData = {
        name: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        queryType: document.getElementById('queryType').value,
        courses: Array.from(selectedCourses).map(course => course.id),
        subtotal: document.getElementById('subtotal').textContent,
        discount: document.getElementById('discount').textContent,
        vat: document.getElementById('vat').textContent,
        total: document.getElementById('total').textContent
    };

    showSubmissionSuccess(formData);
}

// Show success message
function showSubmissionSuccess(formData) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    
    successMessage.innerHTML = `
        <h3>✅ Quote Request Submitted Successfully!</h3>
        <p>
            Thank you <strong>${formData.name}</strong>! Your quote request has been received.
        </p>
        <div style="background: white; padding: 1rem; border-radius: 6px; margin: 1rem 0;">
            <p><strong>Selected Courses:</strong> ${formData.courses.length}</p>
            <p><strong>Total Amount:</strong> ${formData.total}</p>
            <p><strong>Registration Type:</strong> ${formData.queryType}</p>
        </div>
        <p>
            Our consultant will contact you at <strong>${formData.phone}</strong> or <strong>${formData.email}</strong> 
            within 24 hours to provide your formal invoice and discuss next steps.
        </p>
        <div class="mt-2">
            <button onclick="window.print()" class="btn btn-outline">Print Quote</button>
            <a href="index.html" class="btn btn-primary">Return to Home</a>
        </div>
    `;

    // Replace form with success message
    const form = document.getElementById('quoteForm');
    if (form) {
        form.parentNode.replaceChild(successMessage, form);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Your existing initialization code...
    initializeCourses();
    calculateQuote();
    loadTestimonials();
    loadBlogPosts();
    initializeFAQ();
    initializeWizard();
    initializeCalendar();
    initializeFormHandlers();
    loadSavedQuote();
    
    // Add mobile navigation initialization
    initializeMobileNavigation();
    
    // Set current year in footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Handle URL parameters for pre-selecting courses
    const urlParams = new URLSearchParams(window.location.search);
    const courseParam = urlParams.get('course');
    if (courseParam) {
        const checkbox = document.getElementById(courseParam);
        if (checkbox) {
            checkbox.checked = true;
            calculateQuote();
            if (window.location.pathname.includes('get-quote')) {
                document.getElementById('quoteForm').scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// Utility function to format currency
function formatCurrency(amount) {
    return 'R ' + amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}