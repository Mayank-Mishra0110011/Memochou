import React, { Component } from "react";

import ColorPalette from "./ColorPalette";

class NoteCardOptions extends Component {
  render() {
    return (
      <div className="card-action">
        <a className="btn-floating btn-small waves-effect waves-light">
          <i
            className="material-icons tooltipped"
            data-position="bottom"
            data-tooltip="Remind Me"
          >
            notifications_active
          </i>
        </a>
        <a
          className="btn-floating btn-small waves-effect waves-light dropdown-trigger"
          data-position="top"
          data-target="palette1"
        >
          <i
            className="material-icons tooltipped"
            data-position="bottom"
            data-tooltip="Change Color"
          >
            color_lens
          </i>
        </a>
        <ColorPalette />
        <a className="btn-floating btn-small waves-effect waves-light">
          <i
            className="material-icons tooltipped"
            data-position="bottom"
            data-tooltip="Add Image"
          >
            image
          </i>
        </a>
        <a className="btn-floating btn-small waves-effect waves-light">
          <i
            className="material-icons tooltipped"
            data-position="bottom"
            data-tooltip="Archive"
          >
            archive
          </i>
        </a>
        <a className="btn-floating btn-small waves-effect waves-light">
          <i
            className="material-icons tooltipped"
            data-position="bottom"
            data-tooltip="More"
          >
            more_vert
          </i>
        </a>
      </div>
    );
  }
}

export default NoteCardOptions;
