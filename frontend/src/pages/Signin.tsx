// import { useRef, useState } from "react";
// import { Button } from "../components/ui/Button";
// import { Input } from "../components/ui/Input";
// import { BACKEND_URL } from "../config";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import GoogleLoginButton from "../components/ui/GoogleLoginButton";

// export function Signin() {
//     const [loader, setLoader] = useState(false);
//     const usernameRef = useRef<HTMLInputElement>(null);
//     const passwordRef = useRef<HTMLInputElement>(null);
//     const navigate = useNavigate()

//     interface SignInResponse {
//         token: string
//     }

//     async function signin() {
//         const username = usernameRef.current?.value;
//         const password = passwordRef.current?.value;

//         if (!username || !password) {
//             alert("Username and password are required");
//             return;
//         }

//         try {
//             setLoader(true);
//             const response = await axios.post<SignInResponse>(`${BACKEND_URL}/api/v1/signin`, {
//                 username,
//                 password
//             });
//             const jwt = response.data.token
//             localStorage.setItem("token", jwt)
//             alert("You have successfully signed up");
//             navigate("/dashboard")
//         } catch (error) {
//             alert("Signup failed, please try again.");
//             console.error(error);
//             navigate("/signup")
//         } finally {
//             setLoader(false);
//         }
//     }

//     return (
//         <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
//             <div className="bg-white rounded-xl border min-w-48 p-8">
//                 <Input ref={usernameRef} placeholder="Username" />
//                 <Input ref={passwordRef} placeholder="Password" />
//                 <div className="flex flex-col justify-center pt-4">
//                     <Button 
//                         variant="primary" 
//                         text="Signin" 
//                         fullWidth={true} 
//                         loading={loader} 
//                         onClick={signin} 
//                     />
//                     <br/>
//                     <GoogleLoginButton/>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/ui/GoogleLoginButton";

export function Signin() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  interface SignInResponse {
    token: string;
  }

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      setLoader(true);
      setError("");
      const response = await axios.post<SignInResponse>(
        `${BACKEND_URL}/api/v1/signin`,
        {
          username,
          password,
        }
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid username or password. Please try again.");
      console.error(error);
    } finally {
      setLoader(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <Input
              ref={usernameRef}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
            </div>
            <Input
              ref={passwordRef}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2"
            />
          </div>

          <Button
            variant="primary"
            text="Sign In"
            fullWidth={true}
            loading={loader}
            onClick={signin}
            className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
          />

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <GoogleLoginButton className="w-full py-2.5 border border-gray-300 rounded-lg flex justify-center items-center space-x-2 hover:bg-gray-50 transition duration-150" />

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-blue-600 hover:text-blue-800"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}