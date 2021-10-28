import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import './App.css'
import SignIn from './components/SignIn'
import Home from './components/Home'
import MoviesDetails from './components/MoviesDetails'
import ProtectedRoute from './components/ProtectedRoute'
import Account from './components/Account'
import PopularMovies from './components/PopularMovies'
import NotFound from './components/NotFound'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={SignIn} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/account" component={Account} />
      <ProtectedRoute
        exact
        path="/:id/movie-details"
        component={MoviesDetails}
      />
      <ProtectedRoute exact path="/popular" component={PopularMovies} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
