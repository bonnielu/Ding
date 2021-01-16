import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Input from './Input/Input.js'
import InputTag from './Input/InputTags.js'
  
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Input></Input>
        <InputTag></InputTag>
      </header>
    </div>
  );
}

export default App;
