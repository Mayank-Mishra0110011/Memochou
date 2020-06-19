import React, { Component } from "react";
import Sidebar from "./Sidebar";

import NoteCard from "./NoteCard";

export default class Home extends Component {
  render() {
    return (
      <div className="row">
        <Sidebar />
        <NoteCard />
      </div>
    );
  }
}
