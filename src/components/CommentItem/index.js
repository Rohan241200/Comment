import './index.css'

const CommentItem = props => {
  const {user, deleteComment, isLikeStatus} = props
  const {id, name, comment, date, isLike, color} = user

  const onDelete = () => {
    deleteComment(id)
  }

  const onchangeLikeStatus = () => {
    isLikeStatus(id)
  }

  const buttonLike = isLike ? 'with-like' : 'without-like'
  const buttonLiked = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  return (
    <>
      {id !== undefined && (
        <li className="user-comment-card">
          <div className="user-details">
            <p className={`user-logo ${color}`}>{name[0]}</p>
            <p className="user-name">{name}</p>
            <p className="user-time">{date}</p>
          </div>
          <p className="user-comment-desc">{comment}</p>
          <div className="like-card">
            <div className="button-card">
              <img src={buttonLiked} alt="like" className="like-emoji" />
              <button
                type="button"
                className={`button ${buttonLike}`}
                onClick={onchangeLikeStatus}
              >
                Like
              </button>
            </div>
            <button
              type="button"
              className="delete-btn"
              onClick={onDelete}
              data-testid="delete"
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
                alt="delete"
                className="delete-img"
              />
            </button>
          </div>

          <hr className="separate" />
        </li>
      )}
    </>
  )
}
export default CommentItem
