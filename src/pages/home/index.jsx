import React from 'react'
import { Link } from 'react-router-dom'
import PreLoader from '../../components/preLoader'

import './Home.scss'
export default function Home({ isLoading, news }) {

    

    return (
        <div className="news d-flex justify-center align-center m-auto">
            <div className="container">
            { !isLoading && <div className="news__inner">
                <div className="news__meta">
                    <div className="news__left">
                    <div className="news__headline">
                            
                        </div>

                        <p className="news__desc">

                        </p>

                        <div className="news__bottom">
                            <div className="news__date"></div>

                            <Link>
                                <span className="news__link">Read more</span>
                            </Link>
                        </div>
                    </div>

                    <div className="news__rigth">
                        <img src="" alt="content news" />
                    </div>
                </div>

                <div className="news__content">


                </div>
                
                </div>}

            </div>

            { isLoading && <PreLoader />}
        </div>
    )
}
