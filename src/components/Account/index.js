import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Account = props => {
  const onClickLogoutButton = () => {
    const {history} = props
    Cookies.remove('access_Token')
    history.replace('/login')
  }

  return (
    <div className="account-bg-container">
      <Header />
      <div className="account-page-container">
        <div className="details-container">
          <h1 className="account-heading">Account</h1>
          <hr className="header-rule" />
          <div className="membership-container">
            <p className="title-text">Member ship</p>
            <div className="user-details-container">
              <p className="title-value">venkatesh12rr1a0308@gmail.com</p>
              <p className="password">Password: *************</p>
            </div>
          </div>
          <hr className="header-rule" />
          <div className="plan-details-container">
            <p className="title-text">Plan details</p>
            <p className="premium">Premium</p>
            <p className="ultra-hd">Ultra HD</p>
          </div>
          <hr className="header-rule" />
          <div className="logout-container">
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogoutButton}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
