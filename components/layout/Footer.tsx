export default function Footer() {
  return (
    <footer className="bg-white text-zinc-900 pt-20 pb-10 px-4 md:px-12 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="text-3xl font-bold mb-6 tracking-tighter text-zinc-900">stivate</div>
          <p className="text-zinc-600 max-w-sm">
            Enterprise IT Solutions, Cloud Architecture, and Custom Software Development.
          </p>
        </div>
        <div>
          <h5 className="font-bold mb-6 text-zinc-900">Company</h5>
          <ul className="space-y-4 text-zinc-600">
            <li><a href="#" className="hover:text-zinc-900 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-zinc-900 transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-zinc-900 transition-colors">Case Studies</a></li>
            <li><a href="#" className="hover:text-zinc-900 transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-6 text-zinc-900">Connect</h5>
          <ul className="space-y-4 text-zinc-600">
            <li><a href="#" className="hover:text-zinc-900 transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-zinc-900 transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-zinc-900 transition-colors">Careers</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-10 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm font-medium">
        <p>© {new Date().getFullYear()} Stivate IT Services. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-zinc-900 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
