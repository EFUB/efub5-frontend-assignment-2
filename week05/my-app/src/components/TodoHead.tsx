"use client";

import React from "react";
import styled from "styled-components";
import { useCallback, useMemo } from "react";

const TodoHeadBlock = styled.div`
  h1 {
    margin: 0;
    font-size: 36px;
    color: rgb(19, 63, 108);
  }
  .date {
    margin: 0;
    font-size: 30px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
`;

const TasksLeft = styled.div`
  color: rgb(56, 136, 217);
  font-size: 18px;
  margin-top: 40px;
  font-weight: bold;
`;

const ClearButton = styled.button`
  font-size: 16px;
  margin-top: 40px;
  background: rgb(56, 136, 217);
  padding: 6px 12px;

  &:hover {
    background: rgb(255, 170, 217);
  }
`;
//hover: 마우스 올렸을 때
//& 작성중인 컴포넌트 자신을 가리키는 표현임

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

function TodoHead({ todos, setTodos }: Props) {
  const today = useMemo(() => new Date(), []);

  const dateString = useMemo(
    () =>
      today.toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    [today]
  );

  const dayName = useMemo(
    () => today.toLocaleString("ko-KR", { weekday: "long" }),
    [today]
  );
  const undoneTasks = useMemo(
    () => todos.filter((todo) => !todo.done).length,
    [todos]
  ); //todo가 바뀔 때만 하도록
  //done 값이 fasle인 것만 필터링해서 가져옴.

  const handleClearCompleted = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.done));
  }, [setTodos]); //완료 항목 한 번에 삭제하기 => done이 false인 것만 남기기

  return (
    <TodoHeadBlock>
      <h1> To Do List🔥</h1>
      <h2 className="date">{dateString}</h2>
      <div className="day">{dayName}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TasksLeft>할 일 {undoneTasks}개 남음</TasksLeft>
        <ClearButton onClick={handleClearCompleted}>
          완료 항목 전체 삭제
        </ClearButton>
      </div>
    </TodoHeadBlock>
  );
}

export default React.memo(TodoHead);
