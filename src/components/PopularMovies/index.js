import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import {BsGoogle, BsTwitter} from 'react-icons/bs'
import {AiFillInstagram, AiFillYoutube} from 'react-icons/ai'

import Header from '../Header'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class PopularMovies extends Component {
  state = {isLoading: true, pageNumber: 1, popularMovieList: []}

  componentDidMount() {
    this.getPopularMovies()
  }

  onDecrementPageNumber = () => {
    const {pageNumber} = this.state
    if (pageNumber > 1) {
      this.setState(
        prevState => ({pageNumber: prevState.pageNumber - 1}),
        () => this.getPopularMovies(),
      )
    }
  }

  onIncrementPageNumber = () => {
    const {pageNumber} = this.state
    if (pageNumber < 20) {
      this.setState(
        prevState => ({pageNumber: prevState.pageNumber + 1}),
        () => this.getPopularMovies(),
      )
    }
  }

  getPopularMovies = async () => {
    const {pageNumber} = this.state
    const apiKey = '7f581abaa1d8045d8ebe9271c2570255'
    const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pageNumber}`
    const popularMovieResponse = await fetch(popularMoviesUrl)
    const popularMoviesData = await popularMovieResponse.json()
    const modifiedPopularMovieData = popularMoviesData.results.map(each => ({
      posterPath: each.poster_path,
      id: each.id,
      title: each.title,
    }))
    this.setState({
      isLoading: false,
      popularMovieList: modifiedPopularMovieData,
    })
  }

  renderPopularMovies = () => {
    const {popularMovieList, pageNumber} = this.state
    return (
      <div className="popular-movie-container">
        <ul className="popular-movie-list-container">
          {popularMovieList.map(eachPopularMovie => {
            const PopularMovieImgUrl = `https://image.tmdb.org/t/p/w500${eachPopularMovie.posterPath}`
            return (
              <Link to={`/${eachPopularMovie.id}/movie-details`}>
                <li
                  key={eachPopularMovie.id}
                  className="popular-movie-list-item"
                >
                  <img
                    src={PopularMovieImgUrl}
                    alt={eachPopularMovie.title}
                    className="popular-movie-image"
                  />
                </li>
              </Link>
            )
          })}
        </ul>
        <div className="button-control-container">
          <button
            type="button"
            className="control-button"
            onClick={this.onDecrementPageNumber}
          >
            <IoIosArrowBack size={20} />
          </button>
          <p className="page-number">{pageNumber} of 20</p>
          <button
            type="button"
            className="control-button"
            onClick={this.onIncrementPageNumber}
          >
            <IoIosArrowForward size={20} />
          </button>
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
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="popular-bg-container">
        <Header />
        {isLoading ? (
          <div className="popular-loader-container">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        ) : null}
        {this.renderPopularMovies()}
      </div>
    )
  }
}

export default PopularMovies
