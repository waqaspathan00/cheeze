/* React JS Template using functions */
import React, {useRef, useCallback, useContext} from "react"
import Webcam from "react-webcam";
// import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
// import {setCameraImage} from "./features/cameraSlice";
import {useRouter} from "next/router";
import {BsFillStopCircleFill} from "react-icons/bs";
import {PhotoContext} from "../lib/context";

const videoConstraints = {
    width: 600,
    height: 1000,
    facingMode: "user"
}

export default function Home() {
    const webcamRef = useRef(null);
    const router = useRouter();
    const {setPhoto} = useContext(PhotoContext)

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setPhoto(imageSrc)
        router.push("/preview")
    }, [webcamRef])

    return (
        <div className={"webcamCapture relative h-screen flex items-center justify-center "}>
            <Webcam
                className={"w-full h-full z-10"}
                audio={false}
                videoConstraints={videoConstraints}
                ref={webcamRef}
                screenshotFormat={"image/jpeg"}
            />
            <div onClick={capture} className={"absolute bottom-12 z-10 text-gold cursor-pointer transition-all hover:text-darkgold hover:scale-110 "}>
                <BsFillStopCircleFill size={100}/>
            </div>
        </div>
    )
}
