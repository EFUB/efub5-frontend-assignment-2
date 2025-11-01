"use client";

import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { MdDone, MdEdit, MdClose } from "react-icons/md";
import { Todo } from "@components/TodoTemplate";

interface TodoItemProps {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onToggle: (id: number) => void;
}

const TodoItemBlock = styled.div<{ $done: boolean }>`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  margin: 8px 0;
  background: ${props => props.$done ? '#f8f7ff' : 'white'};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CheckCircle = styled.div<{ $done: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${props => props.$done ? '#6366f1' : '#cbd5e1'};
  background: ${props => props.$done ? '#6366f1' : 'white'};
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  cursor: pointer;
  color: white;
  transition: all 0.2s;
  &:hover {
    border-color: #6366f1;
    transform: scale(1.1);
  }
`;

const Text = styled.div<{ $done: boolean }>`
  flex: 1;
  font-size: 16px;
  color: ${props => props.$done ? '#a0aec0' : '#2d3748'};
  text-decoration: ${props => props.$done ? 'line-through' : 'none'};
  transition: color 0.2s;
  word-break: break-word;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button<{ 
  color?: string; 
  $hoverBg?: string; 
  $hoverColor?: string; 
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color || "#cbd5e1"};
  font-size: 18px;
  background: transparent;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-left: 4px;
  transition: all 0.2s;
  &:hover {
    background: ${(props) => props.$hoverBg || "#f1f5f9"}; // $hoverBg로 변경
    color: ${(props) => props.$hoverColor || props.color || "#4a5568"}; // $hoverColor로 변경
  }
`;

const EditInput = styled.input`
  flex: 1;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #6366f1;
  outline: none;
  margin-right: 12px;
  padding: 8px 4px;
  color: #2d3748;
  background: transparent;
`;

// 휴지통 이모지 버튼
const DeleteButton = styled.button`
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-left: 4px;
  &:hover {
    transform: scale(1.1);
  }
`;

// props: todo (할 일 객체), setTodos (할 일 목록 업데이트 함수)
function TodoItem({ todo, setTodos, onToggle }: TodoItemProps) {
  const { id, done, text } = todo;

  const onRemove = useCallback(() => {
    setTodos((prev: Todo[]) => prev.filter((t: Todo) => t.id !== id));
  }, [id, setTodos]);

  return (
    <TodoItemBlock $done={done}>
      <CheckCircle $done={done} onClick={() => onToggle(id)}>
        {done && <MdDone />}
      </CheckCircle>
      <Text $done={done}>{text}</Text>
      <DeleteButton onClick={onRemove}>
        <MdClose />
      </DeleteButton>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);