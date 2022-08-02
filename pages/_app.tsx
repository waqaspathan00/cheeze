import "bootstrap/dist/css/bootstrap.min.css"
import '../styles/globals.css'
import {PhotoProvider, UserProvider} from "../lib/context";
import {Toaster} from "react-hot-toast";
import Head from "next/head";
import React from "react";

function MyApp({Component, pageProps}) {

    return (
        <>
            <Head>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
            </Head>
            <UserProvider>
                <PhotoProvider>
                    <Toaster/>
                    <Component {...pageProps} />
                </PhotoProvider>
            </UserProvider>
        </>
    )
}

export default MyApp
