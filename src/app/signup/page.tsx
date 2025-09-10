"use client";
import React, { use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "mongoose";
import toast from "react-hot-toast";

export default function SignUpPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [user])
    
    const onSignUp = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log(response.data);
            router.push("/login");
        }
        catch(err:any){
            console.log(err);
            toast.error(err.message);
        }
        finally{
            setLoading(false);
        }
    }

    
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1>{loading?"processing...." : "SignUp"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input 
                className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-gray-600"
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
            />
            <label htmlFor="email">email</label>
            <input 
                className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-gray-600"
                type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input 
                className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-gray-600"
                type="text"
                id="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
            />
            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none" type="submit" onClick={onSignUp}>{buttonDisabled?"No Signup" : "SignUp"}</button>
            <Link href="/login">Login here</Link>
            <Link href="/forgetpasswordpage">Forget password</Link>
        </div>
    )
}