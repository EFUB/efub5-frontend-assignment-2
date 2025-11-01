"use client";

import React from "react";
import styled from "styled-components";
import { FaCalendarAlt } from "react-icons/fa";
import { Todo } from "@components/TodoTemplate";

interface TodoHeadProps {
  todos: Todo[];
}

const TodoHeadBlock = styled.div`
  padding: 32px 32px 24px;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

const TitleArea = styled.div`
  margin-bottom: 24px;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #4c1d95;
    font-weight: 700;
    letter-spacing: -0.5px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .subtitle {
    font-size: 16px;
    color: #6b7280;
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    svg {
      margin-right: 8px;
      color: #6366f1;
    }
  }
`;

const ProgressArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f7ff;
  border-radius: 16px;
  padding: 16px 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const TasksInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .count {
    font-size: 24px;
    font-weight: 700;
    color: #6366f1;
  }
  .label {
    font-size: 14px;
    color: #6b7280;
  }
`;

function TodoHead({ todos }: TodoHeadProps) {
  const today = new Date();
  const dateString = today.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleString("ko-KR", { weekday: "long" });
  const undoneTasks = todos.filter((todo) => !todo.done);
  const completedTasks = todos.filter((todo) => todo.done);

  return (
    <TodoHeadBlock>
      <TitleArea>
        <h1>My Tasks</h1>
        <div className="subtitle">
          <FaCalendarAlt />
          {dateString} ({dayName})
        </div>
      </TitleArea>
      <ProgressArea>
        <TasksInfo>
          <div className="count">{undoneTasks.length}</div>
          <div className="label">남은 할 일</div>
        </TasksInfo>
        <TasksInfo>
          <div className="count">{completedTasks.length}</div>
          <div className="label">완료한 일</div>
        </TasksInfo>
      </ProgressArea>
    </TodoHeadBlock>
  );
}

export default React.memo(TodoHead); // React.memo로 최적화