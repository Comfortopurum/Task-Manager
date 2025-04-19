import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailVerificationNeeded, setEmailVerificationNeeded] = useState(false);
  const { login, user, sendEmailVerification } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user && user.emailVerified) {
      navigate("/dashboard");
    } else if (user && !user.emailVerified) {
      
      setEmailVerificationNeeded(true);
      setError("Please verify your email address before continuing.");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailVerificationNeeded(false);

    try {
      const userCredential = await login(email, password);
      
      // Check if email is verified
      if (userCredential?.user && !userCredential.user.emailVerified) {
        setEmailVerificationNeeded(true);
        setError("Please verify your email address before continuing.");
      }
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'invalid') {
        setError("Failed to log in.  Please try again.");
      } else {
        setError("Failed to log in. Incorrect email address or password.");
      }
    }
  };

  const handleResendVerification = async () => {
    if (!user) return;
    
    try {
      await sendEmailVerification(user);
      setError("Verification email sent. Please check your inbox.");
    } catch (err) {
      setError("Failed to send verification email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in to TaskMaster
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Track your productivity with ease
          </p>
        </div>

        {error && (
          <div
            className={`${emailVerificationNeeded ? "bg-yellow-100 border-yellow-400 text-yellow-700" : "bg-red-100 border-red-400 text-red-700"} px-4 py-3 border rounded relative`}
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
            
            {emailVerificationNeeded && (
              <button
                onClick={handleResendVerification}
                className="mt-2 inline-flex w-full justify-center rounded-md bg-yellow-50 px-3 py-2 text-sm font-semibold text-yellow-800 shadow-sm hover:bg-yellow-100 sm:w-auto"
              >
                Resend Verification Email
              </button>
            )}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOffIcon size={18} />
                ) : (
                  <EyeIcon size={18} />
                )}
              </button>
            </div>
          </div>

          
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </div>
          <div className="text-sm text-center">
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};