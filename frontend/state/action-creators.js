// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios";
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
} from "./action-types";

export function moveClockwise() {
  return { type: "MOVE_CLOCKWISE" };
}
export function moveCounterClockwise() {
  return { type: "MOVE_COUNTERCLOCKWISE" };
}

export function selectAnswer(answerID) {
  return { type: "SET_SELECTED_ANSWER", payload: answerID };
}

export function setMessage(message) {
  return { type: "SET_INFO_MESSAGE", payload: message };
}

export function setQuiz(quiz) {
  return { type: "SET_QUIZ_INTO_STATE", payload: quiz };
}

export function inputChange(fieldId, value) {
  return { type: INPUT_CHANGE, payload: { fieldId, value } };
}

export function resetForm() {
  return { type: RESET_FORM };
}
//git add -a

// ❗ Async action creators

export const createQuestion = (question) => {
  return function (dispatch, getState) {
    axios
      .post("http://localhost:9000/api/quiz", question)
      .then((response) => {
        const currentQuestions = getState().quiz;

        const updatedQuestions = [...currentQuestions, response.data];

        dispatch({ type: SET_QUIZ_INTO_STATE, payload: updatedQuestions });

        dispatch({
          type: SET_INFO_MESSAGE,
          payload: "New question added successfully",
        });
      })
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data.message
          : error.message;
        dispatch({ type: SET_INFO_MESSAGE, payload: errorMessage });

        console.error(errorMessage);
      });
  };
};

export function fetchQuiz() {
  return function (dispatch) {
    dispatch(resetForm());
    fetch("http://localhost:9000/api/quiz/next")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch quiz");
        }
        return response.json();
      })
      .then((quiz) => {
        dispatch(setQuiz(quiz));
      })
      .catch((error) => {
        dispatch(setMessage(error.message));
      });
  };
}

export function postAnswer(quizId, answerId) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/answer", {
        quiz_id: quizId,
        answer_id: answerId,
      })
      .then((response) => {
       
        dispatch(setMessage(response.data.message));
       
        dispatch(fetchQuiz());
      })
      .catch((error) => {
       
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch(setMessage(errorMessage));
      });
  };
}
export function postQuiz(newQuizData) {
  return (dispatch) => {
    axios
      .post("http://localhost:9000/api/quiz/new", {
        question_text: newQuizData.newQuestion,
        true_answer_text: newQuizData.newTrueAnswer,
        false_answer_text: newQuizData.newFalseAnswer,
      })
      .then((response) => {
        dispatch(
          setMessage(`Congrats: "${response.data.question}" is a great question!`)
        );
        dispatch(resetForm());
      })
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data.message
          : error.message;
        dispatch(setMessage(errorMessage));
      });
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
