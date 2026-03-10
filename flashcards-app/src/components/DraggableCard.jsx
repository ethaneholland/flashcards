import { useRef, useEffect } from "react";
import "../styles/Card.css";

// --- SVG ICONS --- //
const IconLock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const IconUnlock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
);

const IconRevise = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
);

const IconHide = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

export default function DraggableCard({ card, onDragStart, onUpdate, onDelete, onCtrlClick, isSelected }) {
  const textRef = useRef(null);

  let cardClass = "card";
  if (card.locked) cardClass += " card-locked";
  if (card.status === "revise") cardClass += " card-revise";
  if (card.status === "hidden") cardClass += " card-hidden";
  if (isSelected) cardClass += " card-selected";

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
  }, [card.text]);

  // --- EVENT HANDLERS ---
  function handleMouseDown(event) {
    // Handle Ctrl+Click for drawing lines
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      onCtrlClick(card.id);
      return;
    }
    onDragStart(event, card.id);
  }

  // --- FUNCTIONS --- //
  const toggleLock = (e) => {
    e.stopPropagation();
    onUpdate(card.id, { locked: !card.locked });
  };

  const toggleRevise = (e) => {
    e.stopPropagation();
    onUpdate(card.id, { status: card.status === "revise" ? "normal" : "revise" });
  };

  const toggleHide = (e) => {
    e.stopPropagation();
    onUpdate(card.id, { status: card.status === "hidden" ? "normal" : "hidden" });
  };

  return (
    <div 
      className={cardClass} 
      style={{ left: `${card.x}px`, top: `${card.y}px`, zIndex: card.zIndex, position: 'absolute' }}
      onMouseDown={card.locked ? (e) => e.stopPropagation() : handleMouseDown} // Prevent drag if locked
    >
      <div className="card-toolbar">
        <div className="card-toolbar-left">
          {/* Lock Button */}
          <button className={`card-btn ${card.status === 'lock' ? 'active' : ''}`} onMouseDown={toggleLock} title="Lock this card">
            {card.locked ? <IconLock /> : <IconUnlock />}
          </button>

          {/*Only show revise and hide if NOT locked*/}
          {!card.locked && (
            <>
              {/* Revise Button */}
              <button className={`card-btn ${card.status === 'revise' ? 'active' : ''}`} onMouseDown={toggleRevise} title="Mark for Revision">
                <IconRevise />
              </button>
              
              {/* Hide Button */}
              <button className={`card-btn ${card.status === 'hidden' ? 'active' : ''}`} onMouseDown={toggleHide} title="Hide in this Version">
                <IconHide />
              </button>
            </>
          )}
        </div>

        <button 
          className={`card-btn card-btn-delete ${card.locked ? 'disabled' : ''}`} 
          onMouseDown={(e) => { 
            e.stopPropagation(); 
            if (!card.locked) onDelete(card.id); 
          }}
          style={{ 
            opacity: card.locked ? 0.2 : 1, 
            cursor: card.locked ? 'not-allowed' : 'pointer' 
          }}
          title={card.locked ? "Unlock to delete" : "Delete"}
        >
          ×
        </button>
      </div>
      
      {/* Body - Disable typing if locked */}
      <div className="card-body" onMouseDown={e => e.stopPropagation()}>
        <textarea
          ref={textRef}
          className="card-textarea"
          value={card.text}
          disabled={card.locked} 
          onChange={(e) => onUpdate(card.id, { text: e.target.value })}
          placeholder={card.locked ? "Locked" : "Write something..."}
        />
      </div>
    </div>
  );
}