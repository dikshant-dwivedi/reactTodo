import { createContext, useContext, useEffect, useState } from "react";
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { useFirebaseUser } from "./UserContext";
import { db } from "../firebase";

const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { user } = useFirebaseUser();
  const docRef = doc(db, "users", user.uid);

  const addNewTask = async (sectionId, task) => {
    try {
      let updateParam = {};
      updateParam[`tasks.${sectionId}.tasks`] = arrayUnion(task);
      await updateDoc(docRef, updateParam);
      return;
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
      setTasks(doc.data().tasks);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <TodoContext.Provider value={{ addNewTask, tasks }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useFirebaseUserTodo = () => {
  return useContext(TodoContext);
};
