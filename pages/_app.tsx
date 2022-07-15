import '../styles/globals.css'
import {PhotoProvider, UserProvider} from "../lib/context";

function MyApp({Component, pageProps}) {

    return (
        <UserProvider>
            <PhotoProvider>
                <Component {...pageProps} />
            </PhotoProvider>
        </UserProvider>
    )
}

export default MyApp
