import {Component} from 'react'
import {Link} from 'react-router-dom'

import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

import './index.css'

class HomeSearch extends Component {
  state = {pageNumber: 1}

  onDecrementPageNumber = () => {
    const {pageNumber} = this.state
    if (pageNumber > 1) {
      this.setState(prevState => ({pageNumber: prevState.pageNumber - 1}))
    }
  }

  onIncrementPageNumber = () => {
    const {pageNumber} = this.state
    if (pageNumber < 20) {
      this.setState(prevState => ({pageNumber: prevState.pageNumber + 1}))
    }
  }

  renderSearchResultsPageView = () => {
    const {apiData} = this.props
    return (
      <div className="search-movie-container">
        <ul className="search-movie-list-container">
          {apiData.map(eachMovie => {
            const searchMovieImgUrl = `https://image.tmdb.org/t/p/w500${eachMovie.posterPath}`
            return (
              <Link to={`/${eachMovie.id}/movie-details`}>
                <li key={eachMovie.id} className="search-movie-list-item">
                  <img
                    src={searchMovieImgUrl}
                    alt={eachMovie.title}
                    className="search-movie-image"
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
          <p className="page-number">{1} of 20</p>
          <button
            type="button"
            className="control-button"
            onClick={this.onIncrementPageNumber}
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>
    )
  }

  renderSearchFailureView = () => {
    const {searchValue} = this.props
    return (
      <div className="search-failure-container">
        <img
          src="https://res.cloudinary.com/venkateshd/image/upload/v1635415486/Group_7394_fymtyq.png"
          alt="failure vector"
          className="search-failure-image"
        />
        <p className="failure-error-msg">
          {`Your search for ${searchValue} did not find any matches`}
        </p>
      </div>
    )
  }

  render() {
    const {apiData} = this.props
    return (
      <div className="home-search-bg-container">
        {apiData.length > 0
          ? this.renderSearchResultsPageView()
          : this.renderSearchFailureView()}
      </div>
    )
  }
}

export default HomeSearch
