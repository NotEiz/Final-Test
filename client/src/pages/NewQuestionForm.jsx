import { useContext } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  StyledError,
  StyledNewQuestion,
  StyledLabelWrapper,
} from "../components/styled/StyledForm";
import { CreateNewQuestion } from "../API/Questions";
import { UserContext } from "../contexts/userContext";
import { SmallerButton } from "../components/styled/StyledButton";
import { getCurrentDate } from "../components/DateGenerator";
import { HOME_PATH } from "../routes/routeConsts";
import { StyledInput } from "../components/styled/StyledInput";

const NewQuestionForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleAddNewQuestion = async (values) => {
    try {
      const newQuestion = {
        ...values,
        writerID: user.data._id,
        name: user.data.name,
        surname: user.data.surname,
        isEdited: false,
        createTime: getCurrentDate(),
        editedAt: null,
      };
      toast.success("Question added successfully!");
      await CreateNewQuestion(newQuestion);
      navigate(HOME_PATH);
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required").min(3).max(38),
    question: Yup.string("Required").required("Required").min(10),
  });

  return (
    <div>
      <Formik
        initialValues={{ title: "", question: "" }}
        onSubmit={handleAddNewQuestion}
        validationSchema={validationSchema}
      >
        <StyledNewQuestion>
          <h1>Ask Question</h1>

          <StyledLabelWrapper>
            <label htmlFor="title">Title</label>
            <StyledError name="title" component="div" />
          </StyledLabelWrapper>
          <StyledInput>
            <Field label="title" name="title" placeholder="Title..." />
          </StyledInput>

          <StyledLabelWrapper>
            <label htmlFor="question">Question</label>
            <StyledError name="question" component="div" />
          </StyledLabelWrapper>
          <StyledInput>
            <Field
              component="textarea"
              as="textarea"
              label="question"
              name="question"
              placeholder="Question..."
              rows="5"
              cols="40"
            />
          </StyledInput>

          <SmallerButton type="submit">Ask</SmallerButton>
        </StyledNewQuestion>
      </Formik>
    </div>
  );
};

export default NewQuestionForm;
