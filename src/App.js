import React from "react";
import PollForm from "./components/PollForm";
import PollList from "./components/PollList";
import "./styles/App.css"; // Import global CSS if needed

function App() {
  return (
    <div>
      <PollForm />
      <PollList />
    </div>
  );
}

export default App;
