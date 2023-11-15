import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchQuiz, postAnswer, selectAnswer } from "../state/action-creators";

function Quiz({ quiz, selectedAnswer, fetchQuiz, postAnswer, selectAnswer }) {
  useEffect(() => {
    if (!quiz) {
      fetchQuiz();
    }
  }, [fetchQuiz, quiz]);

  const handleAnswerSelect = (answerId) => {
    selectAnswer(answerId);
  };

  const submitAnswer = () => {
    if (selectedAnswer) {
     
      postAnswer(quiz.quiz_id, selectedAnswer);
    }
  };

  const isSubmitDisabled = !selectedAnswer;

  return (
    <div id="wrapper">
      {quiz ? (
        <>
          <h2>{quiz.question}</h2>
          <div id="quizAnswers">
            {quiz.answers.map((answer) => (
              <div
             
                key={answer.answer_id}
                className={`answer ${selectedAnswer === answer.answer_id ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(answer.answer_id)}
              >
                {answer.text}
                <button onClick={() => handleAnswerSelect(answer.answer_id)}>
                  {selectedAnswer === answer.answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>
            ))}
          </div>
          <button
            id="submitAnswerBtn"
            onClick={submitAnswer}
            disabled={isSubmitDisabled}
          >
            Submit answer
          </button>
        </>
      ) : (
        <p>Loading next quiz...</p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  quiz: state.quiz, 
  selectedAnswer: state.selectedAnswer,
});

export default connect(mapStateToProps, { fetchQuiz, postAnswer, selectAnswer })(Quiz);
