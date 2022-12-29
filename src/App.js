import React, { useState } from "react";
import "./App.css";
import Lists from "./components/Lists";

// 객체형 컴포넌트 구성
export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

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
        <form style={{ display: "flex" }} onSubmit={handleSubmit}>
          <input
            type="text"
            name="value"
            style={{ flex: "10", padding: "5px" }}
            placeholder="해야 할 일을 입력하세요."
            value={value}
            onChange={handleChange}
          ></input>
          <input type="submit" value="입력" className="btn" style={{ flex: "1" }}></input>
        </form>
      </div>
    </div>
  );
}
