import React from "react";
import { Col, Row } from "react-bootstrap";
import api from "../utils/api";

const TodoItem = ({ item, getTodo }) => {
  const updateTodo = async (id) => {
    try {
      const response = await api.put(`/todos/${id}`, {
        isDone: !item.isDone,
      });
      if (response.status === 200) {
        getTodo();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await api.delete(`/todos/${id}`);
      if (response.status === 200) {
        getTodo();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isDone ? "item-complete" : ""}`}>
          <div className="todo-content">{item.todo}</div>

          <div>
            <button className="button-delete" onClick={deleteItem}>
              삭제
            </button>
            <button className="button-delete" onClick={updateTodo}>
              {item.isDone ? "안끝남" : "끝남"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
