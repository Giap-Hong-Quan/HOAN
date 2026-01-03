import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { apiClient } from "./apiclient";

export const loginWithGoogle =async ()=>{
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    const res = await apiClient.post("/auth/login-gg",{},{
        headers: {
        Authorization: `Bearer ${idToken}`
    }
    })
    localStorage.setItem("accessToken",res.data.accessToken)
    return res.data;
}