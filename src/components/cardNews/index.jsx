import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import './CardNews.scss';
export default function CardNews({
  id,
  setIsClickNews,
  fields,
  webTitle,
  webPublicationDate,
  getDays,
  getTime,
  getMinLastViewed,
  setIdNews,
  onClick,
  onPlus,
  viewed = false,
  added = false,
}) {
  const [isAdded, setIsAdded] = React.useState(added);
  const [date, setDate] = useState(+new Date());
  const [isCount, setIsCount] = useState('');

  const onClickPlus = () => {
    onPlus({ id, date });
    setIsAdded(!isAdded); //инверсия если тру значит фалс и на оборот
    console.log('onClickPlus');
  };

  // const getLastTime = (id) => {
  //     const resultTime = getMinLastViewed(id)
  //     if(resultTime) {
  //        return setIsCount(resultTime)
  //     }
  // }

  return (
    <article className="news__meta">
      <div className="news__left">
        <Link to={`/${id}`}>
          <div
            className="news__headline truncate-text"
            onClick={() => {
              onClickPlus();
              getTime(id);
              setIdNews(id);
              setIsClickNews(true);
            }}>
            {webTitle}
          </div>
        </Link>

        <p className="news__desc trim-few">{fields.bodyText}</p>

        <div className="news__bottom">
          <div className="news__date">
            <span className="news__days">{getDays(webPublicationDate)}</span>

            <span>day{getDays(webPublicationDate) > 1 && 's'} ago</span>

            <span className="news__date-click">{getMinLastViewed(id)}</span>
          </div>

          <Link to={`/${id}`}>
            <span
              className="news__link"
              onClick={() => {
                setIdNews(id);
                setIsClickNews(true);
              }}>
              Read more
            </span>
          </Link>
        </div>
      </div>

      <div className="news__rigth">
        <Link to={`/${id}`}>
          <div
            className="news__img-inner"
            onClick={() => {
              setIdNews(id);
              setIsClickNews(true);
            }}>
            <img src={fields.thumbnail} alt="content news" />
          </div>
        </Link>
      </div>
    </article>
  );
}
