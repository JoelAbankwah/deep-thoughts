import React, { useState } from 'react';
import { ADD_REACTION } from '../../utils/mutations';
import { useMutation } from '@apollo/client';


const ReactionForm = ({ thoughtId }) => {
  const [reactionBody, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addReaction, { error }] = useMutation(ADD_REACTION);

  const handleChange = event => {
    const target = event.target.value

    if(target.length <= 280) {
      setBody(target);
      setCharacterCount(target.length);
    }
  }

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      await addReaction({
        variables: { thoughtId, reactionBody }
      })
    } catch (err) {
      console.log(err);
    }

    setBody('');
    setCharacterCount(0);
  };
  return (
    <div>
      <p className="m-0">
        Character Count: {characterCount}/280
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Leave a reaction to this thought..."
          value={reactionBody}
          onChange={handleChange}
          className="form-input col-12 col-md-9"
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
        {error && <span className='ml-2'>Something went wrong...</span>}
      </form>
    </div>
  );
};

export default ReactionForm;