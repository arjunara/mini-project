import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class SignIn extends Component {
  state = {usernameInput: '', passwordInput: '', showError: false}

  getRequestTokenMethod = async () => {
    const apiKey = '7f581abaa1d8045d8ebe9271c2570255'
    const apiRequestTokenUrl = `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`
    const requestTokenResponse = await fetch(apiRequestTokenUrl)
    const requestTokenObj = await requestTokenResponse.json()
    const requestedToken = requestTokenObj.request_token
    this.validateLoginDetailsMethod(requestedToken)
  }

  validateLoginDetailsMethod = async requestedToken => {
    const {usernameInput, passwordInput} = this.state
    const apiKey = '7f581abaa1d8045d8ebe9271c2570255'
    const userDetails = {
      username: usernameInput,
      password: passwordInput,
      request_token: requestedToken,
    }
    const apiLoginUrl = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-type': 'application/json',
      },
    }
    const response = await fetch(apiLoginUrl, options)
    const data = await response.json()
    if (data.success === true) {
      const {history} = this.props
      Cookies.set('access_Token', data.request_token, {expires: 7})
      this.setState({usernameInput: '', passwordInput: '', showError: false})
      history.replace('/')
    } else {
      this.setState({showError: true})
    }
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSubmitSignInForm = event => {
    event.preventDefault()
    this.getRequestTokenMethod()
  }

  render() {
    const {usernameInput, passwordInput, showError} = this.state
    const errorMessage = 'Please enter a valid Email & Password'
    const accessToken = Cookies.get('access_Token')
    if (accessToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="sign-in-app-container">
        <div className="sign-in-logo-container">
          <img
            src="https://res.cloudinary.com/venkateshd/image/upload/v1635149713/movies_website_logo.png"
            alt="movies-logo"
            className="movie-logo"
          />
        </div>
        <div className="login-container">
          <h1 className="sign-in-heading">Sign in</h1>
          <form className="form-control" onSubmit={this.onSubmitSignInForm}>
            <div className="input-container">
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                type="text"
                className="input"
                placeholder="Enter Username"
                id="username"
                value={usernameInput}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                type="password"
                className="input"
                placeholder="Enter Password"
                id="password"
                value={passwordInput}
                onChange={this.onChangePassword}
              />
            </div>
            {showError && <p className="error-msg">{errorMessage}</p>}
            <button type="submit" className="submit-button">
              Sign in
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default SignIn
