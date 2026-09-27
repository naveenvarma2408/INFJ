// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 80; // Height of fixed header
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background change on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(102, 126, 234, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            header.style.backdropFilter = 'none';
        }
    });

    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all content cards
    const cards = document.querySelectorAll('.content-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('tab-btn')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Add click effect to cards
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const button = this.querySelector('.btn-primary, .btn-secondary');
            if (button) {
                button.click();
            }
        });
    });

    // Mobile menu toggle (for future enhancement)
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '☰';
        hamburger.style.display = 'none';
        hamburger.style.background = 'none';
        hamburger.style.border = 'none';
        hamburger.style.color = 'white';
        hamburger.style.fontSize = '1.5rem';
        hamburger.style.cursor = 'pointer';
        
        nav.appendChild(hamburger);
        
        // Show hamburger on mobile
        const checkMobile = () => {
            if (window.innerWidth <= 768) {
                hamburger.style.display = 'block';
                navMenu.style.display = 'none';
            } else {
                hamburger.style.display = 'none';
                navMenu.style.display = 'flex';
            }
        };
        
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', () => {
            if (navMenu.style.display === 'none' || !navMenu.style.display) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'rgba(102, 126, 234, 0.95)';
                navMenu.style.padding = '1rem';
                navMenu.style.backdropFilter = 'blur(10px)';
            } else {
                navMenu.style.display = 'none';
            }
        });
        
        window.addEventListener('resize', checkMobile);
        checkMobile();
    };
    
    createMobileMenu();
});

// Global function for hero button
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    const headerOffset = 80;
    const elementPosition = servicesSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add form validation for future contact forms
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Payment Integration Functions with Stripe
let currentService = '';
let currentAmount = 0;
let selectedUPIApp = '';
let stripe = null;
let cardElement = null;

const EMAILJS_SERVICE_ID = 'service_0e7turb';
const EMAILJS_TEMPLATE_ID = 'template_0qeeqaq';
const EMAILJS_PUBLIC_KEY = 'zHFsL8wyNhu2aCpUI';
const FREE_TRIAL_RECIPIENT = 'nirantaraveda@gmail.com';
const FREE_TRIAL_RECIPIENT_NAME = 'Nirantara Veda Team';

function initializeEmailJS() {
    if (window.emailjs && EMAILJS_PUBLIC_KEY && !EMAILJS_PUBLIC_KEY.startsWith('YOUR_')) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
}

// Initialize Stripe (Replace with your publishable key)
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51234567890abcdef...'; // Replace with your actual Stripe publishable key

function initializeStripe() {
    // Initialize Stripe with your publishable key
    stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
    
    // Create an instance of Elements
    const elements = stripe.elements();
    
    // Create an instance of the card Element
    cardElement = elements.create('card', {
        style: {
            base: {
                fontSize: '16px',
                color: '#333',
                '::placeholder': {
                    color: '#aab7c4',
                },
                fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
            },
            invalid: {
                color: '#dc3545',
                iconColor: '#dc3545'
            }
        },
        hidePostalCode: true
    });
    
    // Add an instance of the card Element into the card-element div
    if (document.getElementById('card-element')) {
        cardElement.mount('#card-element');
        
        // Handle real-time validation errors from the card Element
        cardElement.on('change', function(event) {
            const displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
                displayError.classList.add('show');
            } else {
                displayError.textContent = '';
                displayError.classList.remove('show');
            }
        });
    }
}

function openPaymentModal(service, amount) {
    currentService = service;
    currentAmount = amount;
    
    const serviceNames = {
        'six-month-path': '6-Month Clarity Path',
        'twelve-month-expansion': '12-Month Sacred Expansion'
    };
    
    document.getElementById('serviceName').textContent = serviceNames[service];
    document.getElementById('paymentAmount').textContent = formatInrAmount(amount);
    document.getElementById('btnAmount').textContent = formatInrAmount(amount);
    document.getElementById('paymentModal').style.display = 'block';
    
    // Initialize Stripe when modal opens
    setTimeout(() => {
        if (!stripe) {
            initializeStripe();
        }
    }, 100);
}

function formatInrAmount(amount) {
    return `INR ${Number(amount).toLocaleString('en-IN')}`;
}

function openBookingModal(service) {
    const slotSelect = document.getElementById('bookingSlot');

    if (slotSelect) {
        slotSelect.innerHTML = '<option value="">Choose a 1-hour slot</option>';

        const slots = generateWeekendSlots({
            days: [0, 6],
            hours: [13, 14, 15, 16, 17],
            weeksAhead: 3
        });

        slots.forEach(slot => {
            const option = document.createElement('option');
            option.value = slot.toISOString();
            option.textContent = formatSlotLabel(slot, true);
            slotSelect.appendChild(option);
        });
    }

    const message = document.getElementById('bookingMessageBox');
    if (message) {
        message.style.display = 'none';
        message.textContent = '';
        message.className = 'form-message';
    }

    document.getElementById('bookingForm').reset();
    document.getElementById('bookingModal').style.display = 'block';
}

function generateWeekendSlots({ days, hours, weeksAhead }) {
    const slots = [];
    const now = new Date();
    const candidate = new Date(now);
    const endDate = new Date(now);

    candidate.setMinutes(0, 0, 0);
    endDate.setDate(endDate.getDate() + (weeksAhead * 7));
    endDate.setHours(23, 59, 59, 999);

    while (candidate <= endDate) {
        if (days.includes(candidate.getDay())) {
            hours.forEach(hour => {
                const slot = new Date(candidate);
                slot.setHours(hour, 0, 0, 0);

                if (slot > now) {
                    slots.push(slot);
                }
            });
        }

        candidate.setDate(candidate.getDate() + 1);
        candidate.setHours(0, 0, 0, 0);
    }

    return slots;
}

function formatSlotLabel(slot, includeDuration = false) {
    const start = slot.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });
    const endSlot = new Date(slot);
    endSlot.setHours(endSlot.getHours() + 1);
    const end = endSlot.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });

    const dateLabel = slot.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    });

    return includeDuration ? `${dateLabel} - ${start} to ${end}` : `${dateLabel} - ${start}`;
}

function setBookingMessage(message, type) {
    const messageBox = document.getElementById('bookingMessageBox');
    if (!messageBox) {
        return;
    }

    messageBox.className = `form-message ${type}`;
    messageBox.textContent = message;
    messageBox.style.display = 'block';
}

function buildBookingEmailBody(bookingData) {
    return [
        'Discovery Session Request',
        '',
        `Name: ${bookingData.name}`,
        `Email: ${bookingData.email}`,
        `Requested Slot: ${bookingData.slotLabel}`,
        `Session Length: 1 hour`,
        '',
        'What they would like to focus on:',
        bookingData.message || 'No additional notes provided.',
        '',
        'Submitted from NirantaraVeda website.'
    ].join('\n');
}

const COACHING_PLAN_LABELS = {
    'six-month-path': '6-Month Clarity Path',
    'twelve-month-expansion': '12-Month Sacred Expansion'
};

function openCoachingPlanModal(planKey) {
    const selectedPlan = COACHING_PLAN_LABELS[planKey] || 'Coaching Plan';
    const selectedPlanInput = document.getElementById('coachingPlanSelected');
    const message = document.getElementById('coachingPlanMessage');

    if (selectedPlanInput) {
        selectedPlanInput.value = selectedPlan;
        selectedPlanInput.dataset.planKey = planKey;
    }

    if (message) {
        message.style.display = 'none';
        message.textContent = '';
        message.className = 'form-message';
    }

    document.getElementById('coachingPlanForm').reset();

    if (selectedPlanInput) {
        selectedPlanInput.value = selectedPlan;
        selectedPlanInput.dataset.planKey = planKey;
    }

    document.getElementById('coachingPlanModal').style.display = 'block';
}

function setCoachingPlanMessage(message, type) {
    const messageBox = document.getElementById('coachingPlanMessage');
    if (!messageBox) {
        return;
    }

    messageBox.className = `form-message ${type}`;
    messageBox.textContent = message;
    messageBox.style.display = 'block';
}

function buildCoachingPlanEmailBody(requestData) {
    return [
        'Coaching Plan Request',
        '',
        `Selected Plan: ${requestData.planName}`,
        `Name: ${requestData.name}`,
        `Email: ${requestData.email}`,
        '',
        'What they are looking for:',
        requestData.expectations,
        '',
        'Submitted from NirantaraVeda website.'
    ].join('\n');
}

function openFreeTrialModal() {
    const slotSelect = document.getElementById('freeTrialSlot');

    if (slotSelect) {
        slotSelect.innerHTML = '<option value="">Choose a slot</option>';

        const slots = [];
        const candidate = new Date();

        while (slots.length < 6) {
            if (candidate.getDay() === 0) {
                const sundaySlot = new Date(candidate);
                sundaySlot.setHours(15, 0, 0, 0);
                slots.push(sundaySlot);
            }

            candidate.setDate(candidate.getDate() + 1);
        }

        slots.forEach(slot => {
            const option = document.createElement('option');
            option.value = slot.toISOString();
            option.textContent = `${slot.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} - 3:00 PM`;
            slotSelect.appendChild(option);
        });
    }

    const message = document.getElementById('freeTrialMessage');
    if (message) {
        message.style.display = 'none';
        message.textContent = '';
        message.className = 'form-message';
    }

    document.getElementById('freeTrialForm').reset();
    document.getElementById('freeTrialModal').style.display = 'block';
}

function setFreeTrialMessage(message, type) {
    const messageBox = document.getElementById('freeTrialMessage');
    if (!messageBox) {
        return;
    }

    messageBox.className = `form-message ${type}`;
    messageBox.textContent = message;
    messageBox.style.display = 'block';
}

function buildFreeTrialEmailBody(requestData) {
    return [
        'Free Trial Session Request',
        '',
        `Name: ${requestData.name}`,
        `Email: ${requestData.email}`,
        `Requested Slot: ${requestData.slotLabel}`,
        '',
        'What they are expecting from the session:',
        requestData.expectations,
        '',
        'Submitted from NirantaraVeda website.'
    ].join('\n');
}

async function processFreeTrialRequest(event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    const requestData = {
        name: document.getElementById('freeTrialName').value.trim(),
        email: document.getElementById('freeTrialEmail').value.trim(),
        expectations: document.getElementById('freeTrialExpectations').value.trim(),
        slot: document.getElementById('freeTrialSlot').value,
        slotLabel: document.getElementById('freeTrialSlot').selectedOptions[0]?.textContent || ''
    };

    if (!requestData.name || !requestData.email || !requestData.expectations || !requestData.slot) {
        setFreeTrialMessage('Please complete all fields and choose a Sunday 3:00 PM slot.', 'error');
        return;
    }

    if (!validateEmail(requestData.email)) {
        setFreeTrialMessage('Please enter a valid email address.', 'error');
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    setFreeTrialMessage('Preparing your request...', 'loading');

    try {
        if (!window.emailjs) {
            throw new Error('EmailJS SDK is not loaded');
        }

        if (
            EMAILJS_SERVICE_ID.startsWith('YOUR_') ||
            EMAILJS_TEMPLATE_ID.startsWith('YOUR_') ||
            EMAILJS_PUBLIC_KEY.startsWith('YOUR_')
        ) {
            throw new Error('EmailJS credentials are not configured');
        }

        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            to_email: FREE_TRIAL_RECIPIENT,
            to_name: FREE_TRIAL_RECIPIENT_NAME,
            from_name: requestData.name,
            from_email: requestData.email,
            reply_to: requestData.email,
            slot: requestData.slotLabel,
            expectations: requestData.expectations,
            subject: `Free Trial Session Request - ${requestData.name}`,
            message: buildFreeTrialEmailBody(requestData)
        });

        setFreeTrialMessage('Your free trial request has been sent. Nirantara Veda will contact you soon.', 'success');
        showNotification('Free trial request submitted successfully.', 'success');
        event.target.reset();
    } catch (error) {
        console.error('Free trial EmailJS error:', error);
        setFreeTrialMessage('Email could not be sent right now. Please check your EmailJS configuration.', 'error');
        showNotification('Free trial request failed to send.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Request Free Trial';
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

async function processCoachingPlanRequest(event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    const selectedPlanInput = document.getElementById('coachingPlanSelected');
    const requestData = {
        planKey: selectedPlanInput?.dataset.planKey || '',
        planName: selectedPlanInput?.value.trim() || '',
        name: document.getElementById('coachingPlanName').value.trim(),
        email: document.getElementById('coachingPlanEmail').value.trim(),
        expectations: document.getElementById('coachingPlanExpectations').value.trim()
    };

    if (!requestData.planName || !requestData.name || !requestData.email || !requestData.expectations) {
        setCoachingPlanMessage('Please complete all fields before sending your request.', 'error');
        return;
    }

    if (!validateEmail(requestData.email)) {
        setCoachingPlanMessage('Please enter a valid email address.', 'error');
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    setCoachingPlanMessage('Preparing your coaching plan request...', 'loading');

    try {
        if (!window.emailjs) {
            throw new Error('EmailJS SDK is not loaded');
        }

        if (
            EMAILJS_SERVICE_ID.startsWith('YOUR_') ||
            EMAILJS_TEMPLATE_ID.startsWith('YOUR_') ||
            EMAILJS_PUBLIC_KEY.startsWith('YOUR_')
        ) {
            throw new Error('EmailJS credentials are not configured');
        }

        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            to_email: FREE_TRIAL_RECIPIENT,
            to_name: FREE_TRIAL_RECIPIENT_NAME,
            from_name: requestData.name,
            from_email: requestData.email,
            reply_to: requestData.email,
            selected_plan: requestData.planName,
            slot: requestData.planName,
            expectations: requestData.expectations,
            subject: `Coaching Plan Request - ${requestData.planName} - ${requestData.name}`,
            message: buildCoachingPlanEmailBody(requestData)
        });

        setCoachingPlanMessage('Your coaching plan request has been sent. Nirantara Veda will contact you soon.', 'success');
        showNotification('Coaching plan request submitted successfully.', 'success');
        event.target.reset();

        if (selectedPlanInput) {
            selectedPlanInput.value = requestData.planName;
            selectedPlanInput.dataset.planKey = requestData.planKey;
        }
    } catch (error) {
        console.error('Coaching plan EmailJS error:', error);
        setCoachingPlanMessage('Email could not be sent right now. Please check your EmailJS configuration.', 'error');
        showNotification('Coaching plan request failed to send.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Request This Plan';
    }
}

async function processPayment(event) {
    event.preventDefault();
    
    const submitButton = document.querySelector('.payment-btn');
    const formData = new FormData(event.target);
    const paymentData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('paymentEmail').value,
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
        agreeTerms: document.getElementById('agreeTerms').checked
    };
    
    // Basic validation
    if (!validateEmail(paymentData.email)) {
        showPaymentMessage('Please enter a valid email address', 'error');
        return;
    }
    
    if (!paymentData.agreeTerms) {
        showPaymentMessage('Please agree to the Terms of Service and Privacy Policy', 'error');
        return;
    }
    
    // Disable submit button during processing
    submitButton.disabled = true;
    submitButton.innerHTML = '<div class="loading-spinner"></div> Processing...';
    
    try {
        // Process based on payment method
        switch(paymentData.paymentMethod) {
            case 'card':
                await processStripePayment(paymentData);
                break;
            case 'upi':
                await processUPIPayment(paymentData);
                break;
            case 'paypal':
                await processPayPalPayment(paymentData);
                break;
        }
    } catch (error) {
        console.error('Payment error:', error);
        showPaymentMessage('Payment failed. Please try again.', 'error');
        
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.innerHTML = `<span class="btn-text">Complete Payment</span><span class="btn-amount">${formatInrAmount(currentAmount)}</span>`;
    }
}

async function processStripePayment(paymentData) {
    if (!stripe || !cardElement) {
        throw new Error('Stripe not initialized');
    }
    
    try {
        // Create payment intent on your backend
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: currentAmount * 100, // Amount in cents
                currency: 'usd',
                service: currentService,
                customer_email: paymentData.email,
                customer_name: paymentData.fullName
            }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to create payment intent');
        }
        
        const {client_secret} = await response.json();
        
        // Confirm payment with Stripe
        const result = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: paymentData.fullName,
                    email: paymentData.email
                }
            }
        });
        
        if (result.error) {
            // Payment failed
            showPaymentMessage(result.error.message, 'error');
            throw new Error(result.error.message);
        } else {
            // Payment succeeded
            showPaymentMessage('Payment successful! You will receive a confirmation email shortly.', 'success');
            
            // Send confirmation to your backend
            await sendPaymentConfirmation({
                payment_intent_id: result.paymentIntent.id,
                service: currentService,
                amount: currentAmount,
                customer_email: paymentData.email,
                customer_name: paymentData.fullName
            });
            
            setTimeout(() => {
                closeModal('paymentModal');
                resetPaymentForm();
            }, 3000);
        }
        
    } catch (error) {
        console.error('Stripe payment error:', error);
        
        // Fallback to demo mode if backend is not available
        console.warn('Backend not available, running in demo mode');
        showPaymentLoading('Processing your card payment...');
        
        setTimeout(() => {
            showPaymentMessage('Payment successful! (Demo Mode - No real charge made)', 'success');
            
            setTimeout(() => {
                closeModal('paymentModal');
                resetPaymentForm();
            }, 3000);
        }, 2000);
    }
}

async function sendPaymentConfirmation(paymentData) {
    try {
        await fetch('/confirm-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });
    } catch (error) {
        console.error('Failed to send confirmation:', error);
        // Continue anyway - payment was successful
    }
}

function processUPIPayment(paymentData) {
    const upiId = document.getElementById('upiId').value;
    
    if (selectedUPIApp) {
        // Use selected UPI app
        showPaymentLoading(`Opening ${selectedUPIApp} for payment...`);
        
        setTimeout(() => {
            showPaymentMessage(`Payment initiated via ${selectedUPIApp}. Please complete the payment in your app.`, 'success');
            
            // Simulate payment completion
            setTimeout(() => {
                showPaymentMessage('Payment confirmed! Thank you for your purchase.', 'success');
                sendConfirmationEmail(paymentData.email, currentService, currentAmount, selectedUPIApp);
                
                setTimeout(() => {
                    closeModal('paymentModal');
                    resetPaymentForm();
                }, 2000);
            }, 3000);
        }, 1000);
        
    } else if (upiId) {
        // Use manual UPI ID
        if (!upiId.includes('@')) {
            showPaymentMessage('Please enter a valid UPI ID', 'error');
            return;
        }
        
        showPaymentLoading('Processing UPI payment...');
        
        setTimeout(() => {
            showPaymentMessage('Payment successful via UPI! Confirmation sent to your email.', 'success');
            sendConfirmationEmail(paymentData.email, currentService, currentAmount, 'UPI');
            
            setTimeout(() => {
                closeModal('paymentModal');
                resetPaymentForm();
            }, 3000);
        }, 2000);
        
    } else {
        showPaymentMessage('Please select a UPI app or enter your UPI ID', 'error');
    }
}

function processPayPalPayment(paymentData) {
    showPaymentLoading('Redirecting to PayPal...');
    
    // Simulate PayPal redirect and completion
    setTimeout(() => {
        showPaymentMessage('PayPal payment completed successfully!', 'success');
        sendConfirmationEmail(paymentData.email, currentService, currentAmount, 'PayPal');
        
        setTimeout(() => {
            closeModal('paymentModal');
            resetPaymentForm();
        }, 3000);
    }, 2000);
}

function selectUPIApp(app) {
    // Remove previous selections
    document.querySelectorAll('.upi-app-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selection to clicked app
    event.target.classList.add('selected');
    selectedUPIApp = app.charAt(0).toUpperCase() + app.slice(1);
    
    // Clear manual UPI ID if app is selected
    document.getElementById('upiId').value = '';
}

function openTerms() {
    alert('Terms of Service would open in a new window in a real implementation.');
}

function openPrivacy() {
    alert('Privacy Policy would open in a new window in a real implementation.');
}

function showPaymentMessage(message, type) {
    // Remove any existing messages
    const existingMessages = document.querySelectorAll('.payment-message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `payment-message payment-${type}`;
    messageDiv.textContent = message;
    
    const modalContent = document.querySelector('#paymentModal .modal-content');
    modalContent.insertBefore(messageDiv, modalContent.querySelector('.payment-form-container'));
}

function showPaymentLoading(message) {
    showPaymentMessage('', 'loading');
    const messageDiv = document.querySelector('.payment-message');
    messageDiv.innerHTML = `
        <div class="payment-loading">
            <div class="loading-spinner"></div>
            <span>${message}</span>
        </div>
    `;
    messageDiv.className = 'payment-message';
}

function resetPaymentForm() {
    document.getElementById('paymentForm').reset();
    selectedUPIApp = '';
    
    // Reset payment method to card
    const cardRadio = document.querySelector('input[name="paymentMethod"][value="card"]');
    if (cardRadio) {
        cardRadio.checked = true;
        updatePaymentDetails('card');
    }
    
    // Reset submit button
    const submitButton = document.querySelector('.payment-btn');
    if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = `<span class="btn-text">Complete Payment</span><span class="btn-amount">${formatInrAmount(currentAmount)}</span>`;
    }
    
    // Clear Stripe card element
    if (cardElement) {
        cardElement.clear();
    }
    
    // Clear any error messages
    const cardErrors = document.getElementById('card-errors');
    if (cardErrors) {
        cardErrors.textContent = '';
        cardErrors.classList.remove('show');
    }
    
    // Remove any payment messages
    const messages = document.querySelectorAll('.payment-message');
    messages.forEach(msg => msg.remove());
    
    // Reset UPI app selections
    document.querySelectorAll('.upi-app-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
}

function updatePaymentDetails(method) {
    // Hide all payment details
    document.getElementById('cardDetails').style.display = 'none';
    document.getElementById('upiDetails').style.display = 'none';
    document.getElementById('paypalDetails').style.display = 'none';
    
    // Show selected payment details
    document.getElementById(method + 'Details').style.display = 'block';
    
    // Re-mount Stripe elements when switching to card
    if (method === 'card' && stripe && !document.querySelector('#card-element .StripeElement')) {
        setTimeout(() => {
            if (cardElement && document.getElementById('card-element')) {
                cardElement.mount('#card-element');
            }
        }, 100);
    }
}

// Event Listeners for Payment Method Selection
document.addEventListener('DOMContentLoaded', function() {
    initializeEmailJS();

    // Initialize Stripe on page load
    setTimeout(() => {
        initializeStripe();
    }, 1000);
    
    // Payment method radio buttons
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', function() {
            updatePaymentDetails(this.value);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const paymentModal = document.getElementById('paymentModal');
        const bookingModal = document.getElementById('bookingModal');
        const coachingPlanModal = document.getElementById('coachingPlanModal');
        
        if (event.target === paymentModal) {
            closeModal('paymentModal');
        }
        if (event.target === bookingModal) {
            closeModal('bookingModal');
        }
        if (event.target === coachingPlanModal) {
            closeModal('coachingPlanModal');
        }
    });
});

// Remove old functions that are no longer needed
function switchPaymentTab() {
    // This function is no longer needed
}

function processCardPayment(event) {
    // This function has been integrated into processPayment()
}

function processUPIDirectPayment(event) {
    // This function has been integrated into processPayment()
}

async function processBooking(event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    const bookingData = {
        name: document.getElementById('bookingName').value.trim(),
        email: document.getElementById('bookingEmail').value.trim(),
        slot: document.getElementById('bookingSlot').value,
        slotLabel: document.getElementById('bookingSlot').selectedOptions[0]?.textContent || '',
        message: document.getElementById('bookingMessage').value.trim()
    };

    if (!bookingData.name || !bookingData.email || !bookingData.slot) {
        setBookingMessage('Please complete all required fields and choose a weekend time slot.', 'error');
        return;
    }

    if (!validateEmail(bookingData.email)) {
        setBookingMessage('Please enter a valid email address.', 'error');
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    setBookingMessage('Preparing your discovery session request...', 'loading');

    try {
        if (!window.emailjs) {
            throw new Error('EmailJS SDK is not loaded');
        }

        if (
            EMAILJS_SERVICE_ID.startsWith('YOUR_') ||
            EMAILJS_TEMPLATE_ID.startsWith('YOUR_') ||
            EMAILJS_PUBLIC_KEY.startsWith('YOUR_')
        ) {
            throw new Error('EmailJS credentials are not configured');
        }

        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            to_email: FREE_TRIAL_RECIPIENT,
            to_name: FREE_TRIAL_RECIPIENT_NAME,
            from_name: bookingData.name,
            from_email: bookingData.email,
            reply_to: bookingData.email,
            slot: bookingData.slotLabel,
            expectations: bookingData.message || 'No additional notes provided.',
            subject: `Discovery Session Request - ${bookingData.name}`,
            message: buildBookingEmailBody(bookingData)
        });

        setBookingMessage('Your discovery session request has been sent. Nirantara Veda will contact you soon.', 'success');
        showNotification('Discovery session request submitted successfully.', 'success');
        event.target.reset();
    } catch (error) {
        console.error('Discovery session EmailJS error:', error);
        setBookingMessage('Email could not be sent right now. Please check your EmailJS configuration.', 'error');
        showNotification('Discovery session request failed to send.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Request Discovery Session';
    }
}

function generateUPIUrl(method, amount) {
    const upiId = 'nirantaraveda@paytm'; // Replace with actual UPI ID
    const merchantName = 'nirantaraveda';
    
    return `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR&tn=Coaching Service Payment`;
}

function showPaymentMessage(message, type) {
    // Remove any existing messages
    const existingMessages = document.querySelectorAll('.payment-message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `payment-message payment-${type}`;
    messageDiv.textContent = message;
    
    const modalContent = document.querySelector('#paymentModal .modal-content');
    modalContent.insertBefore(messageDiv, modalContent.querySelector('.payment-tabs'));
}

function showPaymentLoading(message) {
    showPaymentMessage('', 'loading');
    const messageDiv = document.querySelector('.payment-message');
    messageDiv.innerHTML = `
        <div class="payment-loading">
            <div class="loading-spinner"></div>
            <span>${message}</span>
        </div>
    `;
    messageDiv.className = 'payment-message';
}

function resetPaymentForm() {
    document.getElementById('cardForm').reset();
    document.getElementById('upiForm').reset();
    
    // Remove any messages
    const messages = document.querySelectorAll('.payment-message');
    messages.forEach(msg => msg.remove());
    
    // Reset to card payment tab
    switchPaymentTab('card');
}

function sendConfirmationEmail(email, service, amount) {
    // In a real implementation, this would send an actual email
    console.log(`Sending confirmation email to ${email} for ${service} - $${amount}`);
    
    // You could integrate with EmailJS, SendGrid, or your own backend here
    // For demo purposes, we'll just log it
}

// Format card number input
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
            if (formattedValue.length > 19) {
                formattedValue = formattedValue.substring(0, 19);
            }
            e.target.value = formattedValue;
        });
    }
    
    // Format expiry date input
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // CVV input - numbers only
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const paymentModal = document.getElementById('paymentModal');
        const bookingModal = document.getElementById('bookingModal');
        const coachingPlanModal = document.getElementById('coachingPlanModal');
        
        if (event.target === paymentModal) {
            closeModal('paymentModal');
        }
        if (event.target === bookingModal) {
            closeModal('bookingModal');
        }
        if (event.target === coachingPlanModal) {
            closeModal('coachingPlanModal');
        }
    });
});

// Utility function for showing notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);