import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  StyledError,
  StyledNewQuestion,
  StyledLabelWrapper,
} from "../components/styled/StyledForm";
import { FetchQuestion, updateQuestion } from "../API/Questions";

import { SmallerButton } from "../components/styled/StyledButton";
import { useParams } from "react-router-dom";
import { HOME_PATH } from "../routes/routeConsts";
import { getCurrentDate } from "../components/DateGenerator";
import { StyledInput } from "../components/styled/StyledInput";
import { toast } from "react-toastify";

const EditQuestionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    FetchQuestion(id)
      .then((response) => setQuestion(response))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleEditQuestion = async (values) => {
    try {
      const editedQuestion = {
        ...values,
        isEdited: true,
        editedAt: getCurrentDate(),
      };
      toast.success("Question edited successfully!");
      await updateQuestion(id, editedQuestion);
      navigate(HOME_PATH);
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  const getInitialValues = () => ({
    title: question.title,
    question: question.question,
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("Required").min(3).max(38),
    question: Yup.string().required("Required").min(10),
  });

  return (
    <div>
      {!isLoading ? (
        <Formik
          initialValues={getInitialValues()}
          onSubmit={handleEditQuestion}
          validationSchema={validationSchema}
        >
          <StyledNewQuestion>
            <h1>Edit Question</h1>

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

            <SmallerButton type="submit">Edit</SmallerButton>
          </StyledNewQuestion>
        </Formik>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default EditQuestionForm;
