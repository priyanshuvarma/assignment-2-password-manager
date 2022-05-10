import './index.css'

const PasswordItem = props => {
  const {passwordDetails, deletePassword, isPasswordVisible} = props
  const {website, name, pass, id, initialClassName} = passwordDetails
  const initial = website ? website[0].toUpperCase() : ''

  const onDeletePassword = () => {
    deletePassword(id)
  }

  return (
    <li className="password-item">
      <div className="pass-item-container">
        <div className={initialClassName}>
          <h1 className="initial">{initial}</h1>
        </div>
        <div className="pass-detail-container">
          <p className="details-item">{website}</p>
          <p className="details-item">{name}</p>
          {isPasswordVisible ? (
            <p className="details-item">{pass}</p>
          ) : (
            <img
              className="stars"
              alt="stars"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            />
          )}
        </div>
        <div className="delete-container">
          <button
            onClick={onDeletePassword}
            type="button"
            testid="delete"
            className="delete-button"
          >
            <img
              alt="delete"
              className="delete-img"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            />
          </button>
        </div>
      </div>
    </li>
  )
}

export default PasswordItem
