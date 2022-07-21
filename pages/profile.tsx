/* React JS Template using functions */
import React, {useState, useEffect, useContext} from "react"
import {SignOutButton} from "../components/AuthButtons";
import {useRouter} from "next/router";
import {UserContext} from "../lib/context";

export default function ProfilePage() {
    const router = useRouter();
    const {user, profile} = useContext(UserContext);

    useEffect(() => {
        if (!user){
            router.push("/")
        }
    })

    return (
        <div className={"flex flex-col items-center mt-16"}>
            <img className={"w-48"} src={profile.avatar}/>
            <h1 className={"text-3xl mt-4"}>{profile.username}</h1>
            <h2 className={"font-open text-lightgrey mt-2"}>{profile.status}</h2>
            <SignOutButton router={router}/>
        </div>
    )
}
