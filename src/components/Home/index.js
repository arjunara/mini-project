import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsGoogle, BsTwitter} from 'react-icons/bs'
import {AiFillInstagram, AiFillYoutube} from 'react-icons/ai'

import Header from '../Header'
import LandingSection from '../LandingSection'
import MovieSlick from '../MovieSlick'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import HomeSearch from '../HomeSearch'

const apiStatusConstantsList = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstantsList.initial,
    originalsList: [],
    trendingList: [],
    topRatedList: [],
    apiData: {},
    searchString: '',
  }

  componentDidMount() {
    this.getOriginalMovieList()
  }

  onChangeSearch = value => {
    this.setState({searchString: value})
  }

  assignApiData = data => {
    this.setState({apiData: data})
  }

  getOriginalMovieList = async () => {
    this.setState({apiStatus: apiStatusConstantsList.inProgress})
    const apiKey = '7f581abaa1d8045d8ebe9271c2570255'
    const apiOriginalsUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`
    const apiTrendingUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`
    const apiTopRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`
    const originalsMovieResponse = await fetch(apiOriginalsUrl)
    const originalsData = await originalsMovieResponse.json()
    const trendingMovieResponse = await fetch(apiTrendingUrl)
    const trendingData = await trendingMovieResponse.json()
    const topRatedMovieResponse = await fetch(apiTopRatedUrl)
    const topRatedData = await topRatedMovieResponse.json()
    this.setState({
      originalsList: originalsData.results,
      trendingList: trendingData.results,
      topRatedList: topRatedData.results,
      apiStatus: apiStatusConstantsList.success,
    })
  }

  renderHomePageView = () => {
    const {
      originalsList,
      trendingList,
      topRatedList,
      searchString,
      apiData,
    } = this.state
    const randomMovieObject = originalsList[Math.ceil(Math.random() * 20) - 1]
    const modifiedMovieObject = {
      name: randomMovieObject.name,
      posterPath: randomMovieObject.poster_path,
      overview: randomMovieObject.overview,
      id: randomMovieObject.id,
    }
    return (
      <>
        <Header
          searchValue={this.onChangeSearch}
          apiDataMethod={this.assignApiData}
        />
        {searchString.length > 0 ? (
          <HomeSearch searchValue={searchString} apiData={apiData} />
        ) : (
          <>
            <LandingSection movieObject={modifiedMovieObject} />
            <div className="main-home-container">
              <div className="carousal-container">
                <h1 className="main-home-heading">Trending Now</h1>
                <MovieSlick fetchedList={trendingList} />
              </div>
              <div className="carousal-container">
                <h1 className="main-home-heading">Top Rated</h1>
                <MovieSlick fetchedList={topRatedList} />
              </div>
              <div className="carousal-container">
                <h1 className="main-home-heading">Originals</h1>
                <MovieSlick fetchedList={originalsList} />
              </div>
              <div className="footer-container">
                <div className="social-media-container">
                  <BsGoogle size={25} className="social-icon" />
                  <BsTwitter size={25} className="social-icon" />
                  <AiFillInstagram size={25} className="social-icon" />
                  <AiFillYoutube size={25} className="social-icon" />
                </div>
                <p className="contact-us">Contact Us</p>
              </div>
            </div>
          </>
        )}
      </>
    )
  }

  renderLoadingView = () => (
    <>
      <Header />
      <div className="home-loader-container">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </>
  )

  apiSwitchSelection = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstantsList.inProgress:
        return this.renderLoadingView()
      case apiStatusConstantsList.success:
        return this.renderHomePageView()
      default:
        return null
    }
  }

  render() {
    return <div className="home-app-section">{this.apiSwitchSelection()}</div>
  }
}

export default Home
