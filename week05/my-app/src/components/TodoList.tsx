"use client";

import React, { useMemo, useCallback } from "react";
import styled from "styled-components";
import TodoItem from "@components/Todoitem";
import { Todo, FilterType } from "@components/TodoTemplate";

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: FilterType;
}

const TodoListBlock = styled.div`
  flex: 1;
  padding: 16px 24px;
  overflow-y: auto;
  background: white;
  max-height: 400px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 32px 0;
  color: #a0aec0;
  font-size: 16px;
  p {
    margin: 0;
    margin-top: 12px;
  }
`;

const EmptyIcon = styled.div`
  font-size: 32px;
  margin-bottom: 16px;
  color: #cbd5e1;
`;

// 할 일 목록을 보여주는 컴포넌트
function TodoList({ todos, setTodos, filter }: TodoListProps) {
  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((todo: Todo) => !todo.done);
    if (filter === "completed") return todos.filter((todo: Todo) => todo.done);
    return todos;
  }, [todos, filter]);

  const onToggle = useCallback(
    (id: number) => {
      setTodos((prevTodos: Todo[]) =>
        prevTodos.map((todo: Todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      );
    },
    [setTodos]
  );

  return (
    <TodoListBlock>
      {filteredTodos.length === 0 ? (
        <EmptyMessage>
          <EmptyIcon>📝</EmptyIcon>
          <p>할 일을 추가해보세요.</p>
        </EmptyMessage>
      ) : (
        filteredTodos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} setTodos={setTodos} onToggle={onToggle} />
        ))
      )}
    </TodoListBlock>
  );
}

export default React.memo(TodoList);