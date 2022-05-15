import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => ({ ...state, ...ownProps });
const mapDispatchToProps = {

};

const ColorTheme = connect(mapStateToProps, mapDispatchToProps)(props => {

  return null;
});

export default ColorTheme;