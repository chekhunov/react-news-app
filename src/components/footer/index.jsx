import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import style from './Footer.module.scss'


export default function Footer() {
    const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 300){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 300){
      setShowScroll(false)
    }
  };

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  window.addEventListener('scroll', checkScrollTop)
    return (
        <section className = {style.footer}>
            <div className="container">
                <div className={classNames("unselectable","pos-r", style.copy)}>
                    <Link to="/">
                    <span className="logo">News App</span>
                    </Link>

                     2021 copyright all rights reserved

                {showScroll && <button className="button-up" onClick={scrollTop}>Scroll to top <span className="icon-arrow-top"></span></button>}
                </div>
            </div>
        </section>
    )
}
