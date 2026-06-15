export default function Contact() {
  const brandOrange = "#E67E22";
  
  return (
    <div className="min-h-screen bg-white">

      {/* Header - Preserved exactly as you requested */}
      <div className="bg-black text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="text-uganda-yellow text-xs font-bold uppercase tracking-widest">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-2 mb-3">Contact Us</h1>
          <p className="text-gray-400 max-w-xl">
            Have a question or want to list your business? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Contact Info - Enhanced with Orange */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Let's talk</h2>
              <div className="w-12 h-0.5 bg-[#E67E22] mb-6"></div>
              <p className="text-gray-500 leading-relaxed">
                Whether you're a traveler planning your Uganda adventure, a hotel owner
                wanting to get listed, or a tour operator looking to reach more clients —
                we're here to help.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: '📍', label: 'Location', value: 'Kampala, Uganda' },
                { icon: '📧', label: 'Email', value: 'info@showmeuganda.com' },
                { icon: '📞', label: 'Phone', value: '+256 700 000 000' },
                { icon: '🕒', label: 'Hours', value: 'Mon – Fri, 8am – 6pm EAT' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-5 group">
                  <div className="w-10 h-10 rounded-full bg-[#E67E22]/10 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#E67E22] uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="text-gray-800 font-medium mt-0.5">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <p className="text-gray-400 text-sm mb-4">Follow us</p>
              <div className="flex gap-5">
                {['Instagram', 'X', 'LinkedIn', 'Facebook'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-[#E67E22] transition-colors duration-300 text-sm font-medium"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form - Enhanced Elegant */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
            <h3 className="font-bold text-gray-900 text-xl mb-6">Send a message</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22]/20 bg-white transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22]/20 bg-white transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22]/20 bg-white transition-all duration-300"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22]/20 bg-white transition-all duration-300 resize-none"
                  placeholder="Write your message here..."
                />
              </div>
              <button className="relative w-full group overflow-hidden rounded-xl bg-gradient-to-r from-[#E67E22] to-[#F39C12] text-white font-bold py-3.5 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 text-sm">
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Additional Map Section - Elegant Touch */}
        <div className="mt-20 pt-8 border-t border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
                <div className="bg-white rounded-xl h-56 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl mb-2 block">🗺️</span>
                    <p className="text-gray-500 text-sm">Kampala, Uganda — Central Business District</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-gray-900 text-lg font-semibold mb-2">Visit our office</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Located in the heart of Kampala's business district, our doors are always open.
              </p>
              <div className="flex items-center gap-2 text-[#E67E22] text-sm font-medium mt-4 group cursor-pointer">
                <span>Get directions</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}