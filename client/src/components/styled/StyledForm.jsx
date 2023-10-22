import styled from "styled-components";
import { Form, ErrorMessage } from "formik";

export const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 8px;
  max-width: 600px;
  margin: 10rem auto;
  transform: translateY(-100px);
  background-color: #ffffff;
  gap: 2rem;
  padding: 3rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  h1 {
    margin: 0 0 2rem 0;
    align-self: center;
  }

  a {
    font-size: 0.8rem;
    align-self: flex-end;
    color: gray;
    &:hover {
      transform: none;
    }
  }

  button {
    margin-top: 1rem;
    border: none;
    padding: 0.7rem 1rem;
    border-radius: 10px;
    font-weight: 800;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const StyledAnswer = styled(StyledForm)`
  width: 100%;
  padding: 1rem;
  gap: 1rem;
`;

export const StyledLogin = styled(StyledForm)`
  width: 400px;
  gap: 0;
`;

export const StyledNewQuestion = styled(StyledLogin)`
  margin: 5rem auto;
  transform: none;
  display: block;
`;

export const FormWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledLabelWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledError = styled(ErrorMessage)`
  font-size: 0.7rem;
  color: red;
  margin-left: 1rem;
`;

export const StyledQuestionForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;
