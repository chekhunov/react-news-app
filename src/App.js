import React, { useState } from 'react'
import { BrowserRouter ,Route, Switch } from 'react-router-dom';
import { Context } from "./state/context.js";
import axios from 'axios';
import Header from './components/header'
import Footer from './components/footer'
import { Home, ContentNews } from './pages'

function App() {

  const [context, setContext] = useState(Context);
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState("");

  const [search, setSearch] = useState(false);
  const [removeSearch, setRemoveSearch] = useState(false);

  const [date, setDate] = useState(new Date().toLocaleDateString())
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  const [isClickNews, setIsClickNews] = useState(false)
  const [timeHowLongClick, setTimeHowLongClick] = useState([])

  const [news, setNews] = useState([])
  const [selectCategories, setSelectCategories] = useState('trending')
  const [idNews, setIdNews] = useState('')
  const [sortNews, setSortNews] = useState([])

  const [texpArray, setTexpArray] = useState([])

  const handleSubmit= () =>{
    // clearing the values
    setFilter("")
    setRemoveSearch(!removeSearch)
    // concatArr(sortNews,timeHowLongClick)
  }

  // const concatArr = (oldNews, timeHowLongClick) => {
  //   let arrays = [...oldNews]
  //   for (let keys in timeHowLongClick){
  //     arrays.hasOwnProperty(keys) || (arrays[keys] = timeHowLongClick[keys])
  //   }
  //   console.log(arrays,'gu')
  // }

  function getTime (idCard) {
    if(!idCard) {
      return
    }

    let t1 = context
    let t2 = date.split(".").reverse();

    const newArrays = [{id: idCard, date: t2, time: time}]
    if(!context) {
      setContext( newArrays)
    } else {
      setContext(newArrays)
    }

    return time
  }

  //num days for aticles
  const getDays = (publicationDate) => {
    if(!publicationDate) {
      return ''
    }
    let t1 = publicationDate.substr(0, 10).split("-");
    let t2 = date.split(".").reverse();

    // Total time for one day
    let one_day=1000*60*60*24;

    let x=t1     
    let y=t2

    let x1 = `${x[1]}-${(x[2])}-${x[0]}`
    let y1 = `${y[1]}-${(y[2])}-${y[0]}`

    let date1=new Date(x1);
    let date2=new Date(y1);

    let days = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (one_day));

    return days
}

const sortedList = (news) => {
  const newList = [...news]
  const sorted = newList.sort((a, b) => parseFloat(getDays(a.webPublicationDate)) - parseFloat(getDays(b.webPublicationDate)));
  setSortNews(sorted)
}

//кастомное сравнение))
const changeChars = (filterString) => {
  // if(!filterString){
  //   return
  // }
  console.log('ru')
// mna
  const newfilterString = filterString.split("") 
  const enArrays = 'qwertyuiop[]asdfghjkl;\'\zxcvbnm,.'.split("")
  const ruArrays = 'йцукенгшщзхъфывапролджэ\ячсмитьбю.'.split("")
  let arr = []
  
  for(let i = 0; i < newfilterString.length; i++) {
    let char = newfilterString[i] //m
    //ищем совпажения букв с схемой англ
    const filterChar = ruArrays.filter((item) => item.toLowerCase().includes(char.toLowerCase()))
    if(filterChar) {
      //получаем индексы елементов
      const array = ruArrays.findIndex(i => i == filterChar)
      if(array === -1) {
        return
      } else {
        arr.push(enArrays[array])
      }
    }
  }
  const end = arr.join("")
  //снова вызываю на проверку но уже с исправленными
  return filteredList(end)
}

const filteredList = (filterString) => {
  const newFilterList = [...sortNews]
  const filterActive = newFilterList.filter((item) => item.webTitle.toLowerCase().includes(filterString.toLowerCase()))
  if(filterActive) {
    setSortNews(filterActive)
  }
    changeChars(filterString)
  
}

  
  React.useEffect(() => {
    let cleanupFunction = false;
    async function fetchData() {
      try{
      setIsLoading(true);
    

      // const newsTredingResponse = await axios.get(`https://content.guardianapis.com/search?q=trending&show-tags=all&page-size=2 0&show-fields=all&order-by=relevance&api-key=0cc1c5bc-7fe4-47bc-80cc-f17c13b e193c`,);
      const newsResponse = await axios.get(`https://content.guardianapis.com/search?q= + ${selectCategories} + &show-tags=all&page-size=20&show-fields=all&order-by=relevance&api-key=0cc1c5bc-7fe4-47bc-80cc-f17c13be193c`,);
      const newsTimeClickResponse = await axios.get(`https://614bb851e4cc2900179eb1ab.mockapi.io/news-time`,);
      //my mockap
      //https://614bb851e4cc2900179eb1ab.mockapi.io/news-time

      sortedList(newsResponse.data.response.results);
      setTimeHowLongClick(newsTimeClickResponse.data)
      } catch (err) {
        alert('Hе удалось загрузить список новостей')
      }
      setIsLoading(false);
    }
    
    fetchData();
    // функция очистки useEffect
    return () => cleanupFunction = true;
  }, [selectCategories, removeSearch]);

  console.log(sortNews)
  console.log(timeHowLongClick)
  return (
    <Context.Provider value={[context, setContext]}>
      <BrowserRouter>  
        <Header 
        setSelectCategories={setSelectCategories} 
        filter={filter}
        setFilter={setFilter}
        filteredList={filteredList}
        handleSubmit={handleSubmit}/> 
          <Switch>
            <Route exact path="/" render={() => <Home 
              isLoading={isLoading} 
              setIsClickNews={setIsClickNews}
              news={news}
              sortNews={sortNews}
              setIdNews={setIdNews} 
              getDays={getDays}
              getTime={getTime}/>}/>

            <Route path="/news/:id" render={()=> <ContentNews 
            isLoading = {isLoading}
            sortNews={sortNews}
            idNews={idNews}
            />} />
        </Switch>
        <Footer />  
     </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
