import { signInWithPopup } from "firebase/auth";
import {auth, googleProvider} from "../../firebase"
import { GoogleIcon } from "../../icons/GoogleIcon";
import { useNavigate } from "react-router-dom";

interface GoogleLoginButtonProps {
    className?: string;
  }  

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({className = ""}) => {
    const navigate = useNavigate()
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            const user = result.user
            console.log("Google Sign-In Success:", user.displayName, user.email);
            navigate("/dashboard")
        } catch (error: any) {
            console.error("Google Sign-In Error: ", error.message);
            navigate("/signup")
        }
    }
    return (
        <button
        onClick={handleGoogleLogin}
        className={`flex items-center gap-3 bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 transition duration-200 ${className}`}
      >
        <GoogleIcon/>
        <span className="text-sm font-medium">Continue with Google</span>
      </button>
  
    )

}

export default GoogleLoginButton