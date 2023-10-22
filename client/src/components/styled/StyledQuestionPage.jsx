import styled from "styled-components";

export const StyledQuestionPage = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 65vw;
  margin: 3rem auto 0 auto;
`;

export const StyledQuestionInner = styled.div`
  display: flex;
  justify-content: space-between;

  h5 {
    color: gray;
  }
`;

export const StyledlikeDislikeButtons = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid lightgray;
  padding-right: 0.8rem;
`;

export const StyledlikeDislikeButtonsNoHover = styled.div`
  display: flex;
  border-right: 1px solid lightgray;
  padding-right: 0.8rem;

  svg:hover {
    cursor: default;
    transform: none;
  }
`;

export const StyledAnswerCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  padding-left: 1rem;
  min-height: 50px;

  h6 {
    padding: 0.5rem 0;
  }
`;

export const AnswerInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Answer = styled.div`
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-start;
  white-space: pre-line;

  p {
    word-break: break-all;
  }
`;

export const StyledAnswerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;

  padding: 1rem;
  border-top: 1px solid lightgray;
  background-color: aliceblue;

  color: gray;

  h2,
  h3,
  h6,
  p {
    margin: 0;
    word-break: break-all;
  }
`;
