import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { signup } from "../../actions/authAction";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      profilePicture:
        "data:image/png;base64,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rI+aoxhwdwlko5n99ebWrQdtESkHuJjrHk+zp+n2w/b95c7FM5XvvTgWFvRRG4qPXMBaU5bJzTu1azfrUWIDj7/pXlg49HyPxdK1W7V7i+1XXxw9/51Ra4/QjPoIBcxMimlptXP1xtbSRlzwVAFz5qHATKGvWh3zuz9vPFrpvHpxYmIsOCINH5WAlSJi+uSz2h+ubQaaQx9z5mGjFJUCdedxe2k9fuO1qTOnylk2/EfFR+IstNa0sZX8+t3qZiMdCZHukBOhWsecP1H68T9OV8recK+mHvK9uXsfwp37jV9eXunEGeo9CphpvKQfr0W/uryyUu3ofj9O7FAZ5h1aKcoyee+D9d/8aT3NBBd4jxRfc72V/Z8/rN64WdN6CB9g1DW0x8BaU72RXbm29qAal3CV6EjSihXTu9c3ozh7+bsTgaeG75am4QxYa9rcTn95eaUTG5xqPsqYqRioazfrm7X0X/9pztc8ZA0P4dCkNS0ut395eTlOjI8lzUAU+urBSvTbd1faUaaGa5cfrq+GSGtaXYvfeqcaJxYHvfBU4PGjavS7K9UotsPU8BB9KURa08PF9v/+/XJBM+qFrwh9Vd1M/vMPy622GZqGh+XrINKa1jbi//rzemF4TznCHvker9fTP364nmUyHDvJkATcXarx1tsrWWbxgEj4BoHHdxc7b/+pSjQM3+iHIWBmarXN5ffXrMXFXvh2oc+fPW5/fGt7CCbSzn8F3dfVXrm2vlZLPdQLuxMG6v1Pag8etzzH12k5H7BSdPNO7fbjNm7Hh93rPhb4139cSzK3J9JuB6wUrW3EVz+tYa0V5KWYxMrVv244fceS2/s9M/36SjXLrNPfROGgFHz1lzv1lWrb3RseHA5YKbr3oLlZT3HiCnrmMV/9aNvd9ZWuBsxMrVb27vXNSujsN084BDzNSxvx3c8bjp6RdvNTE2lNdx802h1MnmGvAo9v3WtkmZPP4HEyYGZqd+xfPmsEeHMC7JlW/HAtrq7HLh4Juxrwo6VWlFgc/EJf+JrvPGiIg2OwkwEbI3cfNPFiXugXT/Hj1bjVyZw7InMvAmZqtrKHazFOPkO/MFMzNpvbEQIeOK1pqdoRp6++w+HDRNX15KA/RW7uBWwMLVU7GH6hv7SixbXIunZF2LGAmSkzsl3D4g3oM2Zutk2SOnafsGMBE1G7nbZi49ZWhsOPmdqJjSLHdi3HAmamTmxSI05tZHAAE6WZTTPH3uPgWsBEWWKO+EvZYUCMJRwDDxiTtTgDDQMhIuTaruVawEToF+Ap9wIGgKcQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAw/4/0156baY0Zl0AAAAASUVORK5CYII=",
      newProfilePicture:
        "data:image/png;base64,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rI+aoxhwdwlko5n99ebWrQdtESkHuJjrHk+zp+n2w/b95c7FM5XvvTgWFvRRG4qPXMBaU5bJzTu1azfrUWIDj7/pXlg49HyPxdK1W7V7i+1XXxw9/51Ra4/QjPoIBcxMimlptXP1xtbSRlzwVAFz5qHATKGvWh3zuz9vPFrpvHpxYmIsOCINH5WAlSJi+uSz2h+ubQaaQx9z5mGjFJUCdedxe2k9fuO1qTOnylk2/EfFR+IstNa0sZX8+t3qZiMdCZHukBOhWsecP1H68T9OV8recK+mHvK9uXsfwp37jV9eXunEGeo9CphpvKQfr0W/uryyUu3ofj9O7FAZ5h1aKcoyee+D9d/8aT3NBBd4jxRfc72V/Z8/rN64WdN6CB9g1DW0x8BaU72RXbm29qAal3CV6EjSihXTu9c3ozh7+bsTgaeG75am4QxYa9rcTn95eaUTG5xqPsqYqRioazfrm7X0X/9pztc8ZA0P4dCkNS0ut395eTlOjI8lzUAU+urBSvTbd1faUaaGa5cfrq+GSGtaXYvfeqcaJxYHvfBU4PGjavS7K9UotsPU8BB9KURa08PF9v/+/XJBM+qFrwh9Vd1M/vMPy622GZqGh+XrINKa1jbi//rzemF4TznCHvker9fTP364nmUyHDvJkATcXarx1tsrWWbxgEj4BoHHdxc7b/+pSjQM3+iHIWBmarXN5ffXrMXFXvh2oc+fPW5/fGt7CCbSzn8F3dfVXrm2vlZLPdQLuxMG6v1Pag8etzzH12k5H7BSdPNO7fbjNm7Hh93rPhb4139cSzK3J9JuB6wUrW3EVz+tYa0V5KWYxMrVv244fceS2/s9M/36SjXLrNPfROGgFHz1lzv1lWrb3RseHA5YKbr3oLlZT3HiCnrmMV/9aNvd9ZWuBsxMrVb27vXNSujsN084BDzNSxvx3c8bjp6RdvNTE2lNdx802h1MnmGvAo9v3WtkmZPP4HEyYGZqd+xfPmsEeHMC7JlW/HAtrq7HLh4Juxrwo6VWlFgc/EJf+JrvPGiIg2OwkwEbI3cfNPFiXugXT/Hj1bjVyZw7InMvAmZqtrKHazFOPkO/MFMzNpvbEQIeOK1pqdoRp6++w+HDRNX15KA/RW7uBWwMLVU7GH6hv7SixbXIunZF2LGAmSkzsl3D4g3oM2Zutk2SOnafsGMBE1G7nbZi49ZWhsOPmdqJjSLHdi3HAmamTmxSI05tZHAAE6WZTTPH3uPgWsBEWWKO+EvZYUCMJRwDDxiTtTgDDQMhIuTaruVawEToF+Ap9wIGgKcQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAwxAwgMMQMIDDEDCAw/4/0156baY0Zl0AAAAASUVORK5CYII=",
    };
    this.previewProfile = this.previewProfile.bind(this);
    this.profilePictureChange = this.profilePictureChange.bind(this);
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
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      profilePicture: this.state.newProfilePicture,
    };
    this.props.signup(userData, this.props.history);
  }

  previewProfile() {
    const profile = document.querySelector(".profile-pic");
    if (profile.classList.contains("remove")) {
      const profilePicture = document.querySelector("#profilePicture");
      const item = document.querySelector(".avatar-set");
      profilePicture.src = this.state.profilePicture;
      profilePicture.classList.remove("profile-set");
      profile.dataset.tooltip = "No file chosen";
      profile.classList.remove("remove");
      item.classList.add("avatar-not-set");
      item.classList.remove("avatar-set");
      item.innerText = "CHANGE AVATAR";
      document.querySelector("#profile-pic-input").value = "";
      this.setState({ newProfilePicture: this.state.profilePicture });
    } else {
      document.querySelector("#profile-pic-input").click();
    }
  }
  profilePictureChange(event) {
    if (event.target.id === "profile-pic-input") {
      const reader = new FileReader();
      const files = event.target.files;
      reader.onload = function (e) {
        const profilePicture = document.querySelector("#profilePicture");
        const item = document.querySelector(".avatar-not-set");
        profilePicture.parentElement.classList.add("remove");
        profilePicture.parentElement.dataset.tooltip = files[0].name;
        profilePicture.classList.add("profile-set");
        item.classList.add("avatar-set");
        item.classList.remove("avatar-not-set");
        item.innerText = "REMOVE";
        this.setState({ newProfilePicture: e.target.result });
      };
      reader.onload = reader.onload.bind(this);
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  render() {
    const { errors } = this.props;
    return (
      <div className="container pt-5">
        <div className="row py-5">
          <div className="col s12">
            <div className="card">
              <div className="card-content text-dark">
                <div className="row">
                  <div className="col s5 12 flex j-center a-center">
                    <div
                      className="profile-pic tooltipped"
                      data-position="bottom"
                      data-tooltip="No file chosen"
                      onClick={this.previewProfile}
                    >
                      <img
                        className="sig-img"
                        id="profilePicture"
                        src={this.state.newProfilePicture}
                        alt="profilePicture"
                      />
                      <input
                        type="file"
                        className="form-control-file"
                        id="profile-pic-input"
                        name="profilePicture"
                        accept="image/*"
                        onChange={this.profilePictureChange}
                      />
                      <div className="change-avatar avatar-not-set text-white">
                        CHANGE AVATAR
                      </div>
                    </div>
                  </div>
                  <form className="col s7" onSubmit={this.onSubmit}>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">account_circle</i>
                        <input
                          id="icon_prefix"
                          type="text"
                          className="validate"
                          name="username"
                          value={this.state.username}
                          onChange={this.onChange}
                        />
                        <label htmlFor="icon_prefix">Username</label>
                        {errors.username && (
                          <div className="red-text">{errors.username}</div>
                        )}
                      </div>
                    </div>
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
                        Signup
                        <i className="material-icons right">send</i>
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

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { signup })(Signup);
