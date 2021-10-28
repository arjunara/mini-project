import {Component} from 'react'
import Loader from 'react-loader-spinner'
import format from 'date-fns/format'

import DetailsLandingSection from '../DetailsLandingSection'
import Header from '../Header'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusConstantsList = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MoviesDetails extends Component {
  state = {
    apiStatus: apiStatusConstantsList.initial,
    movieDetailsList: {},
    similarMovieList: [],
  }

  componentDidMount() {
    this.getSpecificMoviesDetails()
  }

  getSpecificMoviesDetails = async () => {
    this.setState({apiStatus: apiStatusConstantsList.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiKey = '7f581abaa1d8045d8ebe9271c2570255'
    const getMovieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const getSimilarMoviesUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`
    const specificMovieResponse = await fetch(getMovieDetailsUrl)
    const similarMovieResponse = await fetch(getSimilarMoviesUrl)
    const similarData = await similarMovieResponse.json()

    if (specificMovieResponse.ok) {
      const data = await specificMovieResponse.json()
      const similarUpdatedData = similarData.results.map(eachMovie => ({
        posterPath: eachMovie.poster_path,
        id: eachMovie.id,
        title: eachMovie.title,
      }))
      const updatedData = {
        adult: data.adult,
        id: data.id,
        genres: data.genres,
        budget: data.budget,
        title: data.title,
        releaseDate: data.release_date,
        overview: data.overview,
        posterPath: data.poster_path,
        runtime: data.runtime,
        languagesAvailable: data.spoken_languages.map(each => ({
          englishName: each.english_name,
          name: each.name,
        })),
        voteAverage: data.vote_average,
        voteCount: data.vote_count,
        homepage: data.homepage,
      }

      this.setState({
        apiStatus: apiStatusConstantsList.success,
        movieDetailsList: updatedData,
        similarMovieList: similarUpdatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstantsList.failure})
    }
  }

  renderHomePageView = () => {
    const {movieDetailsList} = this.state
    return (
      <>
        <DetailsLandingSection movieDetails={movieDetailsList} />
        <div className="movie-feature-container">
          {this.renderMovieOtherDetails()}
          <div className="more-like-container">
            <h1 className="main-home-heading">More like this</h1>
            {this.renderSimilarMoviesView()}
          </div>
        </div>
      </>
    )
  }

  renderMovieOtherDetails = () => {
    const {movieDetailsList} = this.state
    const {
      genres,
      languagesAvailable,
      voteAverage,
      voteCount,
      releaseDate,
      budget,
    } = movieDetailsList
    const movieReleaseDate = format(new Date(releaseDate), 'do MMM yyyy')
    return (
      <div className="other-movie-details-container">
        <div className="feature-container">
          <h1 className="category-name">Genre</h1>
          <ul className="unordered-list-container">
            {genres.map(eachGenre => (
              <li key={eachGenre.id} className="list-item">
                {eachGenre.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="feature-container ">
          <h1 className="category-name">Audio Available</h1>
          <ul className="unordered-list-container">
            {languagesAvailable.map(eachLanguage => (
              <li key={eachLanguage.englishName} className="list-item">
                {eachLanguage.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="feature-container ">
          <h1 className="category-name">Rating Count</h1>
          <p className="list-item">{voteCount}</p>
          <h1 className="category-name">Rating Average</h1>
          <p className="list-item">{voteAverage}</p>
        </div>
        <div className="feature-container ">
          <h1 className="category-name">Budget</h1>
          <p className="list-item">{budget / 10000000} Cores</p>
          <h1 className="category-name">Release Date</h1>
          <p className="list-item">{movieReleaseDate}</p>
        </div>
      </div>
    )
  }

  renderSimilarMoviesView = () => {
    const {similarMovieList} = this.state
    return (
      <ul className="similar-movie-list-container">
        {similarMovieList.map(eachSimilarMovie => {
          const similarMovieImgUrl = `https://image.tmdb.org/t/p/w500${eachSimilarMovie.posterPath}`
          return (
            <li key={eachSimilarMovie.id} className="similar-movie-list-item">
              <img
                src={similarMovieImgUrl}
                alt={eachSimilarMovie.title}
                className="similar-movie-image"
              />
            </li>
          )
        })}
      </ul>
    )
  }

  renderFailureView = () => (
    <>
      <Header />
      <div className="failure-message-container">
        <h1 className="failure-message">
          This Movie Details are not Available
        </h1>
      </div>
    </>
  )

  renderLoadingView = () => (
    <>
      <div className="movie-details-loader-container">
        <Loader type="TailSpin" color="#D81F26" height={80} width={80} />
      </div>
    </>
  )

  apiSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstantsList.inProgress:
        return this.renderLoadingView()
      case apiStatusConstantsList.success:
        return this.renderHomePageView()
      case apiStatusConstantsList.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="movie-details-bg-container">{this.apiSwitch()}</div>
  }
}

export default MoviesDetails
