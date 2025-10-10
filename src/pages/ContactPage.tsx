import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Star, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ContactPageProps {
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function ContactPage({ onShowToast }: ContactPageProps) {
  useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('Thank you for your message! We will get back to you soon.', 'success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Contact us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/80 to-teal-900/85"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-block mb-6 animate-slide-down">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full text-sm font-semibold shadow-lg">
              <Sparkles className="w-4 h-4" />
              Get In Touch
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 animate-slide-up leading-tight drop-shadow-2xl">
            Let's Start a
            <span className="block mt-3 bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-300 bg-clip-text text-transparent">
              Conversation
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-white max-w-4xl mx-auto animate-slide-up leading-relaxed drop-shadow-lg" style={{ animationDelay: '0.1s' }}>
            Have a question or need assistance? Our dedicated team is here to help you succeed.
          </p>
        </div>
      </section>

      <section className="py-28 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal-fade-up">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4">
              REACH OUT
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
              Contact Information
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Multiple ways to connect with us
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <Mail className="w-10 h-10" />,
                gradient: 'from-blue-500 to-cyan-500',
                bgGradient: 'from-blue-50 to-cyan-50',
                title: 'Email Us',
                info: ['info@hirehub.com', 'support@hirehub.com'],
              },
              {
                icon: <Phone className="w-10 h-10" />,
                gradient: 'from-emerald-500 to-teal-500',
                bgGradient: 'from-emerald-50 to-teal-50',
                title: 'Call Us',
                info: ['+1 (555) 123-4567', 'Mon-Fri, 9am-6pm EST'],
              },
              {
                icon: <MapPin className="w-10 h-10" />,
                gradient: 'from-teal-500 to-emerald-500',
                bgGradient: 'from-teal-50 to-emerald-50',
                title: 'Visit Us',
                info: ['123 Business Street', 'New York, NY 10001'],
              }
            ].map((item, index) => (
              <div
                key={index}
                className="scroll-reveal-pop group relative"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-full p-10 bg-white rounded-3xl border-2 border-gray-100 hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 text-center">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                  <div className="relative">
                    <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 text-white shadow-xl mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    {item.info.map((line, i) => (
                      <p key={i} className="text-gray-600 text-lg leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>

                  <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${item.gradient} rounded-full opacity-20 group-hover:opacity-30 blur-2xl transition-opacity duration-500`}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="scroll-reveal-scale">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-3xl blur-2xl opacity-20"></div>
                <div className="relative bg-white rounded-3xl p-10 shadow-2xl border-2 border-gray-100">
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4 shadow-xl">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Send us a Message</h2>
                    <p className="text-gray-600 text-lg">We'll respond within 24 hours</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 outline-none transition-all text-gray-900 text-lg"
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 outline-none transition-all text-gray-900 text-lg"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-bold text-gray-900 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 outline-none transition-all text-gray-900 text-lg"
                        placeholder="How can we help?"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 outline-none transition-all resize-none text-gray-900 text-lg"
                        placeholder="Tell us more about your inquiry..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="group w-full px-8 py-5 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-teal-500/50 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105"
                    >
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-100 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-100 to-transparent opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 scroll-reveal-fade-up">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4">
              WHY CONTACT US
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
              We're Here to Help
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our support team is dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-8 h-8" />,
                gradient: 'from-blue-500 to-cyan-500',
                title: 'Fast Response',
                description: '24-hour response time guaranteed for all inquiries.',
              },
              {
                icon: <Star className="w-8 h-8" />,
                gradient: 'from-cyan-500 to-teal-500',
                title: 'Expert Support',
                description: 'Knowledgeable team ready to answer all your questions.',
              },
              {
                icon: <MessageCircle className="w-8 h-8" />,
                gradient: 'from-emerald-500 to-teal-500',
                title: 'Always Available',
                description: 'Multiple contact methods to suit your preferences.',
              }
            ].map((item, index) => (
              <div
                key={index}
                className="scroll-reveal-bounce group"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-full p-8 bg-white rounded-2xl border-2 border-gray-100 hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-4 text-white shadow-xl mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
