import '../styles/globals.css'
import {PhotoProvider, UserProvider} from "../lib/context";
import {Toaster} from "react-hot-toast";

function MyApp({Component, pageProps}) {

    return (
        <UserProvider>
            <PhotoProvider>
                <Toaster/>
                <Component {...pageProps} />
            </PhotoProvider>
        </UserProvider>
    )
}

export default MyApp
