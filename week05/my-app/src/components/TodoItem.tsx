"use client";

import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div<{ $done: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.$done &&
    css`
      border: 1px solid rgb(56, 134, 217);
      color: rgb(56, 134, 217);
    `}
`;

const Text = styled.div<{ $done: boolean }>`
  flex: 1;
  font-size: 19px;
  color: #495057;
  ${(props) =>
    props.$done &&
    css`
      color: #ced4da;
    `}
`;

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type Props = {
  id: number;
  done: boolean;
  text: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

function TodoItem({ id, done, text, setTodos }: Props) {
  //done, text, setTodos가 바뀔때만 리랜더링 됨
  const onToggle = useCallback(() => {
    //id가 바뀔때만 새로운 함수를 생성
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }, [setTodos, id]);

  const onRemove = useCallback(() => {
    //id가 바뀔때만 새로운 함수 생성함.
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, [setTodos, id]); //투두리스트 삭제하기(하나씩)

  return (
    <TodoItemBlock>
      <CheckCircle $done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text $done={done}>{text}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}
export default React.memo(TodoItem);
