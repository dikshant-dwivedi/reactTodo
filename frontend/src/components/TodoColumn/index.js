import "./styles.css";
import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "../TaskCard";
import TaskModal from "../TaskModal";

const TodoColumn = ({ section }) => {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

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
            <div
              className="btn my-add-todo-btn"
              onClick={() => setShowAddTaskModal(true)}
            >
              +
            </div>
            <TaskModal
              type="add"
              sectionId={section.id}
              show={showAddTaskModal}
              handleClose={() => setShowAddTaskModal(false)}
            />
            <div className="my-card-container">
              {section.tasks.map((task, index) => (
                <TaskCard task={task} sectionId={section.id} index={index} />
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
