import { useState } from "react";
import {content} from "./HRWData";

export default function HRWApp() {
  return (
       <div>
         <Tabbed content={content} />
       </div>
  );
}

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
       <div>
         <div className="tabs">
           {Array.from({length: content.length+1}, (_, i) =>
           <Tab num={i} activeTab={activeTab} onClick={setActiveTab} key={i}/>)}
         </div>

         {activeTab <= 3 ?
              <TabContent item={content.at(activeTab)} key={content.at(activeTab).summary} />
              : <DifferentContent /> }
       </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
       <button
            className={activeTab === num ? "tab active" : "tab"}
            onClick={() => onClick(num)}
       >
         Tab {num + 1}
       </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() { setLikes(likes => likes + 1); }
  function handleInc3() {
    setLikes(l => l + 1);
    setLikes(l => l + 1);
    setLikes(l => l + 1);
    // setLikes(likes + 1);
    // setLikes(likes + 1);
  }
  function handleUndo() {
    setLikes(0)
    setShowDetails(true)
  }
  function handleUndoLater() {
    setTimeout(handleUndo, 2000)
  }

  return (
       <div className="tab-content">
         <h4>{ item.summary }</h4>
         { showDetails && <p>{ item.details }</p> }

         <div className="tab-actions">
           <button onClick={() => setShowDetails((h) => !h)}>
             { showDetails ? "Hide" : "Show" } details
           </button>

           <div className="hearts-counter">
             <span>{likes} ❤️</span>
             <button onClick={handleInc}>+</button>
             <button onClick={handleInc3}>+++</button>
           </div>
         </div>

         <div className="tab-undo">
           <button onClick={handleUndo}>Undo</button>
           <button onClick={handleUndoLater}>Undo in 2s</button>
         </div>
       </div>
  );
}

function DifferentContent() {
  return (
       <div className="tab-content">
         <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
       </div>
  );
}