import { User, Briefcase, LogOut, Settings } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  currentUser: UserType | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  onLoginClick?: (role: 'candidate' | 'employer') => void;
  currentPage?: string;
}

export default function Navbar({ currentUser, onLogout, onNavigate, onLoginClick, currentPage }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {/* <Briefcase className="w-8 h-8 text-blue-600" /> */}
              <img src="/logo_2.png" alt="Job Portal Logo" className="w-12 h-12" />
              <span style={{color:'#0d7ad2'}}>MingHwee</span>
            </button>
            {!currentUser && (
              <div className="ml-10 flex items-center gap-6">
                <button
                  onClick={() => onNavigate('home')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'home' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'about' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'contact' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Contact
                </button>
              </div>
            )}
            {currentUser?.role === 'employer' && (
              <div className="ml-10 flex items-center gap-6">
                <button
                  onClick={() => onNavigate('employer-dashboard')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'employer-dashboard' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => onNavigate('employer-jobs')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'employer-jobs' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Job Postings
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                <button
                  onClick={() => onNavigate(currentUser.role === 'employer' ? 'employer-profile' : 'candidate-profile')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Edit Profile
                </button>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{currentUser.email}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onLoginClick?.('candidate')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login as Candidate
                </button>
                <button
                  onClick={() => onLoginClick?.('employer')}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login as Employer
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
