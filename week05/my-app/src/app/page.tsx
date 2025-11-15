"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import TodoTemplate, { Todo } from "@components/TodoTemplate";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding: 15px 30px;
  
  a {
    text-decoration: none;
    color: white;
    font-weight: 600;
    font-size: 16px;
    padding: 8px 16px;
    transition: opacity 0.3s ease;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isClient]);

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Navigation>
          <Link href="/">Todo List</Link>
          <Link href="/weather">현재 시각 & 운세</Link>
        </Navigation>
        <TodoTemplate todos={todos} setTodos={setTodos} />
      </AppContainer>
    </>
  );
}

export default App;