import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "./firebase";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export function useUserData() {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [profile, setProfile] = useState({});

    useEffect(() => {
        let unsubscribe;

        async function getUserData() {
            try {
                let doc = await db.collection(user.uid).doc("profile").get();
                let data = doc.data()
                const un = data.username;

                doc = await db.collection("profiles").doc(un).get();
                data = doc.data();
                setProfile(data)
                console.log(data)
            } catch (e) {

            }
        }

        if (!user) {
            setProfile(null);
            return
        }

        getUserData()
        return unsubscribe;
    }, [user]);


    return {user, profile}
}