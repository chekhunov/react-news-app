import React from 'react'
import { withRouter } from "react-router";
import { useParams } from 'react-router-dom';

import './ContentNews.scss'
function ContentNews({ isLoading, sortNews, idNews }) {
    const { id } = useParams();

    return (
        <>
            {!isLoading && 
            
            <section className="news-pages">
                <div className="container">
                    <div className="news-pages__inner">
                        {sortNews && sortNews.map((item, index) => {                   
                        if(item.id === idNews){
                            return  <div key="item.id" className="news-pages__content">
                                        <div  className="news-pages__top">
                                            <img src={item.fields.thumbnail} alt="news photo" />
                                        </div>

                                        <div className="news-pages__article">
                                            <div className="container-small">
                                                <div className="news-pages__article-inner">
                                                    <h1 className="news-pages__title">{item.webTitle}</h1>
                                                    <p className="news-pages__desc">"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
                                                    "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
                                                    </p>

                                                    <hr />

                                                    <p className="news-pages__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id venenatis justo, mattis commodo dolor. Ut tristique aliquam fermentum. Nullam purus sem, gravida a urna id, viverra rhoncus felis. Curabitur id augue at libero commodo rhoncus non quis nibh. Proin sagittis nunc quam, convallis malesuada nulla aliquam ut. Vivamus viverra ornare tempus. Maecenas varius justo ac turpis euismod volutpat. Fusce ullamcorper est felis, ac varius mi congue id. Sed diam ante, mollis sit amet porttitor nec, suscipit non eros. Curabitur nec dolor consectetur, elementum purus vitae, suscipit lorem. Donec vulputate leo sed justo auctor, pharetra aliquet velit faucibus. Suspendisse commodo eros magna, eu gravida eros dignissim sit amet.
                                                    </p>

                                                    <p className="news-pages__text">Morbi aliquam tellus risus, eu commodo sapien pharetra ac. Duis bibendum nulla id tempus ornare. Aliquam ut posuere dui, in ullamcorper urna. In sollicitudin efficitur libero sit amet sollicitudin. Quisque congue orci nisi, hendrerit egestas odio consectetur suscipit. Nulla lobortis augue et nibh rutrum, et vulputate risus mollis. Aliquam nibh ligula, vulputate nec molestie quis, euismod et nibh. Donec quis tellus nec turpis lobortis sagittis. Curabitur vestibulum ac nibh vitae laoreet. Phasellus eleifend sollicitudin suscipit. Duis quis lacus id turpis porttitor ultricies a at turpis.
                                                    </p>

                                                    <p className="news-pages__text">Sed eu dignissim urna. Aliquam laoreet sapien sed nunc pulvinar cursus. Ut sit amet consectetur nisl. Phasellus id ex sed nisi mollis commodo a nec tellus. Sed vel mattis nulla. Donec eget lectus ac lectus pellentesque fringilla. Pellentesque a arcu vel eros mollis vehicula ut ut diam.
                                                    </p>

                                                    <p className="news-pages__text">Maecenas et urna dapibus, blandit ipsum at, dictum felis. Cras congue faucibus ante, non aliquam ante pellentesque et. Donec id ullamcorper erat. Phasellus quis nulla eleifend, aliquet nibh vestibulum, dapibus libero. Praesent varius sapien dapibus mi efficitur tincidunt. Nam quis mi bibendum, maximus tellus vel, rhoncus sem. Vivamus eget hendrerit leo. Curabitur in orci vel nulla porttitor porta non a urna. Phasellus at massa posuere, consectetur felis vel, suscipit mauris. Quisque ac purus eu felis efficitur dapibus sit amet sed turpis. Suspendisse mi mi, malesuada feugiat lobortis eget, auctor sodales magna.
                                                    </p>

                                                    <p className="news-pages__text">
                                                    Pellentesque metus felis, commodo ac augue quis, hendrerit vestibulum turpis. Nulla aliquam nulla ut tempus porttitor. Phasellus et arcu velit. Maecenas blandit ligula ut purus laoreet auctor. Praesent blandit tortor lorem, nec finibus nisl hendrerit vitae. Curabitur mattis ipsum in nisi tempus ultricies. Sed pellentesque elementum commodo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas quis finibus libero.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                        })}
                    </div>
                </div>
            </section>
           }
        </>
    )
}

export default withRouter(ContentNews)
