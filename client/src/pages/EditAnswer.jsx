import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../contexts/userContext";
import {
  StyledAnswer,
  StyledError,
  StyledLabelWrapper,
} from "../components/styled/StyledForm";
import { StyledButton } from "../components/styled/StyledButton";
import { FetchAnswer, UpdateAnswer } from "../API/Answers";

import { getCurrentDate } from "../components/DateGenerator";
import { QUESTION_PATH } from "../routes/routeConsts";
import { toast } from "react-toastify";
const EditAnswer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState([]);
  const { isLoggedIn } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    FetchAnswer(id)
      .then((response) => setAnswer(response))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [id]);

  const getInitialValues = () => ({
    answer: answer.answer,
  });

  const handleEditAnswer = async (values) => {
    try {
      console.log(values);
      const editedAnswer = {
        ...values,
        isEdited: true,
        editedAt: getCurrentDate(),
      };
      toast.success("Answer edited successfully!");
      await UpdateAnswer(id, editedAnswer);
      navigate(generatePath(QUESTION_PATH, { id: answer.questionID }));
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div>
      {!isLoading ? (
        <Formik
          initialValues={getInitialValues()}
          onSubmit={handleEditAnswer}
          validationSchema={() =>
            Yup.object({
              answer: Yup.string().required("Required").min(10),
            })
          }
        >
          <StyledAnswer>
            <StyledLabelWrapper>
              <label htmlFor="answer">Edit Your Answer</label>
              <StyledError name="answer" component="div" />
            </StyledLabelWrapper>

            <Field
              as="textarea"
              label="answer"
              name="answer"
              placeholder="Type your answer"
              rows="5"
              cols="40"
            />
            {!isLoggedIn ? (
              <h5>You must be logged in to answer</h5>
            ) : (
              <StyledButton type="submit">Edit Answer</StyledButton>
            )}
          </StyledAnswer>
        </Formik>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default EditAnswer;
