import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  const handleEnd = (result) => {
    // result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함된다.
    console.log(result);

    // 목적지가 없으면(이벤트 취소) 이 함수를 종료합니다.
    if (!result.destination) return;

    // 리엑트 불변성을 지켜주기 위해 새로운 todoData 생성
    const newTodoData = [...todoData];

    // 1. 변경시키는 아이템을 배열에서 지운다.
    // 2. return 값으로 지워진 아이템을 잡아준다.
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    // 원하는 자리에 reorderedItem을 insert 한다.
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
  };

  return (
    <DragDropContext onDragEnd={handleEnd}>
      <Droppable droppableId="to-dos">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {todoData.map((data, index) => (
              // 리엑트에선 리스트 내 요소를 key로 구분해줘야함.
              <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    key={data.id}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"}
                  > flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded`}
                  >
                    <div className="items-center">
                      <input type="checkbox" defaultChecked={data.completed} onChange={() => handleCompletedChange(data.id)} />{" "}
                      <span className={data.complited ? "line-through" : undefined}>{data.title}</span>
                    </div>
                    <div className="items-center">
                      <button className="px-4 py-2 float-right" onClick={() => handleClick(data.id)}>
                        x
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
