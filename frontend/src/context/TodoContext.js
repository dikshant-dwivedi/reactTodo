import { createContext, useContext, useEffect, useState } from "react";
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { useFirebaseUser } from "./UserContext";
import { db } from "../firebase";

const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { user } = useFirebaseUser();
  const docRef = doc(db, "users", user.uid);

  const editTask = async (sectionId, tasks) => {
    try {
      let updateParam = {};
      updateParam[`tasks.${sectionId}.tasks`] = tasks;
      await updateDoc(docRef, updateParam);
    } catch (e) {
      console.log(e);
    }
  };

  const moveTask = async (srcId, destId, srcTasks, destTasks) => {
    try {
      let updateParam = {};
      updateParam[`tasks.${srcId}.tasks`] = srcTasks;
      updateParam[`tasks.${destId}.tasks`] = destTasks;
      await updateDoc(docRef, updateParam);
    } catch (e) {
      console.log(e);
    }
  };

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
      const tasks = Object.values(doc.data().tasks);
      tasks.sort((a, b) => a.sortOrder - b.sortOrder);
      setTasks(tasks);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <TodoContext.Provider
      value={{ addNewTask, moveTask, tasks, setTasks, editTask }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useFirebaseUserTodo = () => {
  return useContext(TodoContext);
};
