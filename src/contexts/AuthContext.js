import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setLoading(false);
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    const value = {
        signup,
        currentUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
