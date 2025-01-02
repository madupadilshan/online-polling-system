import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/PollForm.css"; // Import the CSS file for styling

const PollForm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const addPoll = async () => {
    if (question.trim() === "" || options.some((opt) => opt.trim() === "")) {
      alert("Please fill out the question and all options.");
      return;
    }

    try {
      await addDoc(collection(db, "polls"), {
        question,
        options: options.map((opt) => ({ text: opt, votes: 0 })),
      });
      setQuestion("");
      setOptions(["", ""]);
      alert("Poll created successfully!");
    } catch (e) {
      console.error("Error adding poll: ", e);
    }
  };

  return (
    <div className="poll-form-container">
      <h2>Create Poll</h2>
      <input
        type="text"
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="poll-input"
      />
      {options.map((opt, idx) => (
        <input
          key={idx}
          type="text"
          placeholder={`Option ${idx + 1}`}
          value={opt}
          onChange={(e) =>
            setOptions(
              options.map((o, i) => (i === idx ? e.target.value : o))
            )
          }
          className="poll-input"
        />
      ))}
      <button
        className="add-option-button"
        onClick={() => setOptions([...options, ""])}
      >
        Add Option
      </button>
      <button className="create-poll-button" onClick={addPoll}>
        Create Poll
      </button>
    </div>
  );
};

export default PollForm;
