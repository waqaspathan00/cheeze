/* React JS Template using functions */
import React, {useContext} from "react"
import {UserContext} from "../lib/context";
import {SignInButton} from "./../components/AuthButtons"
import {useRouter} from "next/router";
import toast from "react-hot-toast";

/**
 * Navigation bar shown at top of screen
 * Contains the routes for the application
 */
export default function HomePage() {
    const {user} = useContext(UserContext);
    const router = useRouter();

    if (user){
        router.push("/capture")
        toast.success("Signed in!")
    }

    return (
        <div className={"flex justify-center items-center border-2 h-screen"}>
            <SignInButton router={router} />
        </div>
    )
}