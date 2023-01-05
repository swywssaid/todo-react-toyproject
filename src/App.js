import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";

// 객체형 컴포넌트 구성
export default function App() {
  const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];
  const [todoData, setTodoData] = useState(initialTodoData);
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
    localStorage.setItem("todoData", JSON.stringify([...todoData, newTodo]));
    setValue("");
  };

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem("todoData", JSON.stringify([]));
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 bg-white rounded shadow-md:w-3/4 md:max-w-lg lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1 className="text-3xl font-bold underline">할 일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>
        <Lists todoData={todoData} setTodoData={setTodoData} />
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} setTodoData={setTodoData} />
      </div>
    </div>
  );
}
