import React, { useState, useEffect } from "react";
import style from './Loader.module.css';
import { useRouter } from 'next/router';

const SPIN = {
  NONE: 0,
  DEFAULT: 1,
  CLAW: 2
};

const Spin = ({ type = SPIN.DEFAULT }) => {
  switch (type) {
    case SPIN.NONE: return null;
    case SPIN.DEFAULT: return (
      <div className={style.spin_wrapper}>
        <div className={style.spin}></div>
      </div>
    );
    case SPIN.CLAW: return (
      <div className={style.spin_wrapper}>
        <div className={`${style.spin_claw} ${style.claw_low}`}></div>
        <div className={`${style.spin_claw} ${style.claw_medium}`}></div>
        <div className={`${style.spin_claw} ${style.claw_high}`}></div>
      </div>
    );
    default: return null;
  };
};

const Loader = ({ spin = SPIN.DEFAULT }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url) => setLoading(true);
    const handleComplete = (url) => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    }
  });

  return (
    <div className={`${style.loader} ${loading ? style['-show'] : style['-hide']}`}>
      <div className={style.screen}></div>
      <div className={style.view}>
      </div>
      <Spin type={spin} />
    </div>
  );
};

export default Loader;