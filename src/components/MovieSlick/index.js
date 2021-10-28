import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const MovieSlick = props => {
  const {fetchedList} = props
  const convertIntoCamelCase = movie => ({
    backdropPath: movie.backdrop_path,
  })
  const baseTrendingUrl = `https://image.tmdb.org/t/p/w500`
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {fetchedList.map(eachMovie => {
          const imagePath = convertIntoCamelCase(eachMovie)
          const imageUrl = `${baseTrendingUrl + imagePath.backdropPath}`
          return (
            <div key={eachMovie.id} className="image-container">
              <Link to={`/${eachMovie.id}/movie-details`}>
                <img
                  src={imageUrl}
                  alt={eachMovie.title}
                  className="movie-image"
                />
              </Link>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default MovieSlick
