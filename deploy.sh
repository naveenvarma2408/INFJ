#!/bin/bash
# Deployment script for The Empath Guide (theempathguide.com)

echo "🚀 Deploying The Empath Guide - Nirantara Veda's INFJ Coaching Website..."
echo "🌐 Target Domain: theempathguide.com"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing Git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Commit with timestamp
echo "💾 Creating commit for theempathguide.com deployment..."
git commit -m "Deploy The Empath Guide to theempathguide.com - $(date '+%Y-%m-%d %H:%M:%S')"

echo ""
echo "✅ Ready for deployment to theempathguide.com!"
echo ""
echo "� NEXT STEPS:"
echo ""
echo "1. 🚀 DEPLOY TO NETLIFY:"
echo "   - Netlify.com is already open in your browser"
echo "   - Drag this entire folder to the deploy area"
echo "   - Wait 2 minutes for deployment"
echo ""
echo "2. 🌐 ADD CUSTOM DOMAIN:"
echo "   - In Netlify: Site Settings → Domain Management"
echo "   - Add custom domain: theempathguide.com"
echo ""
echo "3. 📋 CONFIGURE GODADDY DNS:"
echo "   - Login to GoDaddy.com"
echo "   - Go to My Products → theempathguide.com → DNS"
echo "   - Change nameservers to:"
echo "     dns1.p08.nsone.net"
echo "     dns2.p08.nsone.net" 
echo "     dns3.p08.nsone.net"
echo "     dns4.p08.nsone.net"
echo ""
echo "4. ⏱️ WAIT FOR PROPAGATION:"
echo "   - DNS changes take 1-24 hours (usually 1-2 hours)"
echo "   - SSL certificate will be automatic"
echo ""
echo "5. 🎉 YOUR LIVE WEBSITE:"
echo "   - https://theempathguide.com"
echo "   - Accessible to everyone worldwide!"
echo ""
echo "📧 Don't forget to set up: nirantaraveda@gmail.com"
echo ""
echo "🚀 The Empath Guide is ready to go live!"