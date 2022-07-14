import '../styles/globals.css'
import {PhotoProvider} from "../lib/context";

function MyApp({Component, pageProps}) {
    return (
        <>
            <PhotoProvider>
                <Component {...pageProps} />
            </PhotoProvider>
        </>
    )
}

export default MyApp
