import React from "react";
import style from './Auth.module.css';
import { connect } from 'react-redux';


const mapStateToProps = (state, ownProps) => { return { ownProps, ...state }; };
const mapDispatchToProps = {};

const Auth = connect(mapStateToProps, mapDispatchToProps)(() => {

  return (
    <div>

    </div>
  );
});

export default Auth;