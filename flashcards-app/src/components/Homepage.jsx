import { useState } from "react";
import SubjectCard from "./SubjectCard";
import ErrorDialog from "./ErrorDialog";
import "../styles/Homepage.css";
import "../styles/Header.css";

export default function Homepage({ subject, onOpenSubject }) {
  // --- STATE --- //
  // Viisibility of the error dialog
  let [showErrorDialog, setShowErrorDialog] = useState(false);
  function openDialog() {
    setShowErrorDialog(true);
  }
  function closeDialog() {
    setShowErrorDialog(false);
  }


  // --- PAGE CONTENT --- //
  return (
    <div className="homepage">

      {/* ── Header ── */}
      <div className="header">
        <div className="header-inner">
          <div className="header-site-title">Flashcards</div>

          {/* Breadcrumb */}
          <div className="header-breadcrumb">
            <button className="header-crumb-btn" onClick={openDialog}>
              <span>Home</span>
            </button>
            <span className="header-crumb-sep">›</span>
            <span className="header-crumb header-crumb-active">Sample Subject</span>
          </div>
        </div>
      </div>

      {/* Body of the homepage */}
      <div className="homepage-grid-wrapper">
        <div className="homepage-grid">

          {/* Not functional "New" card */}
          <div className="new-subject-tile" onClick={openDialog}>
            <div className="new-subject-tile-icon">
              {/* Plus Icon */}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" >
                <line x1="7" y1="1" x2="7" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="1" y1="7" x2="13" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="new-subject-tile-label">New Subject</span>
          </div>

          {/* Clicking the Subject Card will open the board */}
          <SubjectCard subject={subject} onOpen={onOpenSubject} />

        </div>
      </div>

      {/* Open an error dialog when a feature isn't implemented */}
      {showErrorDialog && <ErrorDialog onDismiss={closeDialog} />}

    </div>
  );
}
