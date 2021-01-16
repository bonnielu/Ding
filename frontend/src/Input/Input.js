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

        let imageCheck = false; 
        let audioCheck = false; 
        let textCheck = false; 

        let numImage = 0;
        let numAudio = 0;
        let numText = 0;
        
    
        Object.keys(this.state.checkboxes)
          .filter(checkbox => this.state.checkboxes[checkbox])
          .forEach(checkbox => {
              if(checkbox === 'Images') {
                  imageCheck = true;
                  numImage = Math.floor((Math.random()*this.state.num)) + 1;
                  console.log(numImage);
              }
              if (checkbox === "Audio") {
                  audioCheck = true;
                  numAudio = Math.floor(Math.random() * (this.state.num-numImage));
                  console.log(numAudio);
              }
              if (checkbox === "Text") {
                  textCheck = true;
                  numText = this.state.num - numImage - numAudio;
              }
            });

            // Call backend for image, word, and text information 
            if (imageCheck) {
                axios.get(`http://localhost:5000/images/${numImage}`, {
                }).then(function(response) {
                    let download = JSON.parse(response['data'])[0]['download_url']
                })
            }
            if (textCheck) {
                axios.get(`http://localhost:5000/words/${numText}`, {
                }).then(function(response) {
                    let wordArray = response['data'];
                })
            }
            if (audioCheck) {
                axios.get(`http://localhost:5000/audio/${numText}`, {
                }).then(function(response) {
                    
                })
            }
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
