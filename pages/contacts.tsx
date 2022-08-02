/* React JS Template using functions */
import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../lib/context";
import {db} from "../lib/firebase";
import {useRouter} from "next/router";
import {IoIosPerson, IoMdPersonAdd} from "react-icons/io";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import ContactCard from "../components/ContactCard";
import {MessageBox} from "../components/ContactCardMessageTypes";
import {Message} from "postcss";
import "bootstrap/dist/css/bootstrap.min.css"
export default function ContactsPage() {
    const router = useRouter();
    const {user, profile} = useContext(UserContext);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getAddedContacts(): Promise<string[]> {
            try {
                const doc = await db.collection(user.uid).doc("added-contacts").get()
                const data = doc.data()
                return data.contacts;
            } catch (e) {
                return []
            }
        }

        async function getProfiles() {
            setLoading(true)
            const profileData = []
            const addedContacts = await getAddedContacts();
            for (const contact of addedContacts) {
                const profilesDoc = await db.collection("profiles").doc(contact).get();
                const messagesDoc = await db.collection("messages").doc(profile.username).collection(contact).get();

                // get a list of all messages sent by this contact
                const contactData = profilesDoc.data();
                const messages = messagesDoc.docs.map(doc => doc.data())

                const totalData = {...contactData, messages}
                profileData.push(totalData)
            }
            setContacts(profileData)
            setLoading(false)
            return profileData
        }

        // if (!user) {
        //     router.push("/")
        //     toast.error("You must sign in first")
        //     return
        // }

        if (profile){
            getProfiles()
        }
    }, [profile, user])

    if (loading) {
        return (
            <div className={"flex justify-center items-center mt-80"}>
                <Loader show={loading}/>
            </div>
        )
    }

    return (
        <div className={"flex flex-col items-center"}>
            <div className={"w-full flex justify-around"}>
                <button
                    onClick={() => router.push("/profile")}
                    className={"bg-gold hover:bg-darkgold transition-all rounded-full p-2 m-4 w-1/3 flex justify-center"}>
                    <IoIosPerson size={48} color={""}/>
                </button>
                <button
                    onClick={() => router.push("/add-friend")}
                    className={"bg-gold hover:bg-darkgold transition-all rounded-full p-2 m-4 w-1/3 flex justify-center"}>
                    <IoMdPersonAdd size={48} color={""}/>
                </button>
            </div>
            {contacts.length
                ? contacts.map((contact) => (
                    <ContactCard key={contact.username} username={contact.username}
                                 child={<MessageBox messages={contact.messages}/>}
                    />
                ))
                : <h1>you have no contacts added</h1>
            }
        </div>
    )
}
