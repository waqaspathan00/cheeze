/* React JS Template using functions */
import React, {useRef, useCallback, useContext} from "react"
import Webcam from "react-webcam";
// import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
// import {setCameraImage} from "./features/cameraSlice";
import {useRouter} from "next/router";
import {BsFillStopCircleFill, BsPeopleFill} from "react-icons/bs";
import {PhotoContext, UserContext} from "../lib/context";

const videoConstraints = {
    width: 390,
    height: 844,
    facingMode: "user"
}

export default function CapturePage() {
    const {user} = useContext(UserContext);
    const webcamRef = useRef(null);
    const router = useRouter();
    // @ts-ignore
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
            <div
                className={"w-full absolute bottom-12 z-10 text-gold cursor-pointer"}>

                <div className={"w-full flex justify-around"}>
                    <div className={"transition-all hover:text-darkgold hover:scale-110 "} onClick={() => {
                        router.push("/contacts")
                    }}>
                        <BsPeopleFill size={100}/>
                    </div>

                    <div className={"transition-all hover:text-darkgold hover:scale-110 "} onClick={capture}>
                        <BsFillStopCircleFill size={100}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
