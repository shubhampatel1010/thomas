import { useState } from "react";
import Modal from "./Modal";
import { storage } from "../utils/storage";
import { User } from "../types";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: "candidate" | "employer";
  onLoginSuccess: (user: User) => void;
  onShowToast: (message: string, type: "success" | "error" | "info") => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  role,
  onLoginSuccess,
  onShowToast,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      onShowToast(
        "OTP sent to your email! (Demo: use any 6-digit code)",
        "success"
      );
    }, 1000);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (otp.length === 6) {
        const users = storage.getUsers();
        let user = users.find((u) => u.email === email && u.role === role);

        if (!user) {
          user = {
            id: `${role}-${Date.now()}`,
            email,
            role,
            profileComplete: false,
          };
          storage.setUsers([...users, user]);
        }

        storage.setCurrentUser(user);
        onLoginSuccess(user);
        onShowToast(
          `Login successful! Welcome ${
            role === "employer" ? "Employer" : "Candidate"
          }`,
          "success"
        );
        handleClose();
      } else {
        onShowToast("Invalid OTP. Please try again.", "error");
      }
      setLoading(false);
    }, 1000);
  };

  const handleClose = () => {
    setEmail("");
    setOtp("");
    setOtpSent(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Login as ${role === "employer" ? "Employer" : "Candidate"}`}
    >
      {role === "employer" ? (
        <div className="space-y-6">
          {/* Singpass Login Option */}
          <button
            onClick={() => {
              // Simulate Singpass login (demo)
              const users = storage.getUsers();
              let user = users.find(
                (u) =>
                  u.role === "employer" && u.email === "singpass@employer.sg"
              );

              if (!user) {
                user = {
                  id: `employer-${Date.now()}`,
                  email: "singpass@employer.sg",
                  role: "employer",
                  profileComplete: true,
                };
                storage.setUsers([...users, user]);
              }

              storage.setCurrentUser(user);
              onLoginSuccess(user);
              onShowToast("Singpass Login Successful!", "success");
              handleClose();
            }}
            className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Login with Singpass
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Email OTP Form */}
          {!otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
                <p className="mt-2 text-sm text-gray-500">
                  Demo mode: Enter any 6-digit code
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        // Candidate login (email OTP only)
        <>
          {!otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
                <p className="mt-2 text-sm text-gray-500">
                  Demo mode: Enter any 6-digit code
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </Modal>
  );
}
