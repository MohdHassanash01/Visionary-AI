import React from 'react';
import { Zap, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-4 lg:px-8 border-t  ">
      <div className="container mx-auto max-w-6xl">

        <div className="grid sm:grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 " />
              </div>
              <span className="text-xl font-bold ">Visionary AI</span>
            </div>
            <p className=" mb-6 leading-relaxed">
              Transform your words into stunning visuals with the power of artificial intelligence. 
              Join the creative revolution today.
            </p>

            <div className="flex space-x-4">
              <a href="#" className="  transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className=" transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" >
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" >
                <Mail className="w-5 h-5" />
              </a>
            </div>

          </div>

          <div>
            <h4 className=" font-semibold mb-6">Product</h4>

            <ul className="space-y-3">
              <li><a href="#features" >Features</a></li>

              <li><a href="#demo" >Demo</a></li>

              <li><a href="#pricing" >Pricing</a></li>

              <li><a href="#" >API Documentation</a></li>

              <li><a href="#" >Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className=" font-semibold mb-6">Company</h4>
            <ul className="space-y-3">

              <li><a href="#">About Us</a></li>
            
<li><a href="#" >Blog</a></li>

     <li><a href="#" >Careers</a></li>

    <li><a href="#" >Press Kit</a></li>

    <li><a href="#">Contact</a></li>

            </ul>
          </div>

          <div>
            <h4 className=" font-semibold mb-6">Support</h4>
            <ul className="space-y-3">

        <li><a href="#" >Help Center</a></li>
        <li><a href="#" >Community</a></li>
        <li><a href="#" >Tutorials</a></li>
        <li><a href="#" >System Status</a></li>

          <li><a href="#" >Bug Reports</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">

          <div className="flex flex-col md:flex-row items-center gap-4  text-sm">

            <p>&copy; 2025 Visionary AI. All rights reserved.</p>

            <div className="flex gap-6 text-black">
              <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
              <a href="#" >Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-sm">
              Made with ❤️ for creators everywhere
            </p>
          </div>
        </div>


      </div>
    </footer>
  );
};

export default Footer;