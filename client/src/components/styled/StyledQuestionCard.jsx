import styled from "styled-components";

export const StyledQuestionCard = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 80px;
  padding: 1rem;
  background-color: aliceblue;
  border-top: 1px solid lightgray;

  color: gray;

  h2,
  h3,
  p {
    margin: 0;
  }

  a {
    text-decoration: none;
    align-self: flex-start;
    color: gray;

    &:hover {
      text-decoration: underline;
      transform: none;
    }
  }
`;

export const StyledQuestionInner = styled.div`
  display: flex;
  justify-content: flex-end;
`;
