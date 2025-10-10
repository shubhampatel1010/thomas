import { Target, Eye, Award, Users, Globe, TrendingUp, Heart, Shield, Zap, Star, Briefcase } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';

export default function AboutPage() {
  useScrollReveal();
  const { count: employersCount, elementRef: employersRef } = useCountUp(5000);
  const { count: candidatesCount, elementRef: candidatesRef } = useCountUp(15000);
  const { count: placementsCount, elementRef: placementsRef } = useCountUp(10000);
  const { count: countriesCount, elementRef: countriesRef } = useCountUp(25);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Team collaboration"
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
              <Star className="w-4 h-4" />
              About HireHub
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 animate-slide-up leading-tight drop-shadow-2xl">
            Revolutionizing the
            <span className="block mt-3 bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-300 bg-clip-text text-transparent">
              Future of Hiring
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-white max-w-4xl mx-auto animate-slide-up leading-relaxed drop-shadow-lg" style={{ animationDelay: '0.1s' }}>
            We're transforming how employers and domestic workers connect, making hiring seamless, secure, and efficient.
          </p>
        </div>
      </section>

      <section className="py-28 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal-fade-up">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4">
              WHO WE ARE
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
              Our Core Principles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The values that drive everything we do
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-10 h-10" />,
                gradient: 'from-blue-500 to-cyan-500',
                bgGradient: 'from-blue-50 to-cyan-50',
                title: 'Our Mission',
                description: 'To create a trusted platform that bridges the gap between households seeking quality domestic services and skilled professionals looking for meaningful employment opportunities.',
              },
              {
                icon: <Eye className="w-10 h-10" />,
                gradient: 'from-emerald-500 to-teal-500',
                bgGradient: 'from-emerald-50 to-teal-50',
                title: 'Our Vision',
                description: 'To become the leading global platform for domestic worker recruitment, setting new standards for transparency, fairness, and efficiency in the industry.',
              },
              {
                icon: <Award className="w-10 h-10" />,
                gradient: 'from-teal-500 to-emerald-500',
                bgGradient: 'from-teal-50 to-emerald-50',
                title: 'Our Values',
                description: 'Integrity, respect, and excellence guide everything we do. We\'re committed to creating positive outcomes for both employers and candidates.',
              }
            ].map((item, index) => (
              <div
                key={index}
                className="scroll-reveal-pop group relative"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-full p-10 bg-white rounded-3xl border-2 border-gray-100 hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                  <div className="relative">
                    <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
                  </div>

                  <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${item.gradient} rounded-full opacity-20 group-hover:opacity-30 blur-2xl transition-opacity duration-500`}></div>
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
            <div className="scroll-reveal-left relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-3xl blur-2xl opacity-30"></div>
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Our story"
                    className="rounded-3xl shadow-2xl w-full object-cover h-[500px] transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent rounded-3xl"></div>
                </div>
              </div>
            </div>

            <div className="scroll-reveal-right">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full text-sm font-bold mb-6 shadow-lg">
                OUR JOURNEY
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  HireHub was founded with a simple yet powerful idea: to transform the way domestic workers and employers connect. We recognized that traditional hiring methods were often inefficient, lacked transparency, and didn't serve either party well.
                </p>
                <p>
                  Our platform leverages modern technology to create a seamless hiring experience. From intelligent matching algorithms that pair candidates with the right opportunities to integrated payment systems that ensure secure transactions, every feature is designed with both employers and workers in mind.
                </p>
                <p>
                  Today, HireHub serves thousands of employers and candidates across multiple countries, facilitating thousands of successful placements. We continue to innovate and improve, always keeping our core mission at heart: creating better opportunities and outcomes for everyone in the domestic services industry.
                </p>
              </div>
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
              By the Numbers
            </h2>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
              Our impact speaks for itself
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
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

      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 scroll-reveal-fade-up">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4">
              WHY CHOOSE US
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
              What Sets Us Apart
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Committed to excellence in every aspect
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                gradient: 'from-blue-500 to-cyan-500',
                title: 'Trust & Safety',
                description: 'Comprehensive background checks and verification processes for all candidates.',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                gradient: 'from-purple-500 to-pink-500',
                title: 'Speed & Efficiency',
                description: 'AI-powered matching gets you results in days, not weeks.',
              },
              {
                icon: <Heart className="w-8 h-8" />,
                gradient: 'from-emerald-500 to-teal-500',
                title: 'Personal Touch',
                description: 'Dedicated support team available to assist you every step of the way.',
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                gradient: 'from-orange-500 to-red-500',
                title: 'Proven Results',
                description: '98% satisfaction rate from both employers and candidates.',
              },
              {
                icon: <Globe className="w-8 h-8" />,
                gradient: 'from-cyan-500 to-teal-500',
                title: 'Global Reach',
                description: 'Operating in 25+ countries with plans for continued expansion.',
              },
              {
                icon: <Award className="w-8 h-8" />,
                gradient: 'from-blue-500 to-cyan-500',
                title: 'Industry Leader',
                description: 'Recognized as the premier platform for domestic worker recruitment.',
              }
            ].map((item, index) => (
              <div
                key={index}
                className="scroll-reveal-bounce group"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className="relative h-full p-8 bg-white rounded-2xl border-2 border-gray-100 hover:border-transparent shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
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
