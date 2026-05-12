export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-4 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="text-3xl font-bold mb-6 tracking-tighter">stivate</div>
          <p className="text-white/50 max-w-sm">
            Premium futuristic web experiences engineered for modern creative brands.
          </p>
        </div>
        <div>
          <h5 className="font-semibold mb-6">Links</h5>
          <ul className="space-y-4 text-white/50">
            <li><a href="#" className="hover:text-white transition-colors">Work</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Studio</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-6">Social</h5>
          <ul className="space-y-4 text-white/50">
            <li><a href="#" className="hover:text-white transition-colors">Twitter / X</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Dribbble</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-white/40 text-sm">
        <p>© {new Date().getFullYear()} Stivate. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
