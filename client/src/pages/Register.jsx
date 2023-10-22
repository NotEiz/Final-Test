import { Formik, Field } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import { BsPerson, BsLock, BsArrowRepeat } from "react-icons/bs";
import {
  StyledForm,
  StyledLabelWrapper,
  StyledError,
  FormWrapper,
  InnerWrapper,
} from "../components/styled/StyledForm";
import { StyledInput } from "../components/styled/StyledInput";
import { RegUser } from "../API/User";
import { LOGIN_PATH } from "../routes/routeConsts";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const newUser = values;
      toast.success("Registration successful!");
      await RegUser(newUser);
      navigate(LOGIN_PATH);
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div className="loginBackground">
      <Formik
        initialValues={{
          name: "",
          surname: "",
          email: "",
          password: "",
          RepeatPassword: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={() =>
          Yup.object({
            name: Yup.string().required("Required").min(3),
            surname: Yup.string().required("Required").min(3),
            email: Yup.string().required("Required").email(),
            password: Yup.string().required("Required").min(8),
            RepeatPassword: Yup.string()
              .required("Required")
              .oneOf([Yup.ref("password")], "Passwords do not match"),
          })
        }
      >
        <StyledForm>
          <h1>Register</h1>
          <FormWrapper>
            <InnerWrapper>
              <StyledLabelWrapper>
                <label htmlFor="name">First Name</label>
                <StyledError name="name" component="div" />
              </StyledLabelWrapper>
              <StyledInput>
                <BsPerson />
                <Field
                  label="Name"
                  name="name"
                  placeholder="Type your Firstname"
                />
              </StyledInput>

              <StyledLabelWrapper>
                <label htmlFor="surname">Surname</label>
                <StyledError name="surname" component="div" />
              </StyledLabelWrapper>
              <StyledInput>
                <BsPerson />
                <Field
                  label="surname"
                  name="surname"
                  placeholder="Type your Surname"
                />
              </StyledInput>
            </InnerWrapper>
            <InnerWrapper>
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

              <StyledLabelWrapper>
                <label htmlFor="password">Repeat password</label>
                <StyledError name="RepeatPassword" component="div" />
              </StyledLabelWrapper>
              <StyledInput>
                <BsArrowRepeat />
                <Field
                  label="Repeat password"
                  name="RepeatPassword"
                  type="password"
                  placeholder="Repeat your password"
                />
              </StyledInput>
            </InnerWrapper>
          </FormWrapper>
          <button type="submit">REGISTER</button>
        </StyledForm>
      </Formik>
    </div>
  );
};

export default Register;
