import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import GoogleLoginButton from "../components/ui/GoogleLoginButton";
import { Link, useNavigate } from "react-router-dom";

export function Signup() {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;
        

        if (!username || !password) {
            setError("Username and password are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoader(true);
            setError("");
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password
            });
            navigate("/dashboard");
        } catch (error) {
            setError("Signup failed. Please try again.");
            console.error(error);
        } finally {
            setLoader(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Create an Account</h1>
                    <p className="text-gray-500 mt-1">Join us to get started</p>
                </div>
                
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}
                
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <Input 
                            ref={usernameRef} 
                            placeholder="Enter your username" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <Input 
                            ref={passwordRef} 
                            type="password"
                            placeholder="Create a password" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <Input 
                            ref={confirmPasswordRef} 
                            type="password"
                            placeholder="Confirm your password" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <Button 
                        variant="primary" 
                        text="Sign Up" 
                        fullWidth={true} 
                        loading={loader} 
                        onClick={signup} 
                        className="mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                    />
                    
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or</span>
                        </div>
                    </div>
                    
                    <GoogleLoginButton className="w-full py-2 border border-gray-300 rounded-lg flex justify-center items-center hover:bg-gray-50" />
                    
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-800">
                                Sign in
                            </Link>
                        {/* <a href="/signin" className="font-medium text-blue-600 hover:text-blue-800">
                                Sign in
                            </a> */}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}