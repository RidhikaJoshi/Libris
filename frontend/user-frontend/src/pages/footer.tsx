import { Link } from "react-router-dom";    


export default function Footer(){
    return (
        <>
        {/* Footer */}
      <footer className="bg-gray-900 py-12 ">
        <div className="container mx-auto px-8 ">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-center">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">About Us</h3>
              <ul className="space-y-2">
                <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">Our Story</Link></li>
                <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">Our Mission</Link></li>
                <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">Our Team</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">Resources</h3>
              <ul className="space-y-2">
                <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">eBooks</Link></li>
                <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">Webinars</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">Support</h3>
              <ul className="space-y-2">
                <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>    
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">Legal</h3>
              <ul className="space-y-2">
                <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; 2024 Libris. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </>
    )
}