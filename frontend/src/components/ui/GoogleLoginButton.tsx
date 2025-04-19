import { getRedirectResult, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoogleIcon } from "../../icons/GoogleIcon";
import axios from "axios"; // Make sure axios is installed
import { BACKEND_URL } from "../../config";

interface GoogleLoginButtonProps {
  className?: string;
}

// Define the response type
interface AuthResponse {
  token: string;
  message?: string;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGoogleAuth = async (user: any) => {
    try {
      setIsLoading(true);
      
      // Send the user information to your backend with typed response
      const response = await axios.post<AuthResponse>(`${BACKEND_URL}/api/v1/google-signin`, { 
        email: user.email,
        displayName: user.displayName || user.email?.split('@')[0] || 'User'
      });
      
      // Now TypeScript knows response.data has a token property
      localStorage.setItem("token", response.data.token);
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Backend authentication failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogin = () => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log("Popup Login Success:", result.user.email);
        handleGoogleAuth(result.user);
      })
      .catch((error) => {
        console.error("Popup Login Error:", error.message);
        setIsLoading(false);
      });
  };
  
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Google Redirect Login Success:", result.user.displayName, result.user.email);
          handleGoogleAuth(result.user);
        }
      })
      .catch((error) => {
        console.error("Google Redirect Sign-In Error:", error.message);
        navigate("/signup");
      });
  }, []);
  
  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className={`flex items-center gap-3 bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
    >
      <GoogleIcon />
      <span className="text-sm font-medium">
        {isLoading ? "Connecting..." : "Continue with Google"}
      </span>
    </button>
  );
};

export default GoogleLoginButton;