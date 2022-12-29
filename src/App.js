import React, { useState } from "react";
import "./App.css";

// 객체형 컴포넌트 구성
export default function App() {
  // JSX 안에서 css 문법은 조금 차이가 있다.
  // 버튼 모양 바꾸는 css
  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  // 클릭시 발생하는 이벤트 동적(클릭스 취소선)이기 때문에 함수로 구현
  const getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    console.log("newTodoData", newTodoData);
    setTodoData({ todoData: newTodoData });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setValue({ value: e.target.value });
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
    this.setState({ todoData: [...todoData, newTodo], value: "" });
  };

  const handleCompletedChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData({ todoData: newTodoData });
  };

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>
        {todoData.map((data) => (
          // 리엑트에선 리스트 내 요소를 key로 구분해줘야함.
          <div style={getStyle(data.completed)} key={data.id}>
            <input type="checkbox" defaultChecked={false} onChange={() => handleCompletedChange(data.id)} /> {data.title}
            <button style={btnStyle} onClick={() => handleClick(data.id)}>
              x
            </button>
          </div>
        ))}

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
