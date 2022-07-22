import {createContext, useState} from "react";
import {useUserData} from "./hooks";

// when user logs in their information will be saved in this context
export const UserContext = createContext({ user: null, profile: {username: ""} })
export const UserProvider = ({children}) => {
    const userData = useUserData()

	return <UserContext.Provider value={userData}>{children}</UserContext.Provider>
}

export const PhotoContext = createContext({})
export const PhotoProvider = ({ children }) => {
	const [photo, setPhoto] = useState("");

	return <PhotoContext.Provider value={{ photo, setPhoto }}>{children}</PhotoContext.Provider>
}