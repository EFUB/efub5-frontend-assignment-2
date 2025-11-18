import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 20px;
  overflow-y: auto;
`;

const TodoListFilter = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  margin: 3px 0px 20px;
  font-size: 13px;

  button {
    background: rgb(234, 243, 255);
    color: rgb(63, 72, 84);
    padding: 7px;
  }

  button.active {
    background: rgb(120, 188, 255);
    color: rgb(63, 63, 63);
    font-weight: bold;
  }
`;

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todofilter: "all" | "undone" | "done";
  setTodofilter: React.Dispatch<
    React.SetStateAction<"all" | "undone" | "done">
  >;
};

function TodoList({ todos, setTodos, todofilter, setTodofilter }: Props) {
  //투두 리스트 표시하기

  return (
    <TodoListBlock>
      <TodoListFilter>
        <button
          className={todofilter === "all" ? "active" : ""}
          onClick={() => setTodofilter("all")}
        >
          전체보기
        </button>
        <button
          className={todofilter === "undone" ? "active" : ""}
          onClick={() => setTodofilter("undone")}
        >
          미완료
        </button>
        <button
          className={todofilter === "done" ? "active" : ""}
          onClick={() => setTodofilter("done")} //클릭시 todofilter가 done으로 바뀜.
        >
          완료
        </button>
      </TodoListFilter>

      {todos.map(
        (
          todo //todoItem에 todo의 정보를 전달
        ) => (
          <TodoItem
            id={todo.id} //todo의 id 가져오기
            text={todo.text} //todo의 text 가져오기
            done={todo.done} //todo의 완료 여부 가져오기
            key={todo.id} //todo의 key는 id값. id값 가져오기!
            setTodos={setTodos}
          />
        )
      )}
    </TodoListBlock>
  );
}

export default React.memo(TodoList);
