import React from "react";

export default function Lists({ todoData, setTodoData }) {
  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    console.log("newTodoData", newTodoData);
    setTodoData(newTodoData);
  };

  const handleCompletedChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
  };

  return (
    <div>
      {todoData.map((data) => (
        // 리엑트에선 리스트 내 요소를 key로 구분해줘야함.
        <div key={data.id}>
          <div className={"flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded"}>
            <div className="items-center">
              <input type="checkbox" defaultChecked={data.completed} onChange={() => handleCompletedChange(data.id)} />{" "}
              <span className={data.completed && "line-through"}>{data.title}</span>
            </div>
            <div className="items-center">
              <button onClick={() => handleClick(data.id)}>x</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
