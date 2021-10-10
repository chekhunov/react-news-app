import React, { useState } from 'react'
import { withRouter } from "react-router";
import { PreLoader, CardNews } from '../../components'

import './Home.scss'
function Home({ isLoading, getDays, setIdNews, sortNews, getTime, setIsClickNews }) { 
    
    const [isCountMinuts, setIsCountMinuts] = useState(false)
    const [howLongOpen, setHowLongOpen] = useState([])

    return (
        <div className="news d-flex mt-30 mb-50">
            <div className="container">
            { !isLoading && 
            <div className="news__inner">
                
            {sortNews && sortNews.map((item, index) => {
                if(index === 0) {         
                return  <CardNews 
                            key={item.id} 
                            setIsClickNews={setIsClickNews}
                            getDays={getDays} 
                            getTime={getTime} 
                            setIdNews={setIdNews}
                            {...item} />
                    } 
                })
            }

            <div className="news__content">
                {sortNews && sortNews.map((item, index) => {
                    if(index >= 1) {         
                    return  <CardNews 
                                key={item.id}
                                setIsClickNews={setIsClickNews}
                                getDays={getDays} 
                                getTime={getTime}
                                setIdNews={setIdNews}
                                {...item} />
                        }
                    })
                }
            </div>         
                </div>}

            </div>

            { isLoading && <PreLoader />}
        </div>
    )
}

export default withRouter(Home)