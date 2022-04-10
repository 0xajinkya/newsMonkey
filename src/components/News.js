import React, { useState, useEffect } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
    setLoading(false)
  }
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;

    updateNews();
    //eslint-disable-next-line
  }, [])

  // const handlePrevClick = async () => {
  // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=721bca40141d47f58a1fba777ec670b6&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  // setLoading(true);
  // let data = await fetch(url);
  // let parsedData = await data.json();
  // setArticles(parsed.articles);
  // setPage(page-1);
  // setLoading(false);
  //   setPage(page-1);
  //   updateNews();
  // }
  // const handleNextClick = async () => {
  //   if (!(page + 1 > Math.ceil(totalResults / props.pageSize))) {
  //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=721bca40141d47f58a1fba777ec670b6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //     // this.setState({loading: true})
  //     // let data = await fetch(url);
  //     // let parsedData = await data.json();
  //     // this.setState({
  //     //    articles: parsedData.articles,
  //     //   page: this.state.page+1,
  //     //   loading: false
  //     //   })
  //     setPage(page+1);
  //     updateNews();
  //   }
  // }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };



  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '75px' }}>NewsMonkey-Top Headlines On {props.category.charAt(0).toUpperCase() + props.category.slice(1).toLowerCase()}</h1>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >

        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col md-4 d-flex justify-content-around align-self-center" key={element.url}>
                <Newsitem title={element.title ? element.title.slice(0, 45) : " "} description={element.description ? element.description.slice(0, 88) : " "} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>
            &larr; Previous
          </button>
          <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>
            Next &rarr;
          </button>
        </div> */}
      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 15,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News