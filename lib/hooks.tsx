import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "./firebase";
import {useEffect, useState} from "react";

export function useUserData() {
    const [user] = useAuthState(auth);
    const [profile, setProfile] = useState({});
    const [username, setUsername] = useState(null);
    const [status, setStatus] = useState(null);
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        let unsubscribe;
        async function getUserData() {
            let doc = await db.collection(user.uid).doc("profile").get();
            let data = doc.data()
            const un = data.username;

            doc = await db.collection("profiles").doc(un).get();
            data = doc.data();
            setProfile(data)
        }

        if (!user) {
            setUsername(null);
            return
        }

        getUserData()
        return unsubscribe;
    }, [user]);


    return {user, profile}
}