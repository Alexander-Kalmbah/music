import React from "react";
import Head from "next/head";
import { connect } from "react-redux";
import style from './Layout.module.css';


const mapStateToProps = (state, ownProps) => ({ ...state, ...ownProps });
const mapDispatchToProps = {};

const Layout = connect(mapStateToProps, mapDispatchToProps)(props => {
  const title = props.title || props.app?.title;
  const keywords = props.keywords || props.app?.keywords;
  const description = props.description || props.app?.description;



  return (
    <>
      <Head>
        {title ? <title>{title}</title> : null}
        {keywords ? <meta name="keywords" content={keywords} /> : null}
        {description ? <meta name="description" content={description} /> : null}
      </Head>

      <div className={style.wrapper}>
        {props.children || null}
      </div>
    </>
  );
});

export default Layout;