export default function Contact() {
  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
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

      <div className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-gray-900">Let's talk</h2>
            <p className="text-gray-500 leading-relaxed">
              Whether you're a traveler planning your Uganda adventure, a hotel owner
              wanting to get listed, or a tour operator looking to reach more clients —
              we're here to help.
            </p>

            <div className="space-y-5">
              {[
                { icon: '📍', label: 'Location',  value: 'Kampala, Uganda' },
                { icon: '📧', label: 'Email',     value: 'info@showmeuganda.com' },
                { icon: '📞', label: 'Phone',     value: '+256 700 000 000' },
                { icon: '🕒', label: 'Hours',     value: 'Mon – Fri, 8am – 6pm EAT' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="text-gray-800 font-medium mt-0.5">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 text-lg mb-5">Send a message</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 bg-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 bg-white"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 bg-white"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 bg-white"
                  placeholder="Write your message here..."
                />
              </div>
              <button className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors text-sm">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}