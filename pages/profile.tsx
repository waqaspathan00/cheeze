/* React JS Template using functions */
import React, {useState, useEffect, useContext} from "react"
import {SignOutButton} from "../components/AuthButtons";
import {useRouter} from "next/router";
import {UserContext} from "../lib/context";
import {db} from "../lib/firebase";
import Loader from "../components/Loader";

export default function ProfilePage() {
    const router = useRouter();
    const {user, profile} = useContext(UserContext);
    const [newUsername, setNewUsername] = useState("")

    async function handleClick() {
        await db.collection(user.uid).doc("profile").set({username: newUsername});
        await db.collection("profiles").doc(newUsername).set({username: newUsername});
    }

    useEffect(() => {
        // if (!user){
        //     router.push("/")
        //     return
        // }
    }, [router, user])

    if (!profile) {
        return (
            <div className={"flex justify-center items-center h-screen"}>
                <Loader show={true}/>
            </div>
        )
    }




    return (
        <div className={"flex flex-col items-center mt-16"}>
            {/*<img className={"w-48"} src={profile.avatar}/>*/}
            <input onChange={(e) => {
                setNewUsername(e.target.value)
            }} placeholder={profile.username || "Enter username"}/>
            <button onClick={handleClick}>Change username</button>
            {/*<h2 className={"font-open text-lightgrey mt-2"}>{profile.status}</h2>*/}
            <SignOutButton router={router}/>
        </div>
    )
}
