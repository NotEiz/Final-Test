import styled from "styled-components";

export const StyledButton = styled.button`
  font-weight: 900;
  width: 150px;
  padding: 0.6rem;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  background-color: #32a4dd;
  transition: all 200ms ease-in-out;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

export const SmallerButton = styled(StyledButton)`
  width: 100px;
  padding: 0.2rem 0.2rem;
`;
