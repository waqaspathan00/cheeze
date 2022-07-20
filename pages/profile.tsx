/* React JS Template using functions */
import React, {useState, useEffect} from "react"
import {SignOutButton} from "../components/AuthButtons";
import {useRouter} from "next/router";

export default function ProfilePage() {
    const router = useRouter();

    return (
        <div>

            <SignOutButton router={router}/>

        </div>
    )
}
