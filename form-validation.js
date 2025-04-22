// Form Validation

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    // Form field elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Error display elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');
    
    if (!contactForm) return;
    
    // Event listeners for real-time validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    subjectInput.addEventListener('blur', validateSubject);
    messageInput.addEventListener('blur', validateMessage);
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        // Proceed only if all validations pass
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Normally we would send the form data to a server here
            // For demo purposes, we'll simulate a successful submission
            
            // Disable form inputs and button during "submission"
            Array.from(contactForm.elements).forEach(element => {
                element.disabled = true;
            });
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            
            // Simulate server response delay
            setTimeout(() => {
                // Hide form and show success message
                contactForm.reset();
                contactForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
                
                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Enable form fields again after a delay
                setTimeout(() => {
                    Array.from(contactForm.elements).forEach(element => {
                        element.disabled = false;
                    });
                    submitButton.innerHTML = originalButtonText;
                    
                    // Reset UI after 5 seconds
                    setTimeout(() => {
                        contactForm.classList.remove('hidden');
                        formSuccess.classList.add('hidden');
                    }, 5000);
                }, 2000);
            }, 1500);
        } else {
            // If validation fails, scroll to the first error
            const firstError = document.querySelector('.error-message:not(:empty)');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            nameError.textContent = 'Name is required';
            nameInput.classList.add('border-red-500');
            nameInput.classList.remove('border-green-500');
            return false;
        } else if (name.length < 2) {
            nameError.textContent = 'Name is too short';
            nameInput.classList.add('border-red-500');
            nameInput.classList.remove('border-green-500');
            return false;
        } else {
            nameError.textContent = '';
            nameInput.classList.remove('border-red-500');
            nameInput.classList.add('border-green-500');
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            emailError.textContent = 'Email is required';
            emailInput.classList.add('border-red-500');
            emailInput.classList.remove('border-green-500');
            return false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('border-red-500');
            emailInput.classList.remove('border-green-500');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('border-red-500');
            emailInput.classList.add('border-green-500');
            return true;
        }
    }
    
    function validateSubject() {
        const subject = subjectInput.value.trim();
        
        if (subject === '') {
            subjectError.textContent = 'Subject is required';
            subjectInput.classList.add('border-red-500');
            subjectInput.classList.remove('border-green-500');
            return false;
        } else if (subject.length < 3) {
            subjectError.textContent = 'Subject is too short';
            subjectInput.classList.add('border-red-500');
            subjectInput.classList.remove('border-green-500');
            return false;
        } else {
            subjectError.textContent = '';
            subjectInput.classList.remove('border-red-500');
            subjectInput.classList.add('border-green-500');
            return true;
        }
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        
        if (message === '') {
            messageError.textContent = 'Message is required';
            messageInput.classList.add('border-red-500');
            messageInput.classList.remove('border-green-500');
            return false;
        } else if (message.length < 10) {
            messageError.textContent = 'Message should be at least 10 characters';
            messageInput.classList.add('border-red-500');
            messageInput.classList.remove('border-green-500');
            return false;
        } else {
            messageError.textContent = '';
            messageInput.classList.remove('border-red-500');
            messageInput.classList.add('border-green-500');
            return true;
        }
    }
});
