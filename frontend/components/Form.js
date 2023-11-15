import React from 'react';
import { connect } from 'react-redux';
import { inputChange, postQuiz, setMessage, resetForm } from '../state/action-creators';
import { useState, useEffect } from 'react';


function Form({ form, infoMessage, inputChange, postQuiz, setMessage, resetForm }) {
  
  const [localForm, setLocalForm] = useState({
    newQuestion: '',
    newTrueAnswer: '',
    newFalseAnswer: '',
  });

  useEffect(() => {
    setLocalForm(form);
  }, [form]);

  const canSubmit =
  localForm.newQuestion.length > 1 &&
  localForm.newTrueAnswer.length > 1 &&
  localForm.newFalseAnswer.length > 1;

  const onChange = (evt) => {
    const { id, value } = evt.target;
    setLocalForm({
      ...localForm,
      [id]: value.trim(),
    });
    inputChange(id, value.trim());
  };

 

  const onSubmit = (evt) => {
    evt.preventDefault();
    postQuiz(localForm);
    resetForm();
    
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={localForm.newQuestion}
        id="newQuestion"
        placeholder="Enter question"
      />
      <input
        maxLength={50}
        onChange={onChange}
        value={localForm.newTrueAnswer}
        id="newTrueAnswer"
        placeholder="Enter true answer"
      />
      <input
        maxLength={50}
        onChange={onChange}
        value={localForm.newFalseAnswer}
        id="newFalseAnswer"
        placeholder="Enter false answer"
      />
      <button id="submitNewQuizBtn" disabled={!canSubmit}>
        Submit new quiz
      </button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  form: state.form,
  
});

export default connect(mapStateToProps, { inputChange, postQuiz, setMessage, resetForm })(Form);