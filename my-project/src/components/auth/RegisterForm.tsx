import React, { useState, useEffect} from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const { register, user, sendEmailVerification } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {

    if (user && user.emailVerified) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      setValidationErrors(prev => ({ ...prev, email: "Email is required" }));
      return false;
    } else if (!emailRegex.test(email)) {
      setValidationErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
      return false;
    }
    
    setValidationErrors(prev => ({ ...prev, email: undefined }));
    return true;
  };

  
  const validatePassword = (password: string): boolean => {
    if (!password) {
      setValidationErrors(prev => ({ ...prev, password: "Password is required" }));
      return false;
    } else if (password.length < 8) {
      setValidationErrors(prev => ({ ...prev, password: "Password must be at least 8 characters" }));
      return false;
    } else if (!/[A-Z]/.test(password)) {
      setValidationErrors(prev => ({ ...prev, password: "Password must contain at least one uppercase letter" }));
      return false;
    } else if (!/[a-z]/.test(password)) {
      setValidationErrors(prev => ({ ...prev, password: "Password must contain at least one lowercase letter" }));
      return false;
    } else if (!/[0-9]/.test(password)) {
      setValidationErrors(prev => ({ ...prev, password: "Password must contain at least one number" }));
      return false;
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      setValidationErrors(prev => ({ ...prev, password: "Password must contain at least one special character" }));
      return false;
    }
    
    setValidationErrors(prev => ({ ...prev, password: undefined }));
    return true;
  };

  
  const validateConfirmPassword = (confirmPass: string): boolean => {
    if (confirmPass !== password) {
      setValidationErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      return false;
    }
    
    setValidationErrors(prev => ({ ...prev, confirmPassword: undefined }));
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setValidationErrors({});

    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    try {
      const userCredential = await register(email, password);
      
      
      if (userCredential?.user) {
        await sendEmailVerification(userCredential.user);
        
        setVerificationSent(true);
      }
      
      
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError("Email is already in use. Please try another one.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Invalid email format.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password is too weak. Please choose a stronger password.");
      } else {
        setError("Failed to create an account. Please try again.");
      }
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Start tracking your productivity with TaskMaster
          </p>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {verificationSent && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">
              Verification email sent! Please check your inbox and verify your email address, then proceed to Log in.
            </span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-t-md relative block w-full px-3 py-2 border ${
                  validationErrors.email ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateEmail(email)}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
              )}
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  validationErrors.password ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validatePassword(password)}
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
              {validationErrors.password && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type={showConPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className={`appearance-none rounded-b-md relative block w-full px-3 py-2 border ${
                  validationErrors.confirmPassword ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => validateConfirmPassword(confirmPassword)}
              />
              <button
                type="button"
                onClick={() => setShowConPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConPassword ? (
                  <EyeOffIcon size={18} />
                ) : (
                  <EyeIcon size={18} />
                )}
              </button>
              {validationErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="text-xs text-gray-600 mt-2">
            <p>Password must contain:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>At least 8 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one lowercase letter</li>
              <li>At least one number</li>
              <li>At least one special character</li>
            </ul>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Account
            </button>
          </div>

          <div className="text-sm text-center">
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};