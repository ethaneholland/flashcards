import "../styles/Homepage.css";

export default function SubjectCard({ subject, onOpen }) {
  // --- VARIABLES --- //
  let cardCount = subject.cards.length;
  let countsText = cardCount + "cards · 0 revisions"; // Displayed below the title, e.g. "3 cards 0 revisions"

  // --- PAGE CONTENT --- //
  return (
    // Clicking the card switches the screen to the board
    <div className="subject-card" onClick={onOpen}>
      <div className="subject-card-spacer"></div>
      <div className="subject-card-body">
        <div className="subject-card-title">{subject.title}</div>
        <div className="subject-card-meta">{countsText}</div>
      </div>
    </div>
  );
}
