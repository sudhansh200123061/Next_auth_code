"use client";
import axios from "axios";
import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";


export default function ForgetPasswordPage() {

    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
        setError("");
        setSuccess("");
    }, []);

    useEffect(() => {
        setError("");
        setSuccess("");
    }, [password, confirmPassword]);

    const onSubmit = async() => {
        if(password !== confirmPassword){
            setError("Passwords do not match");
        } else {
            setError("");
            setSuccess("");
            try {
                const response = await axios.post("/api/users/forgetPassword", {token, password});
                setError(response.data.error || "");
                setSuccess(response.data.message || "");
                // await sleep(2000);
                if(success)
                    router.push("/login");
            } catch (err: Error | any) {
                setError(err.message);
            }
        }
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <div className="w-1/4">
                <h1 className="text-2xl">Change your password</h1>
                
                <h2 className="pt-3 pb-2">Enter new password.</h2>
                
                <input
                    className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-gray-600 bg-white w-full text-black" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                />
                <h2 className="pt-3 pb-2">Confirm new password.</h2>
                
                <input
                    className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-gray-600 bg-white w-full text-black" 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                />
                {error && <p className="text-red-500">{error}</p>}  
                {success && <p className="text-green-500">{success}</p>}
                <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none" onClick={onSubmit}>submit</button>
                    
            </div>
        </div>
    )
}
