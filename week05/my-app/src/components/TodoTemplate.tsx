"use client";

import React, { useState } from "react";
import styled from "styled-components";
import TodoHead from "@components/TodoHead";
import TodoList from "@components/TodoList";
import TodoCreate from "@components/TodoCreate";

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';

interface TodoTemplateProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoTemplateBlock = styled.div`
  width: 420px;
  min-height: 650px;
  max-height: 700px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(15px);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  background: #f7fafc;
  padding: 10px 0;
  border-top: 1px solid #edf2f7;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  background: ${(props) => (props.$active ? "#6366f1" : "transparent")};
  color: ${(props) => (props.$active ? "white" : "#4a5568")};
  font-size: 14px;
  font-weight: 500;
  padding: 6px 16px;
  border-radius: 20px;
  margin: 0 5px;
  box-shadow: ${(props) => (props.$active ? "0 2px 8px rgba(99, 102, 241, 0.3)" : "none")};
  &:hover {
    background: ${(props) => (props.$active ? "#6366f1" : "#edf2f7")};
  }
`;

function TodoTemplate({ todos, setTodos }: TodoTemplateProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const handleFilterChange = (newFilter: FilterType): void => {
    setFilter(newFilter);
  };

  return (
    <TodoTemplateBlock>
      <TodoHead todos={todos} />
      <FilterBar>
        <FilterButton $active={filter === 'all'} onClick={() => handleFilterChange('all')}>전체</FilterButton>
        <FilterButton $active={filter === 'active'} onClick={() => handleFilterChange('active')}>진행 중</FilterButton>
        <FilterButton $active={filter === 'completed'} onClick={() => handleFilterChange('completed')}>완료됨</FilterButton>
      </FilterBar>
      <TodoList todos={todos} setTodos={setTodos} filter={filter} />
      <TodoCreate todos={todos} setTodos={setTodos} />
    </TodoTemplateBlock>
  );
}

export default TodoTemplate;