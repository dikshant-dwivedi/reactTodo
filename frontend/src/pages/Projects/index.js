import React from "react";
import { useFirebaseUserTodo } from "../../context/TodoContext";
import { useFirebaseUser } from "../../context/UserContext";
import { FilterIcon } from "../../resources/icons";
import "./styles.css";
import TodoColumn from "../../components/TodoColumn";
import { DragDropContext } from "react-beautiful-dnd";

export const Projects = () => {
  const { user } = useFirebaseUser();
  const { tasks } = useFirebaseUserTodo();

  const onDragEnd = (result) => {};

  return (
    <div className="no-gutters my-projects-container">
      <div className="my-top-bar">
        <div className="my-search-bar"></div>
        <div className="my-badges">
          <img src="assets/images/avatarBadges.png" alt="avatar-badges" />
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
          {Object.values(tasks).map((section) => (
            <TodoColumn key={section.id} section={section} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
