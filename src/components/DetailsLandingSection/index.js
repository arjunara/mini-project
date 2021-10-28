import format from 'date-fns/format'
import Header from '../Header'
import './index.css'

const DetailsLandingSection = props => {
  const {movieDetails} = props
  const {
    title,
    overview,
    posterPath,
    adult,
    homepage,
    runtime,
    releaseDate,
  } = movieDetails
  const filmCertificate = adult ? (
    <p className="film-certification">A</p>
  ) : (
    <p className="film-certification">UA</p>
  )
  const hrs = Math.floor(runtime / 60)
  const min = runtime % 60
  const playTime = `${hrs}h ${min}m`
  const releaseYear = format(new Date(releaseDate), 'yyyy')

  const baseUrl = `https://image.tmdb.org/t/p/w500${posterPath}`
  return (
    <div
      className="details-landing-section-bg-container"
      style={{backgroundImage: `url(${baseUrl})`}}
    >
      <div>
        <Header />
        <div className="poster-details-container">
          <h1 className="poster-title">{title}</h1>
          <div className="film-release-details">
            <p className="film-text">{playTime}</p>
            {filmCertificate}
            <p className="film-text">{releaseYear}</p>
          </div>
          <p className="poster-overview">{overview}</p>
          <a href={homepage} target="_blank" rel="noopener noreferrer">
            <button type="button" className="play-button">
              Play
            </button>
          </a>
        </div>
      </div>
      <div className="landing-bottom" />
    </div>
  )
}

export default DetailsLandingSection
