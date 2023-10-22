import styled from "styled-components";

export const StyledHomePage = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 65vw;
  margin: 3rem auto;

  a {
    font-size: 1.3rem;
  }
`;

export const StyledHomeTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 2rem;

  span {
    color: gray;
  }
`;

export const StyledSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid gray;
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;
`;

export const AnswersCountField = styled.div`
  border-right: 1px solid gray;
  padding-right: 1rem;
`;

export const QuestinCardInner = styled.div`
  width: 100%;
  padding: 0 0.5rem 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  h5 {
    margin: 0;
  }
  h3 {
    color: black;
    transition: all 0.2s ease-in-out;
    align-self: flex-start;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
      opacity: 0.6;
    }
  }
`;
