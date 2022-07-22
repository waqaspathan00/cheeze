/* React JS Template using functions */
import React, {useState, useContext} from "react"
import {UserContext} from "../lib/context";
import {db} from "../lib/firebase";

export default function AddFriendPage() {
    const {user} = useContext(UserContext);
    const [search, setSearch] = useState("");

    function handleChange(e) {
        setSearch(e.target.value)
    }

    async function handleClick() {
        try {
            const docRef = await db.collection(user.uid).doc("added-contacts");
            const doc = await docRef.get();
            const data = doc.data()
            const contacts = [...data.contacts, search]

            await docRef.set({contacts: contacts})
        } catch (e) {
            db.collection(user.uid).doc("added-contacts").set({contacts: [search]})
        }
    }

    return (
        <div className={"flex justify-center items-center h-screen"}>
            <input onChange={handleChange} className={"p-2 rounded-l-xl"}/>
            <button className={"bg-gold p-2 rounded-r-xl"} type={"submit"} onClick={handleClick}>Add friend</button>
        </div>
    )
}
