import { useEffect, useState } from 'react';
import { Briefcase, Users, TrendingUp, Shield, Mail, Phone, Zap, Award, Target, ArrowRight, CheckCircle, Sparkles, Star, Globe, Quote } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import Carousel from '../components/Carousel';

export default function HomePage() {
  useScrollReveal();
  const { count: employersCount, elementRef: employersRef } = useCountUp(5000);
  const { count: candidatesCount, elementRef: candidatesRef } = useCountUp(15000);
  const { count: placementsCount, elementRef: placementsRef } = useCountUp(10000);
  const { count: countriesCount, elementRef: countriesRef } = useCountUp(25);

  const [currentBgImage, setCurrentBgImage] = useState(0);
  const heroImages = [
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=1920'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.5');
        const yPos = -(scrolled * speed);
        (el as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
                index === currentBgImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Hero background ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/80 to-teal-900/85"></div>
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-cyan-600/15 to-teal-600/20"></div>

          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="text-center">
            <div className="inline-block mb-6 animate-slide-down">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full text-sm font-semibold shadow-lg">
                <Sparkles className="w-4 h-4" />
                The Future of Hiring is Here
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 animate-slide-up leading-tight drop-shadow-2xl">
              Connect Employers with
              <span className="block mt-3 bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-300 bg-clip-text text-transparent">
                Exceptional Talent
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-white mb-10 max-w-4xl mx-auto animate-slide-up leading-relaxed drop-shadow-lg" style={{ animationDelay: '0.1s' }}>
              The premier AI-powered platform revolutionizing domestic worker recruitment.
              <span className="block mt-2 text-lg text-blue-100">Experience seamless hiring with intelligent matching and automated workflows.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up mb-10" style={{ animationDelay: '0.2s' }}>
              
              
            </div>

            
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="w-8 h-12 border-3 border-white/80 rounded-full flex justify-center p-2 backdrop-blur-sm bg-white/10">
            <div className="w-2 h-4 bg-gradient-to-b from-white to-blue-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal-fade-up">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4">
              FEATURES
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
              Why Choose HireHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the next generation of hiring with powerful features designed for success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Briefcase className="w-10 h-10" />,
                gradient: 'from-blue-500 to-cyan-500',
                bgGradient: 'from-blue-50 to-cyan-50',
                title: 'Premium Jobs',
                description: 'Access verified, high-quality job postings from reputable employers across various domestic services.',
              },
              {
                icon: <Users className="w-10 h-10" />,
                gradient: 'from-emerald-500 to-teal-500',
                bgGradient: 'from-emerald-50 to-teal-50',
                title: 'Elite Candidates',
                description: 'Connect with experienced, background-checked professionals ready to excel in your household.',
              },
              {
                icon: <TrendingUp className="w-10 h-10" />,
                gradient: 'from-teal-500 to-emerald-500',
                bgGradient: 'from-teal-50 to-emerald-50',
                title: 'AI Matching',
                description: 'Advanced algorithm matches candidates with jobs based on skills, experience, and cultural fit.',
              },
              {
                icon: <Shield className="w-10 h-10" />,
                gradient: 'from-orange-500 to-red-500',
                bgGradient: 'from-orange-50 to-red-50',
                title: 'Bank-Level Security',
                description: 'Enterprise-grade encryption with integrated payments, offers, and contract management.',
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="scroll-reveal-pop group relative"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-full p-8 bg-white rounded-3xl border-2 border-gray-100 hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                  <div className="relative">
                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>

                  <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${feature.gradient} rounded-full opacity-20 group-hover:opacity-30 blur-2xl transition-opacity duration-500`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-100 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-100 to-transparent opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal-left">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full text-sm font-bold mb-6 shadow-lg">
                FOR EMPLOYERS
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Find Your Perfect
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Candidate in Minutes
                </span>
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Post your job openings and discover exceptional candidates for your household. Our intelligent platform streamlines the entire hiring journey from posting to payment.
              </p>
              <ul className="space-y-5 mb-10">
                {[
                  { text: 'Post unlimited job openings', icon: <Zap className="w-5 h-5" /> },
                  { text: 'View AI-matched candidates with scores', icon: <Target className="w-5 h-5" /> },
                  { text: 'Schedule interviews seamlessly', icon: <CheckCircle className="w-5 h-5" /> },
                  { text: 'Integrated offer and payment system', icon: <Shield className="w-5 h-5" /> }
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {item.icon}
                    </div>
                    <span className="text-gray-700 text-lg font-medium pt-2">{item.text}</span>
                  </li>
                ))}
              </ul>
              <button className="group px-10 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-teal-500/50 transition-all duration-300 flex items-center gap-3 hover:scale-105">
                Start Hiring Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            <div className="scroll-reveal-right relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Professional hiring process"
                    className="rounded-3xl shadow-2xl w-full object-cover h-[500px] transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent rounded-3xl"></div>
                  <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <Briefcase className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="h-3 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-2 bg-gray-100 rounded w-24"></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl flex-1"></div>
                      <div className="h-10 bg-gray-100 rounded-xl w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-emerald-100 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-teal-100 to-transparent opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal-left relative order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Job opportunities"
                    className="rounded-3xl shadow-2xl w-full object-cover h-[500px] transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent rounded-3xl"></div>
                  <div className="absolute top-8 left-8 right-8 bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
                    <div className="flex items-center gap-4">
                      <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100" className="w-14 h-14 rounded-full object-cover" alt="Candidate" />
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-2 bg-gray-100 rounded w-40"></div>
                      </div>
                      <div className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-xs font-bold">
                        95% Match
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-reveal-right order-1 lg:order-2">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full text-sm font-bold mb-6 shadow-lg">
                FOR CANDIDATES
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Discover Your
                <span className="block mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Dream Career Today
                </span>
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Create your professional profile and get matched with relevant job opportunities. Track your applications and manage offers seamlessly in one intuitive platform.
              </p>
              <ul className="space-y-5 mb-10">
                {[
                  { text: 'Build comprehensive professional profile', icon: <Users className="w-5 h-5" /> },
                  { text: 'Get AI-matched with relevant jobs', icon: <Target className="w-5 h-5" /> },
                  { text: 'Receive and manage job offers', icon: <Award className="w-5 h-5" /> },
                  { text: 'Real-time application tracking', icon: <TrendingUp className="w-5 h-5" /> }
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {item.icon}
                    </div>
                    <span className="text-gray-700 text-lg font-medium pt-2">{item.text}</span>
                  </li>
                ))}
              </ul>
              <button className="group px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 flex items-center gap-3 hover:scale-105">
                Find Jobs Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-blue-700 to-teal-700"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoNnYtNmgtNnYtek0zMCAzMGg2di02aC02djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 scroll-reveal-fade-up">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Trusted by Thousands Worldwide
            </h2>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
              Join the community of successful employers and candidates who've transformed their hiring experience
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="scroll-reveal-zoom text-center group" style={{ transitionDelay: '0s' }}>
              <div className="relative p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                  <Briefcase className="w-10 h-10" />
                </div>
                <div ref={employersRef} className="text-5xl font-extrabold text-white mb-3">{employersCount.toLocaleString()}+</div>
                <div className="text-cyan-100 font-medium text-lg">Active Employers</div>
              </div>
            </div>
            <div className="scroll-reveal-zoom text-center group" style={{ transitionDelay: '0.1s' }}>
              <div className="relative p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                  <Users className="w-10 h-10" />
                </div>
                <div ref={candidatesRef} className="text-5xl font-extrabold text-white mb-3">{candidatesCount.toLocaleString()}+</div>
                <div className="text-purple-100 font-medium text-lg">Registered Candidates</div>
              </div>
            </div>
            <div className="scroll-reveal-zoom text-center group" style={{ transitionDelay: '0.2s' }}>
              <div className="relative p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                  <Award className="w-10 h-10" />
                </div>
                <div ref={placementsRef} className="text-5xl font-extrabold text-white mb-3">{placementsCount.toLocaleString()}+</div>
                <div className="text-purple-100 font-medium text-lg">Successful Placements</div>
              </div>
            </div>
            <div className="scroll-reveal-zoom text-center group" style={{ transitionDelay: '0.3s' }}>
              <div className="relative p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                  <Globe className="w-10 h-10" />
                </div>
                <div ref={countriesRef} className="text-5xl font-extrabold text-white mb-3">{countriesCount}+</div>
                <div className="text-purple-100 font-medium text-lg">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      <section className="py-28 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 scroll-reveal">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4">
              SUCCESS STORIES
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
              Real People, Real Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              See how HireHub has transformed lives and businesses
            </p>
          </div>

          <Carousel
            className="max-w-6xl mx-auto h-[600px]"
            autoPlay={true}
            interval={5000}
            items={[
              <div key="story-1" className="h-full px-4">
                <div className="grid md:grid-cols-2 gap-8 h-full items-center">
                  <div className="relative h-full">
                    <img
                      src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      alt="Professional team"
                      className="w-full h-full object-cover rounded-3xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
                  </div>
                  <div className="space-y-6">
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-bold">
                      Employer Success
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-900">
                      From 3 Weeks to 2 Days
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      "We used to spend weeks interviewing candidates. With HireHub's AI matching, we found our ideal personal assistant in just 2 days. The quality of candidates exceeded our expectations."
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src="https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="Client"
                        className="w-16 h-16 rounded-full object-cover border-3 border-blue-500"
                      />
                      <div>
                        <p className="font-bold text-gray-900">David Thompson</p>
                        <p className="text-gray-600">Business Executive, NYC</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>,
              <div key="story-2" className="h-full px-4">
                <div className="grid md:grid-cols-2 gap-8 h-full items-center">
                  <div className="relative h-full">
                    <img
                      src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      alt="Happy candidate"
                      className="w-full h-full object-cover rounded-3xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
                  </div>
                  <div className="space-y-6">
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-bold">
                      Candidate Success
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-900">
                      Dream Job Found
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      "After years of searching, HireHub matched me with a wonderful family that appreciates my skills. The process was professional, transparent, and I felt valued every step of the way."
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="Candidate"
                        className="w-16 h-16 rounded-full object-cover border-3 border-emerald-500"
                      />
                      <div>
                        <p className="font-bold text-gray-900">Maria Santos</p>
                        <p className="text-gray-600">Senior Housekeeper</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>,
              <div key="story-3" className="h-full px-4">
                <div className="grid md:grid-cols-2 gap-8 h-full items-center">
                  <div className="relative h-full">
                    <img
                      src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      alt="Professional meeting"
                      className="w-full h-full object-cover rounded-3xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
                  </div>
                  <div className="space-y-6">
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full text-sm font-bold">
                      Perfect Match
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-900">
                      Building Long-term Relationships
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      "HireHub didn't just help us find staff - they helped us build lasting relationships with exceptional professionals. The platform's vetting process ensures quality every time."
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="Client"
                        className="w-16 h-16 rounded-full object-cover border-3 border-teal-500"
                      />
                      <div>
                        <p className="font-bold text-gray-900">Robert & Lisa Martinez</p>
                        <p className="text-gray-600">Family, Los Angeles</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ]}
          />
        </div>
      </section>


      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDMwaDZ2LTZoLTZ2NnpNMzAgMzBoNnYtNmgtNnY2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">HireHub</span>
              </div>
              <p className="text-gray-400 mb-8 max-w-md text-lg leading-relaxed">
                Revolutionizing the domestic services industry with AI-powered matching and seamless hiring workflows.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((social) => (
                  <button
                    key={social}
                    className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Company</h3>
              <ul className="space-y-4 text-gray-400">
                {['About Us', 'Careers', 'Press', 'Blog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors text-lg hover:translate-x-2 inline-block duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Contact</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  info@MingHwee.com
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  +1 (555) 123-4567
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700/50 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-lg">
              &copy; 2025 MingHwee. Crafted with passion for excellence.
            </p>
            <div className="flex gap-8 text-gray-400">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a key={link} href="#" className="hover:text-white transition-colors text-lg hover:underline">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
