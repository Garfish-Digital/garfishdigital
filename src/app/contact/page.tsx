'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HomeModernIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import './contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [validation, setValidation] = useState<Record<string, string>>({});
  const [placeholders, setPlaceholders] = useState({
    name: 'Your name',
    email: 'your@email.com',
    company: 'Your company (optional)',
    message: 'Tell us about your project...'
  });
  const [placeholderKeys, setPlaceholderKeys] = useState({
    name: 0,
    email: 0,
    company: 0,
    message: 0
  });
  const [showModal, setShowModal] = useState<'privacy' | 'terms' | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showGlitchLogo, setShowGlitchLogo] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showFinalLogo, setShowFinalLogo] = useState(false);
  const [backTextOpacity, setBackTextOpacity] = useState(0);
  const [glitchOpacity, setGlitchOpacity] = useState(1);
  const [glitchText7, setGlitchText7] = useState('.');
  const [glitchText4, setGlitchText4] = useState('.');

  // Separate cycling for each field with staggered timing
  useEffect(() => {
    // Cycling placeholder text
    const placeholderOptions = {
      name: [`What\'s your name`, 'What should we call you?', 'How about a nickname?', 'Who are you?'],
      email: ['your@email.com', 'Where do you get messages?', 'Your digit@l address', 'How do we reach you?'],
      company: ['Your company (optional)', 'What type of work do you do?', 'The place you go to bust your a$$', 'Are you part of an organization?'],
      message: ['Tell us about your project...', 'What are you building?', 'Share your vision...', 'What keeps you up at night?', 'What can we do for you?']
    };

    let nameIndex = 0;
    let emailIndex = 0;
    let companyIndex = 0;
    let messageIndex = 0;

    const nameInterval = setInterval(() => {
      nameIndex = (nameIndex + 1) % placeholderOptions.name.length;
      setPlaceholders(prev => ({ ...prev, name: placeholderOptions.name[nameIndex] }));
      setPlaceholderKeys(prev => ({ ...prev, name: prev.name + 1 }));
    }, 7600);

    const emailInterval = setInterval(() => {
      emailIndex = (emailIndex + 1) % placeholderOptions.email.length;
      setPlaceholders(prev => ({ ...prev, email: placeholderOptions.email[emailIndex] }));
      setPlaceholderKeys(prev => ({ ...prev, email: prev.email + 1 }));
    }, 13000);

    const companyInterval = setInterval(() => {
      companyIndex = (companyIndex + 1) % placeholderOptions.company.length;
      setPlaceholders(prev => ({ ...prev, company: placeholderOptions.company[companyIndex] }));
      setPlaceholderKeys(prev => ({ ...prev, company: prev.company + 1 }));
    }, 15500);

    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % placeholderOptions.message.length;
      setPlaceholders(prev => ({ ...prev, message: placeholderOptions.message[messageIndex] }));
      setPlaceholderKeys(prev => ({ ...prev, message: prev.message + 1 }));
    }, 10000);

    return () => {
      clearInterval(nameInterval);
      clearInterval(emailInterval);
      clearInterval(companyInterval);
      clearInterval(messageInterval);
    };
  }, []);

  // No final logo transition - let the black text remain as the final state

  // Text content changes
  useEffect(() => {
    // Change glitched-text-7 to "i" after 10 seconds
    const text7Timer = setTimeout(() => {
      setGlitchText7('i');
    }, 10000);

    // Change glitched-text-4 to "i" after 20 seconds  
    const text4Timer = setTimeout(() => {
      setGlitchText4('i');
    }, 20000);

    return () => {
      clearTimeout(text7Timer);
      clearTimeout(text4Timer);
    };
  }, []);

  // Back-text and glitch fade animations - start after 20 seconds
  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setBackTextOpacity(1);  // Fade in black back-text
      setGlitchOpacity(0);    // Fade out glitch text
    }, 20000);

    return () => clearTimeout(animationTimer);
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(null);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Smart validation
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        if (!value) return '';
        if (value.length < 2) return 'A bit short for a name...';
        if (value.length > 50) return 'That\'s quite a name!';
        return 'Perfect 👌';
      
      case 'email':
        if (!value) return '';
        if (!value.includes('@')) return 'Missing the @ symbol';
        if (!value.includes('.')) return 'Needs a domain ending';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email format seems off';
        return 'Looking good ✓';
      
      case 'message':
        if (!value) return '';
        if (value.length < 10) return 'Tell us a bit more...';
        if (value.length > 1000) return 'Whoa, that\'s detailed!';
        return `${value.length} characters of brilliance`;
      
      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - replace with actual email service
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Real-time validation
    const validationMessage = validateField(name, value);
    setValidation(prev => ({
      ...prev,
      [name]: validationMessage
    }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center contact-success-background"
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl mb-8">✓</div>
          <h1 className="text-3xl font-bold mb-4">Message Sent</h1>
          <p className="text-white/70 mb-8">We&apos;ll get back to you within 24 hours.</p>
          <Link 
            href="/"
            className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-black contact-page-container"
    >
      {/* Navigation Icons - Bottom Right */}
      <div className="bottom-nav-container">  
        <Link 
          href="/gallery"
          className="transition-all duration-300 hover:brightness-150"
          title="Gallery"
        >
          <Squares2X2Icon className="home-icon contact-page-gallery-icon drop-shadow-lg" />
        </Link>
        <Link 
          href="/"
          className="transition-all duration-300 hover:brightness-150"
          title="Back to Home"
        >
          <HomeModernIcon className="home-icon contact-page-home-icon drop-shadow-lg" />
        </Link>
      </div>

      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-2xl contact-form-container">
      
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-4 bg-white contact-form-field focus:outline-none text-black transition-all duration-300 ${
                    focusedField === 'name' 
                      ? 'focus-bounce' 
                      : ''
                  }`}
                  placeholder=" "
                />
                {!formData.name && (
                  <div className="absolute left-4 top-4 pointer-events-none overflow-hidden h-6">
                    <motion.div
                      key={placeholderKeys.name}
                      className="text-gray-500"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      {placeholders.name}
                    </motion.div>
                  </div>
                )}
              </div>
              {validation.name && (
                <div className={`text-xs mt-1 transition-all duration-300 ${
                  validation.name.includes('Perfect') || validation.name.includes('✓') 
                    ? 'text-green-400' 
                    : validation.name.includes('short') || validation.name.includes('quite')
                    ? 'text-yellow-400'
                    : 'text-white/60'
                }`}>
                  {validation.name}
                </div>
              )}
            </div>
            
            <div className="relative">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-4 bg-white contact-form-field focus:outline-none text-black transition-all duration-300 ${
                    focusedField === 'email' 
                      ? 'focus-bounce' 
                      : ''
                  }`}
                  placeholder=" "
                />
                {!formData.email && (
                  <div className="absolute left-4 top-4 pointer-events-none overflow-hidden h-6">
                    <motion.div
                      key={placeholderKeys.email}
                      className="text-gray-500"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      {placeholders.email}
                    </motion.div>
                  </div>
                )}
              </div>
              {validation.email && (
                <div className={`text-xs mt-1 transition-all duration-300 ${
                  validation.email.includes('Looking good') || validation.email.includes('✓')
                    ? 'text-green-400' 
                    : validation.email.includes('Missing') || validation.email.includes('Needs') || validation.email.includes('format')
                    ? 'text-yellow-400'
                    : 'text-white/60'
                }`}>
                  {validation.email}
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="relative">
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                onFocus={() => handleFocus('company')}
                onBlur={handleBlur}
                className={`w-full px-4 py-4 bg-white contact-form-field focus:outline-none text-black transition-all duration-300 ${
                  focusedField === 'company' 
                    ? 'focus-bounce' 
                    : ''
                }`}
                placeholder=" "
              />
              {!formData.company && (
                <div className="absolute left-4 top-4 pointer-events-none overflow-hidden h-6">
                  <motion.div
                    key={placeholderKeys.company}
                    className="text-gray-500"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {placeholders.company}
                  </motion.div>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="relative">
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
                className={`w-full px-4 py-4 bg-white contact-form-field focus:outline-none text-black resize-none transition-all duration-300 ${
                  focusedField === 'message' 
                    ? 'focus-bounce' 
                    : ''
                }`}
                placeholder=" "
              />
              {!formData.message && (
                <div className="absolute left-4 top-4 pointer-events-none overflow-hidden h-6">
                  <motion.div
                    key={placeholderKeys.message}
                    className="text-gray-500"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {placeholders.message}
                  </motion.div>
                </div>
              )}
            </div>
            {validation.message && (
              <div className={`text-xs mt-1 transition-all duration-300 ${
                validation.message.includes('brilliance')
                  ? 'text-green-400' 
                  : validation.message.includes('more') || validation.message.includes('detailed')
                  ? 'text-yellow-400'
                  : 'text-white/60'
              }`}>
                {validation.message}
              </div>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="inline-block bg-white contact-form-button disabled:opacity-50 disabled:cursor-not-allowed text-lg text-black transition-all duration-300 transform focus:outline-none"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                Sending Message...
              </div>
            ) : (
              'Send'
            )}
          </motion.button>
        </motion.form>
        </div>
      </div>

      {/* Legal Links - Bottom Left */}
      <div className="fixed bottom-8 left-8 z-40 flex gap-4 text-xs">
        <button
          onClick={() => setShowModal('privacy')}
          className="text-[#aaaaaa] hover:text-[#555555] transition-colors duration-200 underline decoration-dotted underline-offset-2"
        >
          Privacy
        </button>
        <button
          onClick={() => setShowModal('terms')}
          className="text-[#aaaaaa] hover:text-[#555555] transition-colors duration-200 underline decoration-dotted underline-offset-2"
        >
          Terms
        </button>
      </div>

      {/* Glitch Animation - Upper Left */}
      {showGlitchLogo && (
        <div className="fixed top-8 left-8">
          {/* Black back-text - identical positioning with animated opacity */}
          <div 
            className="glitched-text back-text z-40" 
            style={{ 
              opacity: backTextOpacity,
              transition: 'opacity 10s ease-in-out'
            }}
          ><span>garfish digital</span>
          </div>
          {/* Original glitch text on top */}
          <div 
            className="glitched-text z-50 absolute top-0 left-0"
            style={{
              opacity: glitchOpacity,
              transition: 'opacity 10s ease-in-out'
            }}
          >
            <span className="glitched-text-1">garf</span><span className="glitched-text-7">{glitchText7}</span><span className="glitched-text-2">sh</span>&nbsp;<span className="glitched-text-3">d</span><span className="glitched-text-4">{glitchText4}</span><span>g</span><span className="glitched-text-5">i</span><span className="glitched-text-6">tal</span><br />
          </div>
        </div>
      )}
      
      {/* Final Logo State - Upper Left */}
      {showFinalLogo && (
        <div className="fixed top-8 left-8 z-50">
          <div className="logo-final-state">
            garfish digital
          </div>
        </div>
      )}

      {/* Fast Modal for Privacy/Terms */}
      <AnimatePresence>
        {showModal && (
          <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setShowModal(null)}
        >
          <motion.div
            className="w-full max-w-4xl mx-4 mb-4 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden contact-modal-background"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">
                {showModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h2>
              <button
                onClick={() => setShowModal(null)}
                className="text-white/60 hover:text-white transition-colors p-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto text-white/80 leading-relaxed">
              {showModal === 'privacy' ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Information Collection</h3>
                  <p>We collect information you provide directly to us, such as when you fill out our contact form or communicate with us.</p>
                  
                  <h3 className="text-lg font-semibold text-white">Use of Information</h3>
                  <p>We use the information we collect to respond to your inquiries, provide our services, and improve your experience.</p>
                  
                  <h3 className="text-lg font-semibold text-white">Information Sharing</h3>
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
                  
                  <h3 className="text-lg font-semibold text-white">Data Security</h3>
                  <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                  
                  <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                  <p>If you have questions about this Privacy Policy, please contact us through our contact form.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Acceptance of Terms</h3>
                  <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                  
                  <h3 className="text-lg font-semibold text-white">Services</h3>
                  <p>Garfish Digital provides web design, development, and digital consulting services. Specific terms for each project will be outlined in separate agreements.</p>
                  
                  <h3 className="text-lg font-semibold text-white">Intellectual Property</h3>
                  <p>The content, organization, graphics, design, and other matters related to this website are protected under applicable copyrights and other proprietary laws.</p>
                  
                  <h3 className="text-lg font-semibold text-white">Limitation of Liability</h3>
                  <p>Garfish Digital shall not be liable for any damages arising from the use of this website or our services, except as required by law.</p>
                  
                  <h3 className="text-lg font-semibold text-white">Changes to Terms</h3>
                  <p>We reserve the right to modify these terms at any time. Continued use of the website constitutes acceptance of any changes.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 text-center">
              <p className="text-white/50 text-sm">Last updated: January 2025</p>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}