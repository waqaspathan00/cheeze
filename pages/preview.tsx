/* React JS Template using functions */
import React, {useContext, useEffect} from "react"
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
    }, [photo, router])

    const closePreview = () => {
        setPhoto("")
        router.push("/capture")
    }

    const sendPost = () => {
        router.push("/select-contacts")
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
