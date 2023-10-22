import { useContext, useState } from "react";
import { Formik, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import styled from "styled-components";
import { BsPerson, BsLock } from "react-icons/bs";
import {
  StyledLabelWrapper,
  StyledError,
  StyledLogin,
} from "../components/styled/StyledForm";
import { StyledInput } from "../components/styled/StyledInput";
import { HOME_PATH, REGISTER_PATH } from "../routes/routeConsts";

import { loginUser } from "../API/User";
import { UserContext } from "../contexts/userContext";
import { toast } from "react-toastify";

const RegisterWrapper = styled.div`
  margin-top: 0.7;
  display: flex;
  flex-direction: column;
  align-items: center;

  h5 {
    margin: 10px;
  }

  a {
    align-self: center;
  }
`;

const Error = styled.p`
  color: red;
`;

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (values) => {
    try {
      const response = await loginUser(values);

      {
        response && setUser(response);
      }
      navigate(HOME_PATH);
      toast.success("Login successful!");
      setError(!response ? "User email or pasword is incorrect" : "");
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={() =>
          Yup.object({
            email: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
          })
        }
      >
        <StyledLogin>
          <h1>Login</h1>

          <StyledLabelWrapper>
            <label htmlFor="email">Email</label>
            <StyledError name="email" component="div" />
          </StyledLabelWrapper>

          <StyledInput>
            <BsPerson />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="Type your email"
            />
          </StyledInput>

          <StyledLabelWrapper>
            <label htmlFor="password">Password</label>
            <StyledError name="password" component="div" />
          </StyledLabelWrapper>
          <StyledInput>
            <BsLock />
            <Field
              label="Password"
              name="password"
              type="password"
              placeholder="Type your password"
            />
          </StyledInput>
          {error && <Error>{error}</Error>}
          <button type="submit">LOGIN</button>
          <RegisterWrapper>
            <h5>or</h5>
            <Link to={REGISTER_PATH}>Register</Link>
          </RegisterWrapper>
        </StyledLogin>
      </Formik>
    </div>
  );
};

export default Login;
