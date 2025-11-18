import React from "react";
import styled from "styled-components";

const TodoTemplateBlock = styled.div`
  width: 530px;
  height: 768px;

  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

type Props = {
  children: React.ReactNode; // 부모 컴포넌트가 감싸서 전달하는 콘텐츠~ 가장 포괄적 타입을 사용함
};

function TodoTemplate({ children }: Props) {
  return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;
