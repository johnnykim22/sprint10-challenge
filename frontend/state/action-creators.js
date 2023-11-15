// ❗ You don't need to add extra action creators to achieve MVP
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM } from './action-types'



export function moveClockwise() { 
  return {type: 'MOVE_CLOCKWISE'}
}
export function moveCounterClockwise() { 
  return {type: 'MOVE_COUNTERCLOCKWISE'}
}

export function selectAnswer(answerID) { 
  return {type: 'SET_SELECTED_ANSWER', payload: answerID}
}

export function setMessage(message) {
  return { type: 'SET_INFO_MESSAGE', payload: message };
 }

export function setQuiz(quiz) {
  return {type: 'SET_QUIZ_INTO_STATE', payload: quiz}
 }

 export function inputChange(fieldId, value) {
  return { type: INPUT_CHANGE, payload: { fieldId, value } };
}

export function resetForm() {
return { type: RESET_FORM };

 }
 //git add -a

 

// ❗ Async action creators

export const createQuestion =(question)=>{
  return function(dispatch){
    fetch('http://localhost:9000/api/quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(question)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create question')
      }
      return response.json()
    })
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.error(err)
    })
  }
}

export function fetchQuiz() {
  return function (dispatch) {
    dispatch(resetForm());
    fetch('http://localhost:9000/api/quiz/next')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch quiz');
      }
      return response.json();
    })
    .then(quiz => {
      dispatch(setQuiz(quiz)); 
    })
    .catch(error => {
      dispatch(setMessage(error.message)); 
    });
  }
}


export function postAnswer(quizId, answerId) {
  return function (dispatch) {
    fetch('http://localhost:9000/api/quiz/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quiz_id: quizId, answer_id: answerId }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to post answer');
      }
      return response.json();
    })
    .then(feedback => {
      dispatch({ type: SET_INFO_MESSAGE, payload: feedback.message });
      dispatch({ type: RESET_FORM });
      dispatch(fetchQuiz());
    })
    .catch(error => {
      dispatch({ type: SET_INFO_MESSAGE, payload: error.message });
    });
  };
}


export function postQuiz(newQuizData) {
  return (dispatch) => {
    return fetch('http://localhost:9000/api/quiz/new', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question_text: newQuizData.newQuestion,
        true_answer_text: newQuizData.newTrueAnswer,
        false_answer_text: newQuizData.newFalseAnswer,
      }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to post the quiz');
      }
      return response.json();
    })
    .then((data) => {
      dispatch(setMessage(`Congrats: ${newQuizData.newQuestion} is a great question!`)); 
      dispatch({ type: 'RESET_FORM' }); 
    })
    .catch((error) => {
      dispatch(setMessage(error.message)); 
    });
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
