import { auth } from "./firebase";

import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";

export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    let user = result.user;
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error.code, error.messag);
    return null;
  }
}

export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("user");
  } catch (error) {
    console.log("Error logging out:", error);
  }
};
