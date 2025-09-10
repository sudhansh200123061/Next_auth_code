
"use client";
import axios from "axios";
import { useState, useEffect} from "react";




export default function ForgetPasswordPage() {

    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");

 
    
    useEffect(() => {
        setError("");
        setSuccess("");
    }, [email]);


    const onContinue = async() => {
        try{
            const response = await axios.post("/api/users/forgetPasswordSendEmail", {email});
            setError(response.data.error || "");
            setSuccess(response.data.message || "");
            console.log(response);
        } 
        catch(err: Error | any){
            console.log(err);
            setError(err.message);
        }
    }
    return (

        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <div className="w-1/4">
                <h1 className="text-2xl">Change your password</h1>
                
                <h2 className="pt-3 pb-2">Enter your email.</h2>
                
                <input
                    className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-gray-600 bg-white w-full text-black" 
                    type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
                {error && <p className="text-red-500">{error}</p>}  
                {success && <p className="text-green-500">{success}</p>}
                <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none" onClick={onContinue}>continue</button>
            </div>

        </div>
    )
}
