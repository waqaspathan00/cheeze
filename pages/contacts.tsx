/* React JS Template using functions */
import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../lib/context";
import {db} from "../lib/firebase";
import {SignInButton, SignOutButton} from "../components/AuthButtons";
import {useRouter} from "next/router";

export default function ContactsPage() {
    const router = useRouter();
    const {user} = useContext(UserContext);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function getAddedContacts() {
            const doc = await db.collection(user.uid).doc("added-contacts").get()
            const data = doc.data()
            return data.contacts;
        }

        async function getProfiles() {
            const profileData = []
            const addedContacts = await getAddedContacts();
            for (const contact of addedContacts) {
                const doc = await db.collection("profiles").doc(contact).get();
                const data = doc.data();
                profileData.push(data)
            }
            setContacts(profileData)
        }

        if (!user) {
            return
        }

        getProfiles()

        // async function getAddedContacts() {
        //     const snapshot = await db.collection('added-contacts').get()
        //     const collection = {};
        //     snapshot.forEach(doc => {
        //         collection[doc.id] = doc.data();
        //     });
        //     return collection;
        // }

        // if (user) {
        // const profileData = []
        // const addedContactsRef = db.collection(user.uid).doc("added-contacts");
        // addedContactsRef.get().then((doc) => {
        // if (doc.exists) {
        //     const data = doc.data()
        //     const addedContacts = data.contacts
        //
        //     // get the profile data for each contact the user has added
        //     addedContacts.forEach((contact) => {
        //         const profileRef = db.collection("profiles").doc(contact);
        //         db.collection("profiles").get()
        //         profileRef.get().then(doc => console.log(doc))
        //         profileRef.get().then((doc) => {
        //             // console.log(doc)
        //             if (doc.exists) {
        //                 const data = doc.data();
        //                 profileData.push(data)
        //                 // console.log("updating with: ", data)
        //             }
        //         })
        //     })
        // console.log("called with this data", profileData)

        // }
        // })
        // setContacts(profileData)
        // }
    }, [user])

    console.log(contacts)

    return (
        <div className={"flex flex-col items-center"}>
            <SignOutButton router={router}/>
            {contacts && contacts.map((contact) => (
                <ContactCard username={contact.username} status={contact.status} avatar={contact.avatar}/>
            ))}
        </div>
    )
}

function ContactCard({username, status, avatar}) {
    function MessageType({color}){
        const messageColor = "bg-" + color
        console.log(messageColor)

        return <div className={`w-6 h-6 rounded-md ${messageColor}`}></div>
        // return <div className={`w-6 h-6 rounded-md bg-blue`}></div>
    }

    return (
        <div className={"flex justify-between items-center bg-white m-2 p-4 rounded-xl w-3/4 md:w-1/2 hover:scale-110 transition-all"}>
            <div className={"flex items-center"}>
                <img className={"w-16 rounded-full border-2 mr-4"} src={avatar} alt={""}/>
                <div>
                    <h1>{username}</h1>
                    <h2 className={"text-grey text-sm font-open"}>{status}</h2>
                </div>
            </div>
            {/*<MessageType color={"red"}/>*/}
        </div>
    )

}



/**
 * contact data
 * - username
 * - messageType
 *
 * profile data
 * - username
 * - status
 * - profile picture
 *
 * - get list of contacts
 * - use contact names in list to get profile data (status and profpic)
 *
 */