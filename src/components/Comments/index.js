import {Component} from 'react'
import './index.css'
import {formatDistanceToNow} from 'date-fns'
import {v4 as uuid} from 'uuid'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const commentsList = [{}]

// Write your code here
class Comments extends Component {
  state = {
    count: 0,
    userDetails: commentsList,
    userName: '',
    userComment: '',
  }

  onSubmitComment = event => {
    event.preventDefault()
    const {userName, userComment} = this.state

    const newComment = {
      id: uuid(),
      name: userName,
      comment: userComment,
      date: formatDistanceToNow(new Date()),
      isLike: false,
      color:
        initialContainerBackgroundClassNames[
          Math.ceil(
            Math.random() * initialContainerBackgroundClassNames.length - 1,
          )
        ],
    }

    this.setState(prevState => ({
      count: prevState.count + 1,
      userDetails: [...prevState.userDetails, newComment],
      userName: '',
      userComment: '',
    }))
  }

  onuserName = event => {
    this.setState({userName: event.target.value})
  }

  onuserComment = event => {
    this.setState({userComment: event.target.value})
  }

  onChangeDelete = id => {
    const {userDetails, count} = this.state
    const filterDelete = userDetails.filter(each => each.id !== id)

    this.setState({userDetails: filterDelete})
    if (count > 0) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  onChangeLike = id => {
    this.setState(prevState => ({
      userDetails: prevState.userDetails.map(each => {
        if (each.id === id) {
          return {...each, isLike: !each.isLike}
        }
        return each
      }),
    }))
  }

  render() {
    const {count, userDetails, userName, userComment} = this.state
    return (
      <div className="bg-container">
        <div className="bg-card">
          <h1 className="heading">Comments</h1>
          <div className="user-container">
            <form className="user-input" onSubmit={this.onSubmitComment}>
              <p className="user-desc">Say something about 4.0 Technologies</p>
              <input
                type="text"
                placeholder="Your Name"
                className="u-input"
                value={userName}
                onChange={this.onuserName}
              />
              <br />
              <textarea
                rows="5"
                cols="20"
                className="u-comment"
                placeholder="Your Comment"
                value={userComment}
                onChange={this.onuserComment}
              />
              <br />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-img"
            />
          </div>
          <hr className="separate" />
          <div className="comments-count">
            <p className="comment-count">{count}</p>
            <p className="comment-desc">Comments</p>
          </div>
          <ul className="comments-items">
            {userDetails.map(each => (
              <CommentItem
                user={each}
                key={each.id}
                deleteComment={this.onChangeDelete}
                isLikeStatus={this.onChangeLike}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
