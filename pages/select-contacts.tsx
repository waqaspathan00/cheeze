/* React JS Template using functions */
import React, {useContext, useEffect, useState} from "react"
import {v4 as uuid} from "uuid"
import {db, storage} from "../lib/firebase";
import firebase from "firebase";
import {PhotoContext, UserContext} from "../lib/context";
import {useRouter} from "next/router";
import {IoIosSend, IoMdPersonAdd} from "react-icons/io";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import ContactCard from "../components/ContactCard";

export default function ContactsPage() {
    const router = useRouter();
    const {user, profile} = useContext(UserContext);
    // @ts-ignore
    const {photo} = useContext(PhotoContext)
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedContacts, setSelectedContacts] = useState([]);

    useEffect(() => {
        async function getAddedContacts() {
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
                const doc = await db.collection("profiles").doc(contact).get();
                const data = doc.data();
                profileData.push(data)
            }
            setContacts(profileData)
            setLoading(false)
        }

        getProfiles()
    }, [router, user])

    function selectContact(checked, username) {
        if (!checked) {
            setSelectedContacts([...selectedContacts, username])
        } else {
            setSelectedContacts(selectedContacts.filter((contact) => contact !== username))
        }
    }

    function handleSend() {
        // change selectedContacts[0] so that it loops through list instead
        const id = uuid();
        const uploadTask = storage
            .ref(`${user.uid}/${id}`)
            .putString(photo, "data_url");

        uploadTask.on("state_changed", null, (error) => {
            console.log(error);
        }, () => {
            storage.ref(`${user.uid}`)
                .child(id)
                .getDownloadURL()
                .then((url) => {
                    db.collection("messages").doc(selectedContacts[0]).collection(profile.username).add({
                        imageUrl: url,
                        username: profile.username,
                        read: false,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    router.push("/contacts")
                })
        });
        router.push("/capture")
    }

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
                    onClick={() => router.push("/add-friend")}
                    className={"bg-gold hover:bg-darkgold transition-all rounded-full p-2 m-4 w-1/3 flex justify-center"}>
                    <IoMdPersonAdd size={48} color={""}/>
                </button>
                <button
                    onClick={handleSend}
                    className={"bg-gold hover:bg-darkgold transition-all rounded-full p-2 m-4 w-1/3 flex justify-center"}>
                    <IoIosSend size={48} color={""}/>
                </button>
            </div>
            {contacts.length
                ? contacts.map((contact) => (
                    <ContactCard key={contact.username}
                                 username={contact.username}
                                 child={<CheckBox add={(checked) => selectContact(checked, contact.username)}/>}
                    />
                ))
                : <h1>you have no contacts added</h1>
            }
        </div>
    )
}

export function CheckBox({add}) {
    const [checked, setChecked] = useState(false);

    function handleChange() {
        add(checked)
        setChecked(!checked)
    }

    return <input onChange={handleChange} checked={checked} type={"checkbox"}
                  className={`w-6 h-6 rounded-md border-2 transition-all`}/>
}
