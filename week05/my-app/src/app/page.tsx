"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { createGlobalStyle } from "styled-components";
import TodoTemplate from "@/components/TodoTemplate";
import TodoHead from "@/components/TodoHead";
import TodoList from "@/components/TodoList";
import TodoCreate from "@/components/TodoCreate";
import styled from "styled-components";
import Link from "next/link";

//더미 데이터..
const TODO_LIST = [
  { id: 1, text: "이펍과제하기", done: false },
  { id: 2, text: "푸데푸데 잠자기", done: false },
  { id: 3, text: "숙영리와 온라인 데이트(...)하기^^", done: false },
];

const GlobalStyle = createGlobalStyle`
  body {
    background:rgb(205, 233, 255)
  }
`;

const GotoDiary = styled.button`
  font-size: 17px;
  color: rgb(255, 170, 217);
  background: rgb(255, 255, 255);
  padding: 8px;
  width: 10rem;

  &:hover {
    background: rgb(255, 170, 217);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const LOCAL_STORAGE_KEY = "todos_dom";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodoFilter = "all" | "done" | "undone";

function App() {
  const [todofilter, setTodofilter] = useState<TodoFilter>("all"); // all, done , undone 상태 중 전체 보기를 초기값으로 설정
  const [todos, setTodos] = useState<Todo[]>(TODO_LIST);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) setTodos(JSON.parse(saved) as Todo[]);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    } catch {}
  }, [todos]);

  //완료, 미완료 버튼 누르면 해당 상태만 보여줌
  const filteredTodos = useMemo(() => {
    if (todofilter === "done") return todos.filter((todo) => todo.done);
    if (todofilter === "undone") return todos.filter((todo) => !todo.done);
    return todos;
  }, [todos, todofilter]);
  //todos(목록)와 todofilter(완료/미완료/전체보기) 상태가 바뀌면 (버튼 클릭시 setfilter 실행되어 상태 바뀜)
  //이 함수가 실행됨.
  //-> 이 함수가 TodoList로 전달됨

  //임시 state 만들기
  const [tempState, setTempState] = useState(0);

  return (
    <>
      <GlobalStyle />
      <Container>
        <GotoDiary>
          <Link href="/diary">💌 한 줄 일기 📮</Link>
        </GotoDiary>

        <TodoTemplate>
          <TodoHead todos={todos} setTodos={setTodos} />
          <TodoList
            todos={filteredTodos}
            setTodos={setTodos}
            todofilter={todofilter}
            setTodofilter={setTodofilter}
          />
          <TodoCreate todos={todos} setTodos={setTodos} />
        </TodoTemplate>
      </Container>
    </>
  );
}

export default App;
