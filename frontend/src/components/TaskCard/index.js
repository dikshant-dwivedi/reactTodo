import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { CommentIcon, EditIcon } from "../../resources/icons";
import TaskModal from "../TaskModal";
import "./styles.css";

export const TaskCard = ({ task, index, sectionId }) => {
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? "0.5" : "1",
          }}
        >
          <div className="my-card">
            <div className="my-card-body" {...provided.dragHandleProps}>
              <p className="h5 my-card-title">{task.title}</p>
              <p className="my-card-description">{task.description}</p>
            </div>
            <div className="my-card-footer">
              <div className="my-card-avatar">
                <img
                  src="/assets/images/avatar.jpg"
                  alt="task creator avatar"
                />
              </div>
              <div className="my-card-comment-container">
                <EditIcon onClick={() => setShowEditTaskModal(true)} />
                <CommentIcon />
                <TaskModal
                  task={task}
                  sectionId={sectionId}
                  show={showEditTaskModal}
                  handleClose={() => setShowEditTaskModal(false)}
                  type="edit"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
