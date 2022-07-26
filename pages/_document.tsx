import {Html, Head, Main, NextScript} from 'next/document'
import React from "react";

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="icon" type="image/x-icon" href="/img/logo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                {/* @ts-ignore */}
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Open+Sans&display=swap"
                      rel="stylesheet"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>

            </body>
        </Html>
    )
}