import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUserFromDb = async (uid) => {
    try {
      const userDoc = doc(db, "users", uid);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        setUser({ ...docSnap.data(), uid });
      } else {
        setUser(null);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const createUser = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user.auth.currentUser, {
        displayName: name,
        photoURL: "assets/images/avatar.jpg",
      });
      return await setDoc(doc(db, "users", res.user.uid), {
        name,
        email,
        photoURL: "assets/images/avatar.jpg",
        tasks: {
          todo: { id: "todo", title: "To do", tasks: [] },
          inProgress: { id: "inProgress", title: "In progress", tasks: [] },
          completed: { id: "completed", title: "Completed", tasks: [] },
        },
      });
    } catch (e) {
      throw e;
    }
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getUserFromDb(currentUser.uid);
      } else {
        setUser(currentUser);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useFirebaseUser = () => {
  return useContext(UserContext);
};
