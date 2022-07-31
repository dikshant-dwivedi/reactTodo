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
      await setDoc(doc(db, "users", res.user.uid), {
        name,
        email,
        photoURL: "assets/images/avatar.jpg",
        tasks: {
          todo: {
            id: "todo",
            sortOrder: 1,
            title: "To do",
            tasks: [
              {
                id: uuidv4(),
                title: "Design- App",
                description:
                  "Modifying Career, Scholarship and Entrance exam screen Acc to new design pattern ",
              },
              {
                id: uuidv4(),
                title: "Prototyping",
                description: "Account -> Profile Section",
              },
            ],
          },
          inProgress: {
            id: "inProgress",
            sortOrder: 2,
            title: "In progress",
            tasks: [
              {
                id: uuidv4(),
                title: "Frontend",
                description:
                  "As a Content Annotator, I should be able add tags in colleges, So that colleges can improve",
              },
            ],
          },
          completed: {
            id: "completed",
            sortOrder: 3,
            title: "Completed",
            tasks: [
              {
                id: uuidv4(),
                title: "Backend",
                description:
                  "Create API for search colleges ,exams, scholarships, career_pathways",
              },
              {
                id: uuidv4(),
                title: "Cohorts and arms",
                description: "Move feature from admin and vendor to freyja",
              },
              {
                id: uuidv4(),
                title: "Compliance automation",
                description:
                  "Design feature for automating standard operating procedures and auditing",
              },
            ],
          },
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
