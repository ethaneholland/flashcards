import { useState } from "react";
import Board from "./components/Board";
import Homepage from "./components/Homepage";
import "./styles/global.css";

// Set initial state of the testing board
const TESTING_SUBJECT = { title: "Sample Story", cards: [] };

export default function App() {
  // --- STATE --- //
  // The one subject that exists in the app — holds the title and all cards
  let [subject, setSubject] = useState(TESTING_SUBJECT);
  function updateSubject(changes) {
    setSubject(function(prev) {
      return { ...prev, ...changes };
    });
  }

  // Tests whether we are on the homepage or the board
  let [onBoard, setOnBoard] = useState(false);
  function goToBoard() {
    setOnBoard(true);
  }
  function goToHomepage() {
    setOnBoard(false);
  }


  // --- PAGE CONTENT --- //
  // Overflow will be turned off when on the board, since items may go off the screen (the cards)
  if (onBoard) {
    return (
      <>
        <style>{`body { overflow: hidden; }`}</style> 
        <Board
          subject={subject}
          onUpdateSubject={updateSubject}
          onBack={goToHomepage}
        />
      </>
    );
  }

  return (
    <>
      <style>{`body { overflow: auto; }`}</style>
      <Homepage
        subject={subject}
        onOpenSubject={goToBoard}
      />
    </>
  );
}
