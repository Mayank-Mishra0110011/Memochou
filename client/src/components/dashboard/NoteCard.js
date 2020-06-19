import React, { Component } from "react";

import NoteCardOptions from "./NoteCardOptions";

class NoteCard extends Component {
  render() {
    return (
      <div className="col s12 m4 l3 notes">
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-header">
                <a className="btn-floating btn-small waves-effect waves-light">
                  <i
                    className="material-icons tooltipped"
                    data-position="bottom"
                    data-tooltip="Select Note"
                  >
                    check_circle
                  </i>
                </a>
                {/* pinned svg  */}
                <a
                  className="btn-floating btn-small waves-effect waves-light tooltipped pin unpinned"
                  data-position="bottom"
                  data-tooltip="Pin Note"
                ></a>
              </div>
              <div className="card-content">
                <p style={{ marginBottom: "12px" }}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Culpa sed ad incidunt ipsa in odio fugit dolorem? Aliquid
                  maxime, repellendus sit aspernatur dignissimos modi, explicabo
                  numquam vitae, ex consectetur pariatur. slice the actual
                  content.
                </p>
                <NoteCardOptions />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoteCard;
