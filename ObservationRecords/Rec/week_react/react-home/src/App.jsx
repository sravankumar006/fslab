import { useState } from "react";
import Student from "./student.jsx";

function App() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div>
      <h1>Hello, React!</h1>
      <button className="click" onClick={() => setShowMessage(true)}>
        Click me
      </button>
      {showMessage && <ClickButton />}
      <Student />
    </div>
  );
}

function ClickButton() {
  const name = "Ravi";
  return <h3>hello, {name}!</h3>;
}

export default App;
