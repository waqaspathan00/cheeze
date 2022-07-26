/**
 * Shown when the user is NOT logged in
 */
import {auth, googleAuthProvider} from "../lib/firebase";
import toast from "react-hot-toast";

export const SignInButton = ({router}) => {
    const signInWithGoogle = async () => {
        auth.signInWithPopup(googleAuthProvider).then((data) => {
            router.push("/capture")
            toast.success("Signed in!")
        });
    }

    return (
        <button className={"btn-google h-16 w-40 px-2 py-2 bg-white rounded-lg flex justify-around items-center"}
                onClick={signInWithGoogle}>
            <img src={"/img/google.png"} className={"w-8"} alt={"google logo"}/>
            <span className={"text-lg text-black"}>Sign in</span>
        </button>
    )
}

/**
 * Shown when the user is logged in
 */
export const SignOutButton = ({router}) => {
    const signOutwithGoogle = () => {
        auth.signOut().then(() => {
            toast.success("Signed out.")
            router.push("/")
        })
    }

    return <button className={"px-4 py-2 w-40 bg-white text-black rounded-lg"} onClick={signOutwithGoogle}>Sign
        Out</button>
}
