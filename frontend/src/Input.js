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

        <br />

        <input
            className="input"
            type="checkbox"
            // onChange={(event) => setMessage(event.target.value)}
            // onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <lable>Audio</lable>
        {/* <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button> */}

        <br />

        <input
            className="input"
            type="checkbox"
            // onChange={(event) => setMessage(event.target.value)}
            // onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <lable>Text</lable>
        {/* <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button> */}
        
        <br />
        <label>
          Number of Page Elements:
          <input
            name="numberOfGuests"
            type="number"
            // value={this.state.numberOfGuests}
            // onChange={this.handleInputChange}
             />
        </label>
    </form>
);

export default Input;