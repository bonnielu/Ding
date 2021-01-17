import React from "react";
import Checkbox from "./Checkbox.js";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Container from "react-bootstrap/Container";

const OPTIONS = ["Text", "Images", "Audio"];

class Input extends React.Component {
  state = {
    checkboxes: OPTIONS.reduce((options, option) => ({
      ...options,
      [option]: false,
    })),

    num: 1,
    downloads: [],
    words: [],
    audios: [],
    selectD: []
  };

  // Handles changes in checkbox
  handleCheckboxChange = (changeEvent) => {
    const { name } = changeEvent.target;

    this.setState((prevState) => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name],
      },
    }));
  };

  // Handles changes in number input
  handleNumChange = (e) => {
    this.setState({ num: e.target.value });
  };

  handleSelectImage = (e) => {
    
    console.log(e.target.src)

    // console.log(this.setState({ selectD: [...this.state.selectD, e.target.value]}))
  }

  // Dynamically creates checkboxes
  createCheckbox = (option) => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  //  Handles form submit events
  handleFormSubmit = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();

    const audio = new Audio("/ding.mp3");
    audio.play();

    // console.log(this.state.selectD)

    this.setState({

    downloads: [],
    words: [],
    audios: [],
    // selectD: []
  });

    let imageCheck = false;
    let audioCheck = false;
    let textCheck = false;

    let numImage = 0;
    let numAudio = 0;
    let numText = 0;

    Object.keys(this.state.checkboxes)
      .filter((checkbox) => this.state.checkboxes[checkbox])
      .forEach((checkbox) => {
        if (checkbox === "Images") {
          imageCheck = true;
        }
        if (checkbox === "Audio") {
          audioCheck = true;
        }
        if (checkbox === "Text") {
          textCheck = true;
        }
      });

    // produces the number of elements to be generated
    if (imageCheck && textCheck && audioCheck) {
      numImage = Math.floor(Math.random() * this.state.num + 1);
      numAudio = Math.floor(Math.random() * (this.state.num - numImage) + 1);
      numText = this.state.num - numImage - numAudio;
    } else if (imageCheck && textCheck && !audioCheck) {
      numImage = Math.floor(Math.random() * this.state.num + 1);
      numText = this.state.num - numImage;
    } else if (imageCheck && !textCheck && audioCheck) {
      numImage = Math.floor(Math.random() * this.state.num + 1);
      numAudio = this.state.num - numImage;
    } else if (!imageCheck && textCheck && audioCheck) {
      numAudio = Math.floor(Math.random() * this.state.num + 1);
      numText = this.state.num - numAudio;
    } else {
      if (imageCheck) {
        numImage = this.state.num;
      } else if (textCheck) {
        numText = this.state.num;
      } else if (audioCheck) {
        numAudio = this.state.num;
      } 
    }

    // Call backend for image, word, and text information
    if (imageCheck) {
      axios.get(`http://localhost:5000/images/${numImage}`, {}).then(
        function (response) {
          var download = [];
          for (let i = 0; i < numImage; i++) {
            download.push(JSON.parse(response["data"])[i]["download_url"]);
          }
          return this.setState({ downloads: download });
        }.bind(this)
      );
    }
    if (textCheck) {
      axios.get(`http://localhost:5000/words/${numText}`, {}).then(
        function (response) {
          var wordArray = response["data"];
          return this.setState({ words: wordArray });
        }.bind(this)
      );
    }
    if (audioCheck) {
      axios.get(`http://localhost:5000/audio/${numAudio}`, {}).then(
        function (response) {
          var audioLinkMP3 = [];
          var audioLinkOGG = [];
          for (let i = 0; i < numAudio; i++) {
            audioLinkMP3.push(
              JSON.parse(response["data"])[i]["preview-lq-mp3"]
            );
            audioLinkOGG.push(
              JSON.parse(response["data"])[i]["preview-lq-ogg"]
            );
          }
          return this.setState({ audios: audioLinkMP3, audioLinkOGG });
        }.bind(this)
      );
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
              <div className="checkboxBox">{this.createCheckboxes()}</div>
              <br />
              <div className="num-elements">
                <input
                  type="number"
                  min="1"
                  placeholder="# Prompts"
                  max="50"
                  step="1"
                  value={this.state.num}
                  onChange={this.handleNumChange}
                ></input>
              </div>

              <div className="form-group mt-2">
                <div className="button-wrapper">
                  <Button
                    type="submit"
                    className="btn generate"
                    size="lg"
                    block
                  >
                    DING
                  </Button>
                </div>
                {this.state.downloads.map((image, i) => (
                  <div key={i} onMouseUp={this.handleSelectImage}>
                    <img src={image} alt="DingImage"></img>
                  </div>
                ))}
                {this.state.words.map((word, i) => (
                  <div key={i}>
                    <p>{word}</p>
                  </div>
                ))}
                {this.state.audios.map((audioLinkMP3, audioLinkOGG, i) => (
                  <div key={i}>
                    <audio controls preload="auto">
                      <source src={audioLinkMP3} type="audio/mpeg"></source>
                      <source src={audioLinkOGG} type="audio/ogg"></source>
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  // Dynamically create checkboxes
  createCheckboxes = () => OPTIONS.map(this.createCheckbox);
}

export default Input;
