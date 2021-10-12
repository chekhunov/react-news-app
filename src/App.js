import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Context } from './state/context.js';
import axios from 'axios';
import Header from './components/header';
import Footer from './components/footer';
import { Home, ContentNews } from './pages';

function App() {
  const [context, setContext] = useState(Context);
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState('');

  const [removeSearch, setRemoveSearch] = useState(false);

  const [dateMil, setDateMil] = useState(+new Date());
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const [newsClickTimeItems, setNewsClickTimeItems] = useState([]);

  const [isClickNews, setIsClickNews] = useState(false);

  const [news, setNews] = useState([]);
  const [selectCategories, setSelectCategories] = useState('trending');
  const [idNews, setIdNews] = useState('');
  const [sortNews, setSortNews] = useState([]);

  const handleSubmit = () => {
    setFilter('');
    setRemoveSearch(!removeSearch);
  };

  //getMinLastViewed
  const getMinLastViewed = (id) => {
    if (!id) {
      return;
    }
    let millisecInMin = 60000;
    const newTime = dateMil;
    const objMin = newsClickTimeItems.filter((item) => item.id.includes(id));

    const ti = objMin.map((item) => item.date);
    const min = Math.ceil((newTime - ti) / millisecInMin);

    if (min < 27233) {
      //пипец поломка мозгов
      if(min<60){
       return String(`просмотрена ${min} мин. назад`);
      } else {
        const hours = Math.floor(min/60)
        const minLastPeriod = min - (hours*60 )
        return String(`просмотрена ${hours}ч.${minLastPeriod} мин. назад`);
      }
    }
    return 'не просмотрена';
  };

  function getTime(idCard) {
    if (!idCard) {
      return;
    }

    let t1 = context;
    let t2 = date.split('.').reverse();

    const newArrays = [{ id: idCard, date: t2, time: time }];
    if (!context) {
      setContext(newArrays);
    } else {
      setContext(newArrays);
    }

    return time;
  }

  //num days for aticles
  const getDays = (publicationDate) => {
    if (!publicationDate) {
      return '';
    }
    let t1 = publicationDate.substr(0, 10).split('-');
    let t2 = date.split('.').reverse();

    // Total time for one day
    let one_day = 1000 * 60 * 60 * 24;

    let x = t1;
    let y = t2;

    let x1 = `${x[1]}-${x[2]}-${x[0]}`;
    let y1 = `${y[1]}-${y[2]}-${y[0]}`;

    let date1 = new Date(x1);
    let date2 = new Date(y1);

    let days = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / one_day);

    return days;
  };

  const sortedList = (news) => {
    const newList = [...news];
    const sorted = newList.sort(
      (a, b) =>
        parseFloat(getDays(a.webPublicationDate)) - parseFloat(getDays(b.webPublicationDate)),
    );
    setSortNews(sorted);
  };

  //кастомное сравнение))
  const changeChars = (filterString) => {
    // mna
    const newfilterString = filterString.split('');
    const enArrays = "qwertyuiop[]asdfghjkl;'zxcvbnm,.".split('');
    const ruArrays = 'йцукенгшщзхъфывапролджэячсмитьбю.'.split('');
    let arr = [];

    for (let i = 0; i < newfilterString.length; i++) {
      let char = newfilterString[i]; //m
      //ищем совпажения букв с схемой англ
      const filterChar = ruArrays.filter((item) => item.toLowerCase().includes(char.toLowerCase()));
      if (filterChar) {
        //получаем индексы елементов
        const array = ruArrays.findIndex((i) => i === filterChar);
        if (array === -1) {
          return;
        } else {
          arr.push(enArrays[array]);
        }
      }
    }
    const end = arr.join('');
    //снова вызываю на проверку но уже с исправленными
    return filteredList(end);
  };

  const filteredList = (filterString) => {
    const newFilterList = [...sortNews];
    const filterActive = newFilterList.filter((item) =>
      item.webTitle.toLowerCase().includes(filterString.toLowerCase()),
    );
    // const filterAnotherVariants = filterString.sort().split(' ')
    // console.log(filterAnotherVariants)
    if (filterActive) {
      setSortNews(filterActive);
    }
    changeChars(filterString);
  };

  React.useEffect(() => {
    let cleanupFunction = false;
    async function fetchData() {
      try {
        setIsLoading(true);

        const newsResponse = await axios.get(
          `https://content.guardianapis.com/search?q= + ${selectCategories} + &show-tags=all&page-size=20&show-fields=all&order-by=relevance&api-key=0cc1c5bc-7fe4-47bc-80cc-f17c13be193c`,
        );
        const newsTimeClickResponse = await axios.get(
          `https://614bb851e4cc2900179eb1ab.mockapi.io/news-time`,
        );
        //my mockap
        //https://614bb851e4cc2900179eb1ab.mockapi.io/news-time
        // [
        // {
        //   "id": "business/2021/oct/08/slam-dunk-belgian-biscuits-big-christmas-foodie-trend-biscoff",
        //   "date": "1633995714413",
        //   "idNum": "3"
        //  }
        //  ]

        sortedList(newsResponse.data.response.results);
        setNewsClickTimeItems(newsTimeClickResponse.data);
      } catch (err) {
        alert('Hе удалось загрузить список новостей');
      }
      setIsLoading(false);
    }

    fetchData();
    // функция очистки useEffect
    return () => (cleanupFunction = true);
  }, [selectCategories, removeSearch]);

  const onAddToNewsTime = (obj) => {
    if (newsClickTimeItems.find((item) => String(item.id) === String(obj.id))) {
      axios.delete(`https://614bb851e4cc2900179eb1ab.mockapi.io/news-time/${obj.id}`);
      setNewsClickTimeItems((prev) => prev.filter((item) => String(item.id) === String(obj.id)));
    } else {
      //сдесь мы отправляем post запрос потому что мы меняем состояние сервера
      axios.post('https://614bb851e4cc2900179eb1ab.mockapi.io/news-time', obj);

      setNewsClickTimeItems((prev) => [...prev, obj]);
    }
  };

  return (
    <Context.Provider value={[context, setContext]}>
      <BrowserRouter>
        <Header
          setSelectCategories={setSelectCategories}
          filter={filter}
          setFilter={setFilter}
          filteredList={filteredList}
          handleSubmit={handleSubmit}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                isLoading={isLoading}
                setIsClickNews={setIsClickNews}
                news={news}
                sortNews={sortNews}
                setIdNews={setIdNews}
                getDays={getDays}
                getTime={getTime}
                onAddToNewsTime={onAddToNewsTime}
                newsClickTimeItems={newsClickTimeItems}
                getMinLastViewed={getMinLastViewed}
              />
            )}
          />

          <Route
            path="/:id"
            render={() => (
              <ContentNews isLoading={isLoading} sortNews={sortNews} setIsLoading={setIsLoading} />
            )}
          />
        </Switch>
        <Footer />
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
