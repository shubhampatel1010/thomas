import { useEffect, useState } from 'react';
import { User } from './types';
import { storage } from './utils/storage';
import { initializeData } from './utils/initializeData';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import LoginModal from './components/LoginModal';
import CompanySetupModal from './components/CompanySetupModal';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import EmployerDashboard from './pages/EmployerDashboard';
import AddJobPage from './pages/AddJobPage';
import JobDetailPage from './pages/JobDetailPage';
import CandidateProfileSetup from './pages/CandidateProfileSetup';
import CandidateDashboard from './pages/CandidateDashboard';
import CandidateJobDetail from './pages/CandidateJobDetail';
import EmployerProfileEdit from './pages/EmployerProfileEdit';
import CandidateProfileEdit from './pages/CandidateProfileEdit';

type ToastType = {
  message: string;
  type: 'success' | 'error' | 'info';
} | null;

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginRole, setLoginRole] = useState<'candidate' | 'employer'>('candidate');
  const [showCompanySetup, setShowCompanySetup] = useState(false);
  const [toast, setToast] = useState<ToastType>(null);

  useEffect(() => {
    initializeData();
    const user = storage.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      if (user.role === 'employer') {
        if (user.profileComplete) {
          setCurrentPage('employer-dashboard');
        } else {
          setShowCompanySetup(true);
        }
      } else {
        if (user.profileComplete) {
          setCurrentPage('candidate-dashboard');
        } else {
          setCurrentPage('candidate-profile-setup');
        }
      }
    }
  }, []);

  const handleLoginClick = (role: 'candidate' | 'employer') => {
    setLoginRole(role);
    setShowLoginModal(true);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'employer') {
      if (user.profileComplete) {
        setCurrentPage('employer-dashboard');
      } else {
        setShowCompanySetup(true);
      }
    } else {
      if (user.profileComplete) {
        setCurrentPage('candidate-dashboard');
      } else {
        setCurrentPage('candidate-profile-setup');
      }
    }
  };

  const handleLogout = () => {
    storage.setCurrentUser(null);
    setCurrentUser(null);
    setCurrentPage('home');
    showToast('Logged out successfully', 'success');
  };

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page);
    setPageData(data);
  };

  const handleCompanySetupComplete = () => {
    setShowCompanySetup(false);
    const user = storage.getCurrentUser();
    if (user) {
      setCurrentUser({ ...user, profileComplete: true });
    }
    setCurrentPage('employer-dashboard');
  };

  const handleCandidateProfileComplete = () => {
    const user = storage.getCurrentUser();
    if (user) {
      setCurrentUser({ ...user, profileComplete: true });
    }
    setCurrentPage('candidate-dashboard');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  const renderPage = () => {
    if (!currentUser) {
      switch (currentPage) {
        case 'about':
          return <AboutPage />;
        case 'contact':
          return <ContactPage onShowToast={showToast} />;
        default:
          return <HomePage />;
      }
    }

    if (currentUser.role === 'employer') {
      switch (currentPage) {
        case 'add-job':
          return (
            <AddJobPage
              userId={currentUser.id}
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          );
        case 'job-detail':
          return (
            <JobDetailPage
              jobId={pageData?.jobId}
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          );
        case 'employer-profile':
          return (
            <EmployerProfileEdit
              userId={currentUser.id}
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          );
        case 'employer-jobs':
        case 'employer-settings':
        case 'employer-dashboard':
        default:
          return (
            <EmployerDashboard
              userId={currentUser.id}
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          );
      }
    }

    if (currentUser.role === 'candidate') {
      if (!currentUser.profileComplete) {
        return (
          <CandidateProfileSetup
            userId={currentUser.id}
            email={currentUser.email}
            onComplete={handleCandidateProfileComplete}
            onShowToast={showToast}
          />
        );
      }

      switch (currentPage) {
        case 'candidate-job-detail':
          return (
            <CandidateJobDetail
              jobId={pageData?.jobId}
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          );
        case 'candidate-profile':
          return (
            <CandidateProfileEdit
              userId={currentUser.id}
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          );
        case 'candidate-dashboard':
        default:
          return (
            <CandidateDashboard
              userId={currentUser.id}
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          );
      }
    }

    return <HomePage />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        onLoginClick={handleLoginClick}
        currentPage={currentPage}
      />
      {renderPage()}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        role={loginRole}
        onLoginSuccess={handleLoginSuccess}
        onShowToast={showToast}
      />

      {showCompanySetup && currentUser && (
        <CompanySetupModal
          isOpen={showCompanySetup}
          userId={currentUser.id}
          onComplete={handleCompanySetupComplete}
          onShowToast={showToast}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
