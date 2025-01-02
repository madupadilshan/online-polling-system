import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/PollList.css"; // Import the CSS file

const PollList = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "polls"), (snapshot) => {
      setPolls(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handleVote = async (pollId, optionIndex) => {
    try {
      const pollRef = doc(db, "polls", pollId);
      const poll = polls.find((p) => p.id === pollId);

      const updatedOptions = poll.options.map((opt, idx) => {
        if (idx === optionIndex) {
          return { ...opt, votes: opt.votes + 1 };
        }
        return opt;
      });

      await updateDoc(pollRef, { options: updatedOptions });
      console.log("Vote added successfully!");
    } catch (e) {
      console.error("Error updating votes: ", e);
    }
  };

  const deletePoll = async (pollId) => {
    try {
      await deleteDoc(doc(db, "polls", pollId));
      console.log("Poll deleted successfully!");
    } catch (e) {
      console.error("Error deleting poll: ", e);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Polls</h2>
      {polls.map((poll) => (
        <div className="poll-container" key={poll.id}>
          <h3>{poll.question}</h3>
          <ul>
            {poll.options.map((opt, idx) => (
              <li key={idx}>
                {opt.text} - {opt.votes} votes
                <button
                  className="vote-button"
                  onClick={() => handleVote(poll.id, idx)}
                >
                  Vote
                </button>
              </li>
            ))}
          </ul>
          <div className="delete-poll">
            <button className="delete-button" onClick={() => deletePoll(poll.id)}>
              Delete Poll
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PollList;
