import React from 'react';

const Input = () => (
    <form className="form">
        <input
            className="input"
            type="checkbox"
            // onChange={(event) => setMessage(event.target.value)}
            // onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <lable>Images</lable>
        {/* <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button> */}
    </form>
);

export default Input;