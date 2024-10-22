import React, { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const TodoPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const getTodos = async () => {
    const response = await api.get("/todos");
    setTodoList(response.data.data);
  };
  useEffect(() => {
    getTodos();
  }, []);
  const addTodo = async () => {
    try {
      const response = await api.post("/todos", {
        todo: todoValue,
        isDone: false,
      });
      if (response.status === 200) {
        getTodos();
      }
      setTodoValue("");
    } catch (error) {
      console.log("error:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await api.delete(`/todos/${id}`);
      if (response.status === 200) {
        getTodos();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todo = todoList.find((item) => item._id === id);
      const response = await api.put(`/todos/${id}`, {
        isDone: !todo.isComplete,
      });
      if (response.status === 200) {
        getTodos();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            onChange={(event) => setTodoValue(event.target.value)}
            className="input-box"
            value={todoValue}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button onClick={addTodo} className="button-add">
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        deleteTodo={deleteItem}
        updateTodo={toggleComplete}
      />
    </Container>
  );
};

export default TodoPage;
