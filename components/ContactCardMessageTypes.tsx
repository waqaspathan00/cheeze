/* React JS Template using functions */
import React, {useState, useEffect} from "react"


export function MessageBox({messages}) {
    if (messages.length) {
        const ind = messages.length - 1
        const imageUrl = messages[ind].imageUrl;
        return <a href={imageUrl} className={`w-6 h-6 rounded-md bg-red`}></a>
    }

    return <></>
}