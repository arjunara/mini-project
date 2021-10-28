import Header from '../Header'
import './index.css'

const LandingSection = props => {
  const {movieObject} = props
  const {name, overview, posterPath} = movieObject
  const baseUrl = `https://image.tmdb.org/t/p/w500${posterPath}`
  return (
    <div
      className="landing-section-bg-container"
      style={{backgroundImage: `url(${baseUrl})`}}
    >
      <div>
        <Header />
        <div className="poster-details-container">
          <h1 className="poster-name">{name}</h1>
          <p className="poster-overview">{overview}</p>
          <button type="button" className="play-button">
            Play
          </button>
        </div>
      </div>
      <div className="landing-bottom" />
    </div>
  )
}

export default LandingSection
