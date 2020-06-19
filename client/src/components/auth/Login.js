import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { login } from "../../actions/authAction";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push("/home");
    }
    return null;
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.login(userData);
  }
  render() {
    const { errors } = this.props;
    return (
      <div className="container pt-5">
        <div className="row py-5 flex j-center">
          <div className="col s10 ml-0">
            <div className="card">
              <div className="card-content text-dark">
                <div className="row flex j-center">
                  <form className="col s10 ml-0" onSubmit={this.onSubmit}>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">email</i>
                        <input
                          id="icon_prefix2"
                          className="validate"
                          type="text"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                        />
                        <label htmlFor="icon_prefix2">Email</label>
                        {errors.email && (
                          <div className="red-text">{errors.email}</div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">vpn_key</i>
                        <input
                          id="icon_prefix3"
                          className="validate"
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange}
                        />
                        <label htmlFor="icon_prefix3">Password</label>
                        {errors.password && (
                          <div className="red-text">{errors.password}</div>
                        )}
                      </div>
                    </div>
                    <div className="row flex j-center">
                      <button
                        className="btn waves-effect waves-light"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { login })(Login);
