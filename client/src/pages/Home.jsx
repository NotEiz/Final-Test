import { useState, useContext, useEffect } from "react";
import { useNavigate, generatePath } from "react-router-dom";
import {
  StyledHomePage,
  StyledHomeTop,
  StyledSelect,
  AnswersCountField,
  QuestinCardInner,
} from "../components/styled/StyledHomePage";
import { UserContext } from "../contexts/userContext";
import { StyledButton } from "../components/styled/StyledButton";
import {
  StyledQuestionCard,
  StyledQuestionInner,
} from "../components/styled/StyledQuestionCard";
import { FetchQuestions, DeleteQuestion } from "../API/Questions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  EDIT_QUESTION_PATH,
  NEW_QUESTION_PATH,
  QUESTION_PATH,
} from "../routes/routeConsts";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, user } = useContext(UserContext);
  const [asc, setAsc] = useState(true);
  const [answered, setAnswered] = useState("false");

  const answeredQuestions = questions.filter(
    (question) => question.answers.length > 0
  );
  const notAnsweredQuestions = questions.filter(
    (question) => question.answers.length === 0
  );

  useEffect(() => {
    FetchQuestions(asc)
      .then((res) => setQuestions(res))
      .catch((err) => console.log(err));
    setIsLoading(false);
  }, [asc]);

  const handleDelete = async (id) => {
    try {
      setQuestions(questions.filter((question) => question._id !== id));
      await DeleteQuestion(id);

      toast.success("Question deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  if (answered === "false")
    return (
      <div>
        <StyledHomePage>
          {isLoggedIn ? (
            <StyledButton onClick={() => navigate(NEW_QUESTION_PATH)}>
              Ask Question
            </StyledButton>
          ) : (
            <h2>Please Login to ask question</h2>
          )}
          <StyledHomeTop>
            <h2>Questions({questions.length})</h2>
            {questions.length > 0 && (
              <div>
                <StyledSelect onChange={(e) => setAnswered(e.target.value)}>
                  <option value="false">All Questions</option>
                  <option value="answered">Answered</option>
                  <option value="notAnswered">Not Answered</option>
                </StyledSelect>
                <h4 onClick={() => setAsc(!asc)}>
                  Sort<span>({asc ? "oldest" : "newest"})</span>
                </h4>
              </div>
            )}
          </StyledHomeTop>

          {isLoading ? (
            <h1>Loading...</h1>
          ) : questions.length > 0 ? (
            questions.map((question) => (
              <StyledQuestionCard key={question._id}>
                <AnswersCountField>
                  <h6>Answers({question.answers.length})</h6>
                </AnswersCountField>
                <QuestinCardInner>
                  <h3
                    onClick={() => {
                      navigate(
                        generatePath(QUESTION_PATH, {
                          id: question._id,
                        })
                      );
                    }}
                  >
                    {question.title}
                  </h3>

                  <div>
                    {user
                      ? question.writerID === user.data._id && (
                          <StyledQuestionInner>
                            <EditIcon
                              onClick={() =>
                                navigate(
                                  generatePath(EDIT_QUESTION_PATH, {
                                    id: question._id,
                                  })
                                )
                              }
                            />

                            <DeleteIcon
                              onClick={() => handleDelete(question._id)}
                            />
                          </StyledQuestionInner>
                        )
                      : null}

                    <h5>
                      {question.name}_{question.surname}{" "}
                      {question.isEdited ? "edited" : "asked"}{" "}
                      {question.editedAt
                        ? question.editedAt
                        : question.createTime}
                    </h5>
                  </div>
                </QuestinCardInner>
              </StyledQuestionCard>
            ))
          ) : (
            <h1>There are no questions</h1>
          )}
        </StyledHomePage>
      </div>
    );

  if (answered === "answered") {
    return (
      <div>
        <StyledHomePage>
          {isLoggedIn ? (
            <StyledButton onClick={() => navigate(NEW_QUESTION_PATH)}>
              Ask Question
            </StyledButton>
          ) : (
            <h2>Please Login to ask question</h2>
          )}
          <StyledHomeTop>
            <h2>Questions({questions.length})</h2>
            <div>
              <StyledSelect onChange={(e) => setAnswered(e.target.value)}>
                <option value="false">All Questions</option>
                <option value="answered">Answered</option>
                <option value="notAnswered">Not Answered</option>
              </StyledSelect>
              <h4 onClick={() => setAsc(!asc)}>
                Sort<span>({asc ? "oldest" : "newest"})</span>
              </h4>
            </div>
          </StyledHomeTop>

          {isLoading ? (
            <h1>Loading...</h1>
          ) : questions.length > 0 ? (
            answeredQuestions.map((question) => (
              <StyledQuestionCard key={question._id}>
                <AnswersCountField>
                  <h6>Answers({question.answers.length})</h6>
                </AnswersCountField>
                <QuestinCardInner>
                  <h3
                    onClick={() => {
                      navigate(
                        generatePath(QUESTION_PATH, {
                          id: question._id,
                        })
                      );
                    }}
                  >
                    {question.title}
                  </h3>

                  <div>
                    {user
                      ? question.writerID === user.data._id && (
                          <StyledQuestionInner>
                            <EditIcon
                              onClick={() =>
                                navigate(
                                  generatePath(EDIT_QUESTION_PATH, {
                                    id: question._id,
                                  })
                                )
                              }
                            />

                            <DeleteIcon
                              onClick={() => handleDelete(question._id)}
                            />
                          </StyledQuestionInner>
                        )
                      : null}

                    <h5>
                      {question.name}_{question.surname}{" "}
                      {question.isEdited ? "edited" : "asked"}{" "}
                      {question.editedAt
                        ? question.editedAt
                        : question.createTime}
                    </h5>
                  </div>
                </QuestinCardInner>
              </StyledQuestionCard>
            ))
          ) : questions.length === 0 ? (
            <h1>Loading...</h1>
          ) : (
            <h1>There are no questions</h1>
          )}
        </StyledHomePage>
      </div>
    );
  }
  if (answered === "notAnswered") {
    return (
      <div>
        <StyledHomePage>
          {isLoggedIn ? (
            <StyledButton onClick={() => navigate(NEW_QUESTION_PATH)}>
              Ask Question
            </StyledButton>
          ) : (
            <h2>Please Login to ask question</h2>
          )}
          <StyledHomeTop>
            <h2>Questions({questions.length})</h2>
            <div>
              <StyledSelect onChange={(e) => setAnswered(e.target.value)}>
                <option value="false">All Questions</option>
                <option value="answered">Answered</option>
                <option value="notAnswered">Not Answered</option>
              </StyledSelect>
              <h4 onClick={() => setAsc(!asc)}>
                Sort<span>({asc ? "oldest" : "newest"})</span>
              </h4>
            </div>
          </StyledHomeTop>

          {isLoading ? (
            <h1>Loading...</h1>
          ) : questions.length > 0 ? (
            notAnsweredQuestions.map((question) => (
              <StyledQuestionCard key={question._id}>
                <AnswersCountField>
                  <h6>Answers({question.answers.length})</h6>
                </AnswersCountField>
                <QuestinCardInner>
                  <h3
                    onClick={() => {
                      navigate(
                        generatePath(QUESTION_PATH, {
                          id: question._id,
                        })
                      );
                    }}
                  >
                    {question.title}
                  </h3>

                  <div>
                    {user
                      ? question.writerID === user.data._id && (
                          <StyledQuestionInner>
                            <EditIcon
                              onClick={() =>
                                navigate(
                                  generatePath(EDIT_QUESTION_PATH, {
                                    id: question._id,
                                  })
                                )
                              }
                            />

                            <DeleteIcon
                              onClick={() => handleDelete(question._id)}
                            />
                          </StyledQuestionInner>
                        )
                      : null}

                    <h5>
                      {question.name}_{question.surname}{" "}
                      {question.isEdited ? "edited" : "asked"}{" "}
                      {question.editedAt
                        ? question.editedAt
                        : question.createTime}
                    </h5>
                  </div>
                </QuestinCardInner>
              </StyledQuestionCard>
            ))
          ) : questions.length === 0 ? (
            <h1>Loading...</h1>
          ) : (
            <h1>There are no questions</h1>
          )}
        </StyledHomePage>
      </div>
    );
  }
};

export default Home;
