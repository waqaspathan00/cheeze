/* React JS Template using functions */
import React, {useContext, useEffect} from "react"
import {v4 as uuid} from "uuid"
import {db, storage} from "../lib/firebase";
import firebase from "firebase";
import {PhotoContext} from "../lib/context";
import {useRouter} from "next/router";
import {GrFormClose} from "react-icons/gr"
import {MdOutlineKeyboardArrowRight} from "react-icons/md"


export default function PreviewPage() {
    // @ts-ignore
    const {photo, setPhoto} = useContext(PhotoContext)
    const router = useRouter()

    useEffect(() => {
        if (!photo) {
            router.push("/capture")
        }
    }, [photo])

    const closePreview = () => {
        setPhoto("")
        router.push("/capture")
    }

    const sendPost = () => {
        const id = uuid();
        const uploadTask = storage
            .ref(`posts/${id}`)
            .putString(photo, "data_url");

        uploadTask.on("state_changed", null, (error) => {
            console.log(error);
        }, () => {
            storage.ref("posts")
                .child(id)
                .getDownloadURL()
                .then((url) => {
                    db.collection("posts").add({
                        imageUrl: url,
                        username: "Wizard",
                        read: false,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    router.push("/chats")
                })
        });

    }


    return (
        <div className={"relative"}>
            <GrFormClose className={"absolute top-4 left-4 text-gold bg-gold rounded-lg cursor-pointer text-3xl"} fontSize={"large"}
                       onClick={closePreview}/>
            <img src={photo} alt={""}/>
            <div onClick={sendPost}
                 className={"absolute w-32 bottom-4 right-6 bg-gold flex justify-between items-center rounded-full p-3 cursor-pointer"}>
                <h2>Send now</h2>
                <MdOutlineKeyboardArrowRight className={"text-3xl"} />
            </div>
        </div>
    )
}
