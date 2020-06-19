import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Landing extends Component {
  constructor() {
    super();
    this.state = {};
  }
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push("/home");
    }
    return null;
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay">
          <div className="row pt-5 flex j-center">
            <div className="col l10 m9 s11 white-text ml-0">
              <h2 className="py-1">
                Memochou helps you work more efficiently and get more done.
              </h2>
            </div>
          </div>
          <div className="row flex j-center">
            <div className="col l10 m9 s11 white-text ml-0">
              <h6 className="py-1">
                Memochou's notes, lists, reminders and images enable you to
                organize and prioritize your day and make the best out of it.
              </h6>
              <h6 className="py-1">
                Whether it’s for work, a journal, a todo list, or even the next
                family vacation, Memochou helps you stay organized.
              </h6>
            </div>
          </div>
          <div className="row py-5 flex j-center">
            <div className="col l10 m9 s11 white-text ml-0">
              <Link to="/signup" className="waves-effect waves-light btn-large">
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
