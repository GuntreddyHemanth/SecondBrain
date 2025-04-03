import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const [loader, setLoader] = useState(false);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()

    interface SignInResponse {
        token: string
    }

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !password) {
            alert("Username and password are required");
            return;
        }

        try {
            setLoader(true);
            const response = await axios.post<SignInResponse>(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password
            });
            const jwt = response.data.token
            localStorage.setItem("token", jwt)
            alert("You have successfully signed up");
            navigate("/dashboard")
        } catch (error) {
            alert("Signup failed, please try again.");
            console.error(error);
        } finally {
            setLoader(false);
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input ref={usernameRef} placeholder="Username" />
                <Input ref={passwordRef} placeholder="Password" />
                <div className="flex justify-center pt-4">
                    <Button 
                        variant="primary" 
                        text="Signin" 
                        fullWidth={true} 
                        loading={loader} 
                        onClick={signin} 
                    />
                </div>
            </div>
        </div>
    );
}
