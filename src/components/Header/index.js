import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'

import './index.css'

class Header extends Component {
  state = {
    searchInput: '',
    showSearchBox: false,
  }

  onClickSearchIcon = () => {
    this.setState(prevState => ({showSearchBox: !prevState.showSearchBox}))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchBar = () => {
    const {showSearchBox, searchInput} = this.state
    return showSearchBox ? (
      <>
        <div className="search-input-container">
          <input
            type="search"
            placeholder="search"
            value={searchInput}
            className="search-input "
            onChange={this.onChangeSearchInput}
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
    const {searchInput} = this.state
    return (
      <>
        <nav className="nav-bar">
          <div className="nav-container">
            <div className="logo-container">
              <Link to="/" className="link-item">
                <img
                  src="https://res.cloudinary.com/venkateshd/image/upload/v1635149713/movies_website_logo.png"
                  alt="website-logo"
                />
              </Link>
              <ul className="nav-items-container">
                <Link to="/" className="link-item">
                  <li className="nav-item">Home</li>
                </Link>
                <Link to="/popular" className="link-item">
                  <li className="nav-item">Popular</li>
                </Link>
              </ul>
            </div>
            <div className="search-container">
              {this.renderSearchBar()}
              <Link to="/account">
                <button type="button" className="custom-btn">
                  <img
                    src="https://res.cloudinary.com/venkateshd/image/upload/v1635236265/Avatar_unmvac.svg"
                    alt="avatar"
                  />
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default Header
