import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { CommentIcon } from "../../resources/icons";
import "./styles.css";

export const TaskCard = ({ task, index }) => {
  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? "0.5" : "1",
          }}
        >
          <div className="my-card">
            <p className="h5 my-card-title">{task.title}</p>
            <p className="my-card-description">{task.description}</p>
            <div className="my-card-footer">
              <div className="my-card-avatar">
                <img
                  src="/assets/images/avatar.jpg"
                  alt="task creator avatar"
                />
              </div>
              <div className="my-card-comment-container">
                <CommentIcon />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
