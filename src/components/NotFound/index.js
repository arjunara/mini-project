import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div>
    <nav className="not-found-header-container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/venkateshd/image/upload/v1635149713/movies_website_logo.png"
          alt="website-logo"
        />
      </Link>
    </nav>
    <div className="not-found-bg-container">
      <h1 className="lost-way-heading">Lost Your Way ?</h1>
      <p className="error-description">
        Sorry, we can’t find that page. You’ll find lots to explore on the home
        page
      </p>
      <Link to="/">
        <button type="button" className="netflix-home-button">
          Netflix Home
        </button>
      </Link>
      <p className="error-code-text">
        Error Code <span className="error-code"> NSES- 404</span>
      </p>
    </div>
  </div>
)

export default NotFound
