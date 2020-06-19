import React, { Component } from "react";

class ColorPalette extends Component {
  componentDidMount() {
    const dropdowns = document.querySelectorAll(".dropdown-trigger");
    window.M.Dropdown.init(dropdowns, {
      constrainWidth: false,
      hover: true,
      alignment: "left",
    });
  }
  render() {
    return (
      <>
        <ul className="dropdown-content" id="palette1">
          <div className="palette">
            <div className="palette-row">
              <a
                className="btn-floating btn-small waves-effect waves-light white tooltipped active-color"
                style={{ border: "1px solid gray" }}
                data-position="bottom"
                data-tooltip="default"
                onclick="changeCardColor.call(this, 'white')"
              >
                <i className="material-icons">check</i>
              </a>
              <a
                className="btn-floating btn-small waves-effect waves-light tooltipped cp-red"
                data-position="bottom"
                data-tooltip="Red"
                onclick="changeCardColor.call(this, 'rgb(242, 139, 130)')"
              ></a>
              <a
                className="btn-floating btn-small waves-effect waves-light tooltipped cp-orange"
                data-position="bottom"
                data-tooltip="Orange"
                onclick="changeCardColor.call(this, 'rgb(251, 188, 4)')"
              ></a>
              <a
                className="btn-floating btn-small waves-effect waves-light tooltipped cp-yellow"
                data-position="bottom"
                data-tooltip="Yellow"
                onclick="changeCardColor.call(this, 'rgb(255, 244, 117)')"
              ></a>
            </div>
            <div className="palette-row">
              <a
                className="btn-floating btn-small waves-effect waves-light tooltipped cp-green"
                data-position="bottom"
                data-tooltip="Green"
                onclick="changeCardColor.call(this, 'rgb(204, 255, 144)')"
              ></a>
              <a
                className="btn-floating btn-small waves-effect waves-light tooltipped cp-teal"
                data-position="bottom"
                data-tooltip="Teal"
                onclick="changeCardColor.call(this, 'rgb(167, 255, 235)')"
              ></a>
              <a
                className="btn-floating btn-small waves-effect waves-light tooltipped cp-blue"
                data-position="bottom"
                data-tooltip="Blue"
                onclick="changeCardColor.call(this, 'rgb(203, 240, 248)')"
              ></a>
              <a
                className="btn-floating btn-small waves-effect waves-light tooltipped cp-darkblue"
                data-position="bottom"
                data-tooltip="Dark Blue"
                onclick="changeCardColor.call(this, 'rgb(174, 203, 250)')"
              ></a>
            </div>
            <div className="palette-row">
              <a
                className="btn-floating btn-small waves-effect waves-light tooltipped cp-purple"
                data-position="bottom"
                data-tooltip="Purple"
                onclick="changeCardColor.call(this, 'rgb(215, 174, 251)')"
              ></a>
              <a
                className="btn-floating btn-small waves-effect waves-light tooltipped cp-pink"
                data-position="bottom"
                data-tooltip="Pink"
                onclick="changeCardColor.call(this, 'rgb(253, 207, 232)')"
              ></a>
              <a
                className="btn-floating btn-small waves-effect waves-light tooltipped cp-brown"
                data-position="bottom"
                data-tooltip="Brown"
                onclick="changeCardColor.call(this, 'rgb(230, 201, 168)')"
              ></a>
              <a
                className="btn-floating btn-small waves-effect waves-light tooltipped cp-gray"
                data-position="bottom"
                data-tooltip="Gray"
                onclick="changeCardColor.call(this, 'rgb(232, 234, 237)')"
              ></a>
            </div>
          </div>
        </ul>
      </>
    );
  }
}

export default ColorPalette;
