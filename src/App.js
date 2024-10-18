import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const getTodo = async () => {
    const response = await api.get("/todos");
    setTodoList(response.data.data);
  };

  const addTodo = async () => {
    try {
      const response = await api.post("/todos", {
        todo: todoValue,
        isDone: false,
      });
      if (response.status === 200) {
        console.log("성공");
        setTodoValue("");
        getTodo();
      } else {
        console.log("실패");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateTodo = async (id) => {
    try {
      const todo = todoList.find((item) => item._id === id);
      const response = await api.put(`/todos/${id}`, {
        isDone: !todo.isDone,
      });
      if (response.status === 200) {
        console.log("todo 업데이트 성공");
        setTodoList((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, isDone: !item.isDone } : item
          )
        );
      }
      await getTodo();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await api.delete(`/todos/${id}`);
      if (response.status === 200) {
        console.log("todo 삭제 성공");
        console.log("id는", id);
        getTodo();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTodo}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    </Container>
  );
}

export default App;
