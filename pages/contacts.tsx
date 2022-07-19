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
        <div>
            <SignOutButton router={router}/>
            {contacts && contacts.map((contact) => (
                <div>
                    <h1>{contact.username}</h1>
                    <h2>{contact.status}</h2>
                </div>
            ))}
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