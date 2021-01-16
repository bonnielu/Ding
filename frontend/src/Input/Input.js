import React from 'react';
import Checkbox from './Checkbox.js'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Container from 'react-bootstrap/Container';


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

    // Handles changes in checkbox 
    handleCheckboxChange = changeEvent => {
        const {name} = changeEvent.target;
    
        this.setState(prevState => ({
            checkboxes: {
                ...prevState.checkboxes,
                [name]: !prevState.checkboxes[name]
            }
        }));
    };

    // Handles changes in number input 
    handleNumChange = e => {
        this.setState({num: e.target.value});
    };

    // Dynamically creates checkboxes 
    createCheckbox = option => (
        <Checkbox
          label={option}
          isSelected={this.state.checkboxes[option]}
          onCheckboxChange={this.handleCheckboxChange}
          key={option}
        />
      );
    
    //  Handles form submit events 
    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
    
        Object.keys(this.state.checkboxes)
          .filter(checkbox => this.state.checkboxes[checkbox])
          .forEach(checkbox => {
                console.log(checkbox, "is selected."); 
        });

        let numImage = this.state.num; 

        console.log(this.state.num + ' page elements');

        // Call backend for image information 
        axios.get(`/images/{numImage}`, {
        }).then(function(response) {
        console.log(response)
        })

    };

    // Dynamically create checkboxes
    createCheckboxes = () => OPTIONS.map(this.createCheckbox);

    render() {
        return (
            <div className="container">
            <div className="row mt-5">
                <div className="col-sm-12">
                <form onSubmit={this.handleFormSubmit}>
                    <div className='checkboxBox'>
                        {this.createCheckboxes()}
                    </div>

                    <label>
                        Number of Page Elements
                    </label>
                    <input type='number' max='50' step='1' value={this.state.num} onChange={this.handleNumChange}></input>
        
                    <div className="form-group mt-2">
                    <Button type="submit" className="btn generate" size='lg' block>
                        DING
                    </Button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        );
    }
};

export default Input;
