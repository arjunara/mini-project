import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {MdCancel} from 'react-icons/md'

import './index.css'

const homeButtonConstantsList = [
  {
    navId: 'HOME',
    displayText: 'Home',
  },
  {
    navId: 'POPULAR',
    displayText: 'Popular',
  },
]

class Header extends Component {
  state = {
    searchInput: '',
    showMobileMenu: false,
    showSearchBox: false,
    pageNumber: 1,
    isHomeActive: true,
    isPopularActive: false,
  }

  onClickSearchIcon = () => {
    this.setState(prevState => ({showSearchBox: !prevState.showSearchBox}))
  }

  onClickHomeButton = () => {
    this.setState({isHomeActive: true, isPopularActive: false})
  }

  onClickPopularButton = () => {
    this.setState({isHomeActive: false, isPopularActive: true})
  }

  getSearchResults = async () => {
    const {apiDataMethod} = this.props
    const apiKey = '7f581abaa1d8045d8ebe9271c2570255'
    const {pageNumber, searchInput} = this.state

    const searchApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=${pageNumber}`
    const searchResponse = await fetch(searchApiUrl)
    const searchData = await searchResponse.json()
    const filteredSearchData = searchData.results.filter(
      each => each !== null && each.poster_path !== null,
    )
    const updatedSearchData = filteredSearchData.map(each => ({
      posterPath: each.poster_path,
      id: each.id,
      title: each.title,
    }))
    apiDataMethod(updatedSearchData)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickEnterInput = event => {
    if (event.key === 'Enter') {
      const {searchInput} = this.state
      const {searchValue} = this.props
      searchValue(searchInput)
      this.getSearchResults()
      this.setState({searchInput: ''})
    }
  }

  onClickAddToQueue = () => {
    this.setState({showMobileMenu: true})
  }

  onClickCancelBtn = () => {
    this.setState({showMobileMenu: false})
  }

  renderMobileMenuView = () => (
    <div className="mobile-menu-container">
      <Link to="/" className="link-item">
        <p className="nav-mobile-item">Home</p>
      </Link>
      <Link to="/popular" className="link-item">
        <p className="nav-mobile-item">Popular</p>
      </Link>
      <Link to="/account" className="link-item">
        <p className="nav-mobile-item">Account</p>
      </Link>
      <button
        type="button"
        className="custom-btn"
        onClick={this.onClickCancelBtn}
      >
        <MdCancel className="cancel-icon" size={32} />
      </button>
    </div>
  )

  renderSearchBar = () => {
    const {showSearchBox, searchInput} = this.state
    return showSearchBox ? (
      <>
        <div className="search-input-container">
          <input
            type="search"
            placeholder="search"
            value={searchInput}
            className="search-input"
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onClickEnterInput}
          />
          <button
            type="button"
            className="custom-btn"
            onClick={this.onClickSearchIcon}
          >
            <BsSearch className="search-icon" size={20} />
          </button>
        </div>
      </>
    ) : (
      <button
        type="button"
        className="custom-btn"
        onClick={this.onClickSearchIcon}
      >
        <BsSearch className="search-icon" size={25} />
      </button>
    )
  }

  render() {
    const {showMobileMenu, isHomeActive, isPopularActive} = this.state
    return (
      <>
        <nav className="nav-bar">
          <div className="nav-container">
            <div className="logo-container">
              <Link to="/" className="link-item">
                <img
                  src="https://res.cloudinary.com/venkateshd/image/upload/v1635149713/movies_website_logo.png"
                  alt="website-logo"
                  className="nav-website-logo"
                />
              </Link>
              <ul className="nav-items-container">
                <Link
                  to="/"
                  className="link-item"
                  onClick={this.onClickHomeButton}
                >
                  <li className={isHomeActive ? 'nav-item active' : 'nav-item'}>
                    Home
                  </li>
                </Link>
                <Link
                  to="/popular"
                  className="link-item"
                  onClick={this.onClickPopularButton}
                >
                  <li
                    className={isPopularActive ? 'nav-item active' : 'nav-item'}
                  >
                    Popular
                  </li>
                </Link>
              </ul>
            </div>
            <div className="search-container">
              {this.renderSearchBar()}
              <Link to="/account">
                <button type="button" className="custom-btn account-custom-btn">
                  <img
                    src="https://res.cloudinary.com/venkateshd/image/upload/v1635236265/Avatar_unmvac.svg"
                    alt="avatar"
                  />
                </button>
              </Link>
              <button
                type="button"
                className="custom-btn custom-sm-btn"
                onClick={this.onClickAddToQueue}
              >
                <img
                  src="https://res.cloudinary.com/venkateshd/image/upload/v1635428714/add-to-queue_1_ruqjov.png"
                  alt="add to queue"
                />
              </button>
            </div>
          </div>
        </nav>
        {showMobileMenu && this.renderMobileMenuView()}
      </>
    )
  }
}

export default Header
