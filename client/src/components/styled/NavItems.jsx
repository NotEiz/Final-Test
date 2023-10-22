import styled from "styled-components";

export const StyledNavBar = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
  a {
    font-size: 1.3rem;
    font-weight: 800;
    color: gray;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .logout {
    font-size: 2rem;
    margin: 10px 0 0 10px;
  }
`;
