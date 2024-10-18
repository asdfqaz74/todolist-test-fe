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
        setTodoValue("");
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

      <TodoBoard todoList={todoList} getTodo={getTodo} />
    </Container>
  );
}

export default App;
