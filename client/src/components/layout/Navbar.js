import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/authAction";

class Navbar extends Component {
  componentDidMount() {
    const sideNavElem = document.querySelectorAll(".sidenav");
    window.M.Sidenav.init(sideNavElem);
    const tooltippedElems = document.querySelectorAll(".tooltipped");
    window.M.Tooltip.init(tooltippedElems, {
      enterDelay: 0,
      exitDelay: 0,
      inDuration: 0,
      outDuration: 0,
    });
    const dropdowns = document.querySelectorAll(".dropdown-trigger");
    window.M.Dropdown.init(dropdowns, {
      constrainWidth: false,
      hover: true,
      alignment: "left",
    });
  }
  mainMenu() {
    const options = document.getElementById("options");
    if (options) {
      if (options.className.includes("sidenav")) {
        window.M.Sidenav.getInstance(document.getElementById("options")).open();
      } else {
        if ([...options.classList].includes("hide")) {
          options.classList.remove("hide");
          [...document.getElementsByClassName("notes")].forEach((note) => {
            note.classList.remove("l4");
            note.classList.add("l3");
          });
        } else {
          options.classList.add("hide");
          [...document.getElementsByClassName("notes")].forEach((note) => {
            note.classList.remove("l3");
            note.classList.add("l4");
          });
        }
      }
    }
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    const authLinks = (
      <li>
        <a
          className="btn-floating btn-medium waves-effect waves-light"
          onClick={this.mainMenu}
        >
          <i
            className="material-icons tooltipped"
            data-position="bottom"
            data-tooltip="Main Menu"
          >
            menu
          </i>
        </a>
        <a className="btn-floating btn-medium waves-effect waves-light">
          <div
            className="flex j-center a-center tooltipped"
            style={{ fontSize: "24px" }}
            data-position="bottom"
            data-tooltip="username"
          >
            <span className="black-text">G</span>
          </div>
        </a>
        <a className="btn-floating btn-medium waves-effect waves-light">
          <i
            className="material-icons tooltipped"
            data-position="bottom"
            data-tooltip="Refresh"
          >
            refresh
          </i>
        </a>
        <a className="btn-floating btn-medium waves-effect waves-light">
          <i
            className="material-icons tooltipped"
            data-position="bottom"
            data-tooltip="List View"
            onClick={(event) => {
              if (event.target.innerText === "view_agenda") {
                event.target.innerText = "view_module";
                event.target.dataset.tooltip = "Grid View";
              } else {
                event.target.innerText = "view_agenda";
                event.target.dataset.tooltip = "List View";
              }
              window.M.Tooltip.getInstance(event.target).close();
            }}
          >
            view_agenda
          </i>
        </a>
      </li>
    );
    const guestLinks = (
      <li>
        <Link
          tabIndex="-1"
          to="/signup"
          className="btn grey darken-4 waves-effect waves-light"
          type="submit"
          name="action"
        >
          Signup
          <i className="material-icons right">account_circle</i>
        </Link>
        <Link
          tabIndex="-1"
          to="/login"
          className="btn grey darken-4 waves-effect waves-light"
          type="submit"
          name="action"
        >
          Login
          <i className="material-icons right">login</i>
        </Link>
      </li>
    );
    return (
      <div className="navbar-fixed">
        <nav className="nav-light">
          <div className="nav-wrapper">
            <Link
              tabIndex="-1"
              to="/"
              className={
                isAuthenticated
                  ? "brand-logo right brand-logo-light"
                  : "brand-logo left brand-logo-light ml"
              }
            >
              <div className="valign-wrapper">
                <span className="center-align">Memochou</span>
                <img src="/logo.png" alt="logo" />
              </div>
            </Link>
            <ul className={isAuthenticated ? "left" : "right"}>
              {isAuthenticated ? authLinks : guestLinks}
              <li>
                <a
                  tabIndex="-1"
                  className="btn-flat btn-floating btn-medium waves-effect waves-light"
                >
                  <i
                    className="material-icons tooltipped"
                    data-position="bottom"
                    data-tooltip="Enable Dark Mode"
                    onClick={(event) => {
                      if (event.target.innerText === "toggle_off") {
                        event.target.innerText = "toggle_on";
                        event.target.dataset.tooltip = "Enable Light Mode";
                      } else {
                        event.target.innerText = "toggle_off";
                        event.target.dataset.tooltip = "Enable Dark Mode";
                      }
                      window.M.Tooltip.getInstance(event.target).close();
                    }}
                  >
                    toggle_off
                  </i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
