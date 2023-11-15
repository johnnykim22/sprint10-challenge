// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM
} from './action-types'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      return (state + 1) % 6;
    case MOVE_COUNTERCLOCKWISE:
      return state === 0 ? 5 : state - 1;
    default:
      return state;
  }
}

const initialQuizState = null;
function quizReducer(state = initialQuizState, action) {
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:
      return action.payload;
    default:
      return state;
  }
}

const initialSelectedAnswerState = null;

function selectedAnswerReducer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case SET_SELECTED_ANSWER:
   
      if (action.payload !== undefined) {
        return action.payload;
      }
      
      return state;
    case RESET_FORM:
    
      return initialSelectedAnswerState;
    default:
      return state;
  }
}

const initialMessageState = '';
function messageReducer(state = initialMessageState, action) {
  switch (action.type) {
    case SET_INFO_MESSAGE:
      return action.payload;
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
};
function formReducer(state = initialFormState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      const { fieldId, value } = action.payload;
      return {
        ...state,
        [fieldId]: value,
      };
    case RESET_FORM:
      return initialFormState;
    default:
      return state;
  }
}

export default combineReducers({
  wheel: wheel,
  quiz: quizReducer,
  selectedAnswer: selectedAnswerReducer,
  message: messageReducer,
  form: formReducer
});



///form => submit => use reducer question (useReducer) => store => server (thunk)=> db =>(useSelector) =>store => (thunk) server => store => dispatch => component