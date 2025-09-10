"use client"
import axios from "axios"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verify, setVerify] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try{
            const response = await axios.post('/api/users/verifyEmail', {token});
            console.log(response.data);
            setVerify(true);
        }catch(err: Error | any){
            setError(true);
            console.log(err.response.data);
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token? `${token}`:"no token"}</h2>
            {verify && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
    )

}