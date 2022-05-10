import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'
import NoPasswordView from '../NoPasswordView'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class AddPassword extends Component {
  state = {
    websiteName: '',
    userName: '',
    password: '',
    isPasswordVisible: false,
    passwordList: [],
    searchInput: '',
  }

  toggleShowPassword = () => {
    this.setState(prevState => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }))
  }

  deletePassword = id => {
    const {passwordList} = this.state
    this.setState({
      passwordList: passwordList.filter(password => password.id !== id),
    })
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteName, userName, password} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newList = {
      id: v4(),
      website: websiteName,
      name: userName,
      pass: password,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newList],
      websiteName: '',
      userName: '',
      password: '',
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({websiteName: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {
      websiteName,
      userName,
      password,
      isPasswordVisible,
      passwordList,
      searchInput,
    } = this.state

    const searchResults = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const lengthOfList = searchResults.length

    return (
      <div className="app-container">
        <div className="width-adjust-container">
          <img
            className="password-manager-img"
            alt="app logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          />

          <div className="form-image-container">
            <div className="form-container">
              <form onSubmit={this.onAddPassword} className="form-class">
                <h1 className="heading">Add New Password</h1>
                <div className="input-container">
                  <div className="input-icon-bg">
                    <img
                      alt="website"
                      className="input-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                    />
                  </div>
                  <div className="input-bg">
                    <input
                      type="text"
                      className="class-input"
                      placeholder="Enter Website"
                      onChange={this.onChangeWebsite}
                      value={websiteName}
                    />
                  </div>
                </div>
                <div className="input-container">
                  <div className="input-icon-bg">
                    <img
                      alt="username"
                      className="input-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                    />
                  </div>
                  <div className="input-bg">
                    <input
                      type="text"
                      className="class-input"
                      placeholder="Enter Username"
                      onChange={this.onChangeUsername}
                      value={userName}
                    />
                  </div>
                </div>
                <div className="input-container">
                  <div className="input-icon-bg">
                    <img
                      alt="password"
                      className="input-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                    />
                  </div>
                  <div className="input-bg">
                    <input
                      type="password"
                      className="class-input"
                      placeholder="Enter Password"
                      onChange={this.onChangePassword}
                      value={password}
                    />
                  </div>
                </div>
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <img
              alt="password manager"
              className="password-manager-image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            />
          </div>
          <div className="password-item-container">
            <div className="count-search-container">
              <div className="count-heading-container">
                <h1 className="heading">Your Passwords</h1>

                <p className="count">{lengthOfList}</p>
              </div>

              <div className="search-container">
                <div className="search-icon-bg">
                  <img
                    alt="search"
                    className="search-icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  />
                </div>
                <div className="search-input-bg">
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Search"
                    value={searchInput}
                    onChange={this.onChangeSearchInput}
                  />
                </div>
              </div>
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={isPasswordVisible}
                  onChange={this.toggleShowPassword}
                />{' '}
                <span className="show-password-label">Show Passwords</span>
              </label>
            </div>

            {lengthOfList !== 0 ? (
              <ul className="passwords-list">
                {searchResults.map(eachPassword => (
                  <PasswordItem
                    key={eachPassword.id}
                    passwordDetails={eachPassword}
                    deletePassword={this.deletePassword}
                    isPasswordVisible={isPasswordVisible}
                  />
                ))}
              </ul>
            ) : (
              <NoPasswordView />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default AddPassword
