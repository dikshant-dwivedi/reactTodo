import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useFirebaseUserTodo } from "../../context/TodoContext";
import { v4 as uuidv4 } from "uuid";

import "./styles.css";

export const TaskModal = ({ type, show, handleClose, sectionId, task }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addNewTask, tasks, setTasks, editTask } = useFirebaseUserTodo();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleAddTodo = () => {
    addNewTask(sectionId, {
      id: uuidv4(),
      title: title,
      description: description,
    });
    handleClose();
  };

  const handleEditTodo = () => {
    const sectionIdx = tasks.findIndex((s) => s.id === sectionId);
    const i = tasks[sectionIdx].tasks.findIndex((t) => t.id === task.id);
    const data = [...tasks];
    data[sectionIdx].tasks[i].title = title;
    data[sectionIdx].tasks[i].description = description;
    setTasks(data);
    handleClose();
    editTask(sectionId, data[sectionIdx].tasks);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {type === "add" ? "Add new task" : "Edit task"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="modalForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Give your task a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="modalFrom.ControlTextarea1">
              <Form.Control
                as="textarea"
                placeholder="Description..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn my-close-modal-btn" onClick={handleClose}>
            Close
          </button>
          <button
            className="btn my-add-task-btn"
            onClick={() => {
              type === "add" ? handleAddTodo() : handleEditTodo();
            }}
            disabled={!title || !description}
          >
            {type === "add" ? "Add Task" : "Save Changes"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskModal;
