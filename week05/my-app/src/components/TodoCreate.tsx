"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { MdAdd } from "react-icons/md";

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

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

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AddButton = styled.button`
  background: rgb(56, 136, 217);
  border: none;
  color: white;
  border-radius: 30px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgb(255, 170, 217);
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
};

//할 일 추가, 삭제하기
function TodoCreate({ todos, setTodos }: Props) {
  //props: todos, setTodos를 받아오기
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>(Date.now()); //현재 시간으로 id 초기화
  const newItem: Todo = { id: id, text: text, done: false }; //새로 추가하는 할 일

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //제출 시 페이지 리로드를 방지하는 코드
    if (text) {
      setId(Date.now()); //Id를 현재 시간으로 세팅
      setTodos([...todos, newItem]); //기존 todos에 newItem을 추가함.
    }
    setText(""); //입력 창 초기화하기
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //이벤트 발생 시
    setText(e.target.value); //이벤트의 값을 setText로 넘겨줌, text 업데이트
  };

  return (
    <>
      <InsertFormPositioner>
        <InsertForm onSubmit={onSubmit}>
          <InputWrapper>
            <Input
              autoFocus
              onChange={handleChange}
              placeholder="할 일을 입력 후, Enter키나 + 버튼을 누르세요!"
              value={text}
            />
            <AddButton type="submit">+</AddButton>
          </InputWrapper>
        </InsertForm>
      </InsertFormPositioner>
    </>
  );
}

export default React.memo(TodoCreate);
