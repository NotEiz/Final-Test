import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, generatePath } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { FetchQuestion } from "../API/Questions";
import { FetchAnswers, DeleteAnswer, UpdateAnswer } from "../API/Answers";
import { UserContext } from "../contexts/userContext";
import {
  StyledQuestionPage,
  StyledQuestionInner,
  StyledAnswerWrapper,
  StyledlikeDislikeButtons,
  StyledlikeDislikeButtonsNoHover,
  StyledAnswerCard,
  Answer,
  AnswerInner,
} from "../components/styled/StyledQuestionPage";
import {
  StyledAnswer,
  StyledLabelWrapper,
  StyledError,
} from "../components/styled/StyledForm";
import { StyledButton } from "../components/styled/StyledButton";
import { CreateNewAnswer } from "../API/Answers";
import { getCurrentDate } from "../components/DateGenerator";
import { EDIT_ANSWER_PATH } from "../routes/routeConsts";

const Question = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    FetchAnswers(id)
      .then((response) => setAnswers(response))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => {
    FetchQuestion(id)
      .then((response) => setQuestion(response))
      .catch((error) => console.error(error));
  }, [id]);

  const handleSubmit = async (values, formikHelpers) => {
    try {
      const newAnswer = {
        ...values,
        writerID: user.data._id,
        questionID: id,
        name: user.data.name,
        surname: user.data.surname,
        isEdited: false,
        createTime: getCurrentDate(),
        editedAt: null,
        isLiked: false,
        isDisliked: false,
      };
      toast.success("Answer was successfully added");
      await CreateNewAnswer(newAnswer);
      formikHelpers.resetForm();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const handleLike = async (id, isLiked) => {
    UpdateAnswer(id, { isLiked: !isLiked, isDisliked: false });
  };

  const handleDislike = async (id, isDisliked) => {
    UpdateAnswer(id, { isDisliked: !isDisliked, isLiked: false });
  };

  const handleDelete = async (id) => {
    try {
      toast.success("Answer was successfully deleted");
      setAnswers((prev) => prev.filter((answer) => answer._id !== id));
      await DeleteAnswer(id);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <>
      <StyledQuestionPage>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <h2>{question.title}</h2>
            <p>{question.question}</p>
            <StyledQuestionInner>
              <h5>
                {question.name}_{question.surname}{" "}
                {question.isEdited ? "edited" : "asked"} {question.createTime}
              </h5>
            </StyledQuestionInner>
            {answers[0].answers.map((answer) => (
              <StyledAnswerWrapper key={answer._id}>
                {user && user.data._id === question.writerID && (
                  <StyledlikeDislikeButtons>
                    <ThumbUpAltIcon
                      onClick={() => handleLike(answer._id, answer.isLiked)}
                    />

                    <ThumbDownAltIcon
                      onClick={() =>
                        handleDislike(answer._id, answer.isDisliked)
                      }
                    />
                  </StyledlikeDislikeButtons>
                )}

                {user ? (
                  user.data._id !== question.writerID && (
                    <StyledlikeDislikeButtonsNoHover>
                      {answer.isLiked && <ThumbUpAltIcon />}
                      {answer.isDisliked && <ThumbDownAltIcon />}
                    </StyledlikeDislikeButtonsNoHover>
                  )
                ) : (
                  <StyledlikeDislikeButtonsNoHover>
                    {answer.isLiked && <ThumbUpAltIcon />}
                    {answer.isDisliked && <ThumbDownAltIcon />}
                  </StyledlikeDislikeButtonsNoHover>
                )}

                <StyledAnswerCard>
                  <Answer>
                    <p>{answer.answer}</p>
                  </Answer>

                  <AnswerInner>
                    {user
                      ? answer.writerID === user.data._id && (
                          <StyledQuestionInner>
                            <EditIcon
                              onClick={() =>
                                navigate(
                                  generatePath(EDIT_ANSWER_PATH, {
                                    id: answer._id,
                                  })
                                )
                              }
                            />

                            <DeleteIcon
                              onClick={() => handleDelete(answer._id)}
                            />
                          </StyledQuestionInner>
                        )
                      : null}
                    <h6>
                      {answer.name}_{answer.surname}{" "}
                      {answer.isEdited ? "edited answer" : "answered"}{" "}
                      {answer.createTime}
                    </h6>
                  </AnswerInner>
                </StyledAnswerCard>
              </StyledAnswerWrapper>
            ))}
            <Formik
              initialValues={{ answer: "" }}
              onSubmit={handleSubmit}
              validationSchema={() =>
                Yup.object({
                  answer: Yup.string().required("Required").min(10),
                })
              }
            >
              <StyledAnswer>
                <StyledLabelWrapper>
                  <label htmlFor="answer">Your Answer</label>
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
                  <StyledButton type="submit">Answer</StyledButton>
                )}
              </StyledAnswer>
            </Formik>
          </div>
        )}
      </StyledQuestionPage>
    </>
  );
};

export default Question;
