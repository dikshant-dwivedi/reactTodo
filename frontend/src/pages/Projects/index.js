import React from "react";
import { useFirebaseUserTodo } from "../../context/TodoContext";
import { useFirebaseUser } from "../../context/UserContext";
import { FilterIcon } from "../../resources/icons";
import "./styles.css";
import TodoColumn from "../../components/TodoColumn";
import { DragDropContext } from "react-beautiful-dnd";

export const Projects = () => {
  const { user } = useFirebaseUser();
  const { tasks, moveTask, setTasks } = useFirebaseUserTodo();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const data = Object.values(tasks);

      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId
      );

      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;

      setTasks(data);

      moveTask(
        source.droppableId,
        destination.droppableId,
        sourceTask,
        destinationTask
      );
    }
  };

  return (
    <div className="no-gutters my-projects-container">
      <div className="my-top-bar">
        <div className="my-search-bar"></div>
        <div className="my-badges">
          <img
            src="/assets/images/Ellipse 25.png"
            alt="avatar"
            className="my-avatar"
          />
          <img
            src="/assets/images/Ellipse 26.png"
            alt="avatar"
            className="my-avatar"
          />
          <img
            src="/assets/images/Ellipse 27.png"
            alt="avatar"
            className="my-avatar"
          />
          <img
            src="/assets/images/Ellipse 28.png"
            alt="avatar"
            className="my-avatar"
          />
          <img
            src="/assets/images/Ellipse 29.png"
            alt="avatar"
            className="my-avatar"
          />
          <img
            src="/assets/images/Ellipse 30.png"
            alt="avatar"
            className="my-avatar"
          />
          <img
            src="/assets/images/Ellipse 31.png"
            alt="avatar"
            className="my-avatar"
          />
        </div>
        <div className="my-profile-container">
          <span className="me-2">Hi {user.name.split(" ")[0]}</span>
          <img
            src={user.photoURL}
            alt="profile-url"
            className="my-profile-url-img"
          />
        </div>
      </div>
      <div className="my-header-bar">
        <span className="my-heading">Projects</span>
        <div className="my-filter-container">
          <FilterIcon />
          <span className="ms-2">Filter</span>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="my-todo-container">
          {tasks.map((section) => (
            <TodoColumn key={section.id} section={section} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
