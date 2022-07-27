import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, doc, addDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const UserContext = createContext();
const usersCollectionRef = collection(db, "users");

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUserInDb = (name, email) => {
    return addDoc(usersCollectionRef, { name, email });
  };

  const getUserFromDb = (email) => {
    const userDoc = doc(db, "users", email);
    return getDoc(userDoc);
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ createUser, user, logout, signIn, createUserInDb }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useFirebaseUser = () => {
  return useContext(UserContext);
};
