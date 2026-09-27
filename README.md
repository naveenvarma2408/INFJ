# Saranya Kolukuluri - INFJ Life Coach Website

A responsive website for **Saranya Kolukuluri**, a personal life coach featuring three main service sections: educational videos, journal insights, and one-on-one coaching sessions. **Specializing in INFJ healing and support for sensitive personality types.**

# Saranya Kolukuluri - INFJ Life Coach Website

🌟 **Live Website**: [Deploy to see your live URL]

A responsive website for **Saranya Kolukuluri**, a personal life coach featuring three main service sections: educational videos, journal insights, and one-on-one coaching sessions. **Specializing in INFJ healing and support for sensitive personality types.**

## 🎯 Features

- **Responsive Design**: Mobile-first approach with smooth animations
- **Interactive Tab Navigation**: Switch between Videos, Journals, and Sessions
- **INFJ Specialization**: Dedicated content and services for INFJ personality types
- **Payment Integration**: Stripe-powered secure payments
- **Modern UI**: Gradient backgrounds, card-based layouts, and smooth transitions
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Performance**: Vanilla JavaScript with optimized animations

## 🚀 Quick Deploy Options

### **Option 1: Netlify (2 minutes) - Recommended**
1. Go to [netlify.com](https://netlify.com)
2. Drag the entire project folder to the deploy area
3. Get instant live URL like: `https://saranya-lifecoach.netlify.app`

### **Option 2: GitHub Pages (5 minutes)**
```bash
git init
git add .
git commit -m "Deploy Saranya's website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/saranya-lifecoach.git
git push -u origin main
```
Then enable Pages in GitHub repository settings.

### **Option 3: Vercel (3 minutes)**
```bash
npm install -g vercel
vercel
```
Follow prompts for instant deployment.

## 💳 Payment Setup

The website includes Stripe integration. To enable real payments:

1. **Get Stripe Account**: Sign up at [stripe.com](https://stripe.com)
2. **Update API Key**: Replace `STRIPE_PUBLISHABLE_KEY` in `js/script.js`
3. **Deploy Backend**: Use provided `backend-example.js`

See `STRIPE_SETUP.md` for detailed payment setup instructions.

## Project Structure

```
/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Main stylesheet with responsive design
├── js/
│   └── script.js      # Interactive functionality and animations
├── assets/            # Directory for images and media (placeholder)
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## Sections

### 1. Videos Tab
- Goal Setting Mastery
- **INFJ Healing & Growth** (Featured)
- Mindset Transformation  
- Work-Life Balance
- Educational content with engaging video previews

### 2. Journals Tab
- Daily Reflection Practice
- Growth Through Challenges
- **The INFJ Journey** (Featured)
- Discovering Your Values
- Reflective content and personal insights

### 3. One-on-One Sessions Tab
- **Discovery Session**: Free 30-minute consultation
- **Transformation Package**: 6-week intensive program ($997)
- **INFJ Healing Intensive**: 8-week specialized INFJ program ($1,297)
- **Ongoing Coaching**: Monthly sessions ($197/month)

## Getting Started

1. Open `index.html` in your web browser
2. Navigate through the tabs to explore different services
3. The website is fully responsive and works on all devices

## Customization

### Colors
The website uses a modern gradient color scheme:
- Primary: `#667eea` to `#764ba2`
- Accent: `#ff6b6b` to `#feca57`
- Background: `#f8f9fa`

### Content
- Replace placeholder contact information in the Contact section (currently saranya@lifecoach.com)
- Update the About section with Saranya's personal coaching background
- Add actual video links and journal content
- Customize pricing and session details

### Adding Content
- Place images in the `/assets` folder
- Update links in the HTML to point to actual booking systems
- Add more service cards by copying the existing card structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- HTML5 (semantic structure)
- CSS3 (Grid, Flexbox, animations)
- Vanilla JavaScript (ES6+)
- CSS Grid and Flexbox for layouts
- CSS animations and transitions

## Development

To modify the website:

1. **HTML Structure**: Edit `index.html` for content changes
2. **Styling**: Modify `css/style.css` for visual changes
3. **Functionality**: Update `js/script.js` for interactive features

### Key JavaScript Features
- Tab switching functionality
- Smooth scrolling navigation
- Scroll-based header effects
- Card animation on viewport entry
- Mobile-responsive navigation

## Performance Features

- Optimized CSS with efficient selectors
- Lazy-loaded animations
- Minimal JavaScript footprint
- Mobile-first responsive design
- Smooth 60fps animations

## Deployment

This is a static website that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any web hosting service

Simply upload all files to your web server or hosting platform.

---

**Created**: January 2026  
**License**: MIT  
**Coach**: Saranya Kolukuluri - INFJ Life Coach  
**Author**: Personal Life Coach Website Template