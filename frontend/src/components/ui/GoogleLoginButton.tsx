import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GoogleIcon } from "../../icons/GoogleIcon";

interface GoogleLoginButtonProps {
  className?: string;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  console.log("hi")

  const handleLogin = () => {
    signInWithRedirect(auth, googleProvider);
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Google Redirect Login Success:", result.user.displayName, result.user.email);
          navigate("/dashboard");
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
      className={`flex items-center gap-3 bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 transition duration-200 ${className}`}
    >
      <GoogleIcon />
      <span className="text-sm font-medium">Continue with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
