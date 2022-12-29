import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";

// 객체형 컴포넌트 구성
export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  // handleSubmit을 Form으로 옮기지 않고 App.js에서 처리하는 이유는
  // 다른 state도 있기 때문에 여기서 처리하는게 좋다.
  const handleSubmit = (e) => {
    // 페이지 리로드 막아줌
    e.preventDefault();
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };
    console.log(newTodo);
    // push 방법보다 좋은듯.
    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
  };

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>
        <Lists todoData={todoData} setTodoData={setTodoData} />
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} setTodoData={setTodoData} />
      </div>
    </div>
  );
}
