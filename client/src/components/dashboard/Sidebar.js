import React, { Component } from "react";

class Sidebar extends Component {
  componentDidMount() {
    if (window.innerWidth < 993) {
      const sidenav = document.querySelector("#options");
      sidenav.classList.add("sidenav");
      window.M.Sidenav.init(sidenav);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 993) {
        const sidenav = document.querySelector("#options");
        sidenav.classList.add("sidenav");
        window.M.Sidenav.init(sidenav);
      } else {
        const sidenav = document.querySelector("#options");
        sidenav.classList.remove("sidenav");
      }
    });
  }
  render() {
    return (
      <div className="col s12 m4 l3 p0" id="options">
        <div className="search-btn">
          <div className="c-btn-container">
            <i className="material-icons prefix">search</i>
          </div>
          <div>
            <input
              type="text"
              placeholder="search"
              className="autocomplete black-text"
            />
          </div>
        </div>
        <div className="divider"></div>
        <div className="custom-btn c-btn-active">
          <div className="c-btn-container">
            <i className="material-icons prefix">lightbulb_outline</i>
          </div>
          <div>
            <h6 className="center-align m0 font-bold py-1">Notes</h6>
          </div>
        </div>
        <div className="custom-btn">
          <div className="c-btn-container">
            <i className="material-icons prefix">notifications</i>
          </div>
          <div>
            <h6 className="center-align m0 font-bold py-1">Reminders</h6>
          </div>
        </div>
        <div className="divider"></div>
        <div className="custom-btn">
          <div className="c-btn-container">
            <i className="material-icons prefix">create</i>
          </div>
          <div>
            <h6 className="center-align m0 font-bold py-1">New Category</h6>
          </div>
        </div>
        <div className="divider"></div>
        <div className="custom-btn">
          <div className="c-btn-container">
            <i className="material-icons prefix">archive</i>
          </div>
          <div>
            <h6 className="center-align m0 font-bold py-1">Archive</h6>
          </div>
        </div>
        <div className="custom-btn">
          <div className="c-btn-container">
            <i className="material-icons prefix">delete</i>
          </div>
          <div>
            <h6 className="center-align m0 font-bold py-1">Trash</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
