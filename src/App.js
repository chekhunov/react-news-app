import React, { useState } from 'react'
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState([])
  const [selectCategories, setSelectCategories] = useState('Sport')

  React.useEffect(() => {
    async function fetchData() {
      try{
      setIsLoading(true);
    
      const newsResponse = await axios.get(`https://content.guardianapis.com/search?q= + ${selectCategories} + &show-tags=all&page-size=20&show-fields=all&order-by=relevance&api-key=0cc1c5bc-7fe4-47bc-80cc-f17c13be193c`,);

      setIsLoading(false);

      setNews(newsResponse.data.response.results);
      console.log(newsResponse.data.response.results)

      } catch (err) {
        alert('Hе удалось загрузить список новостей')
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Header setSelectCategories={setSelectCategories} />

      <Route path="/" exact render={() => <Home isLoading={isLoading} news={news} />} />
      
      <Footer />
    </>
  );
}

export default App;
