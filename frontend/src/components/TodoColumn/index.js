import "./styles.css";
import React from "react";
import { useFirebaseUserTodo } from "../../context/TodoContext";
import { useFirebaseUser } from "../../context/UserContext";
import { Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import TaskCard from "../TaskCard";

const TodoColumn = ({ section }) => {
  const { addNewTask } = useFirebaseUserTodo();
  const { user } = useFirebaseUser();

  const handleAddTodo = (e) => {
    addNewTask(section.id, {
      id: uuidv4(),
      title: "sample task",
      description: "sample description",
    });
  };

  return (
    <Droppable key={section.id} droppableId={section.id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="col-sm col-md-4 my-todo-column-container"
        >
          <div className="my-todo-column">
            <div className="my-todo-header">
              <span className="h5 my-todo-heading">{section.title}</span>
              <span className="my-todo-count">{section.tasks.length}</span>
            </div>
            <div className="btn my-add-todo-btn" onClick={handleAddTodo}>
              +
            </div>
            <div className="my-card-container">
              {section.tasks.map((task, index) => (
                <TaskCard task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default TodoColumn;
