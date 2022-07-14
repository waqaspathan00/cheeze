/* React JS Template using functions */
import React, {useContext, useEffect} from "react"
// import {v4 as uuid} from "uuid"
// import {db, storage} from "./firebase";
// import firebase from "firebase";
import {PhotoContext} from "../lib/context";
import {useRouter} from "next/router";


export default function PreviewScreen() {
    const {photo} = useContext(PhotoContext)
    const router = useRouter()

    // useEffect(() => {
    //     if (!cameraImage) {
    //         router.push("/")
    //     }
    // }, [cameraImage, navigation])

    // const closePreview = () => {
    //     dispatch(resetCameraImage());
    //     router.push("/")
    // }

    const sendPost = () => {
        const id = uuid();
        const uploadTask = storage
            .ref(`posts/${id}`)
            .putString(cameraImage, "data_url");

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
                    navigation("/chats")
                })
        });

    }


    return (
        <div className={"preview relative"}>
            {/*<CloseIcon className={"preview_close absolute top-4 right-4 text-red-500 cursor-pointer"} fontSize={"large"}*/}
            {/*           onClick={closePreview}/>*/}
            <img src={photo} alt={""}/>
            <div onClick={sendPost}
                 className={"preview__footer absolute w-32 bottom-4 right-6 bg-yellow-300 flex justify-between items-center rounded-full p-3 cursor-pointer"}>
                <h2>Send now</h2>
                {/*<SendIcon fontSize={"small"}/>*/}
            </div>
        </div>
    )
}
