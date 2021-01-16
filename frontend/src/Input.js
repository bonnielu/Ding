import React from 'react';
import Checkbox from './Checkbox.js'

const OPTIONS = ["Text", "Images", "Audio"];

class Input extends React.Component {

    state = {
        checkboxes: OPTIONS.reduce(
            (options, option) => ({
                ...options,
                [option]: false
            })
        ),

        num: 1
    }

    handleCheckboxChange = changeEvent => {
        const {name} = changeEvent.target;
    
        this.setState(prevState => ({
            checkboxes: {
                ...prevState.checkboxes,
                [name]: !prevState.checkboxes[name]
            }
        }));
    };

    handleNumChange = e => {
        this.setState({num: e.target.value});
    };

    createCheckbox = option => (
        <Checkbox
          label={option}
          isSelected={this.state.checkboxes[option]}
          onCheckboxChange={this.handleCheckboxChange}
          key={option}
        />
      );
    
    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
    
        Object.keys(this.state.checkboxes)
          .filter(checkbox => this.state.checkboxes[checkbox])
          .forEach(checkbox => {
                console.log(checkbox, "is selected."); 
        });

        console.log(this.state.num + ' page elements');

    };

      createCheckboxes = () => OPTIONS.map(this.createCheckbox);

    render() {
        return (
            <div className="container">
            <div className="row mt-5">
                <div className="col-sm-12">
                <form onSubmit={this.handleFormSubmit}>
                    {this.createCheckboxes()}

                    <label>
                        Number of Page Elements
                    </label>
                    <input type='number' max='50' step='1' value={this.state.num} onChange={this.handleNumChange}></input>
        
                    <div className="form-group mt-2">
                    <button type="submit" className="btn">
                        Ding
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        );
    }
};

export default Input;
