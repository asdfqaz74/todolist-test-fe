import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, updateTodo, deleteTodo }) => {
  useEffect(() => {
    console.log(
      `Item ${item.todo} is has been updated: isDone = ${item.isDone}`
    );
  }, [item.isDone, item.todo]);
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isDone ? "item-complete" : ""}`}>
          <div className="todo-content">{item.todo}</div>

          <div>
            <button
              className="button-delete"
              onClick={() => deleteTodo(item._id)}
            >
              삭제
            </button>
            <button
              className="button-delete"
              onClick={() => updateTodo(item._id)}
            >
              {item.isDone ? "안끝남" : "끝남"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
