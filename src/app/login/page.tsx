"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage(){
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    
    const onLogIn = async () => {
        try {
            setLoading(true);
            console.log(user);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login Successful");
            router.push("/profile");
        } catch (error: any) {
            console.log(`login failed : ${error.message}`);
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1>{loading?"logging in ...":"LogIn"}</h1>
            <hr />
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
            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none" type="submit" onClick={onLogIn}>{buttonDisabled?"No login":"Login here"}</button>
            <Link href="/signup">SignUp here</Link>
            <Link href="/forgetpasswordpage">Forget password</Link>
        </div>
    )
}