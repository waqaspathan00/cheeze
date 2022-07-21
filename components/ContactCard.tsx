/* React JS Template using functions */
import React from "react"

export default function ContactCard({username, status, avatar, children}) {
    return (
        <div
            className={"flex justify-between items-center bg-white m-1 p-4 rounded-xl w-11/12 sm:w-1/2 hover:scale-105 transition-all"}>
            <div className={"flex items-center"}>
                <img className={"w-16 rounded-full border-2 mr-4"} src={avatar} alt={""}/>
                <div>
                    <h1>{username}</h1>
                    <h2 className={"text-grey text-sm"}>{status}</h2>
                </div>
            </div>
            {children}
        </div>
    )

}
