import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Review extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editing: false,
            review: ''
        }
    }

    handleReview(val) {
        this.setState({
            review: val
        })
    }

    setEdit() {
        this.setState({
            editing: true
        })
    }

    update(id) {
        const { review } = this.state
        this.props.update(id, review)
        this.setState({
            editing: false,
            review: ''
        })
    }

    render() {
        const { review, user } = this.props
        // console.log(user.username)
        return (
            <div className='review'>
                <div>
                    {user === review.username ? (
                        <Link to={`/review/${review.id}`}>
                            <p>
                                <strong style={{color:'green'}} >{review.username.charAt(0).toUpperCase()+review.username.substr(1)}</strong>
                            </p>
                        </Link>
                    ) : (
                        <p>
                            <strong style={{color:'grey'}}>{review.username.charAt(0).toUpperCase()+review.username.substr(1)}</strong>
                        </p>
                    )}
                    {this.state.editing ? (
                        <input className='edit-box'
                            type='text'
                            value={this.state.review ? this.state.review : review.review}
                            onChange={e => this.handleReview(e.target.value)}
                        />
                    ) : (
                        <p>{review.review}</p>
                    )}
                </div>
                {user === review.username ? (
                    <div>
                        <button className='review-btn' onClick={() => this.props.delete(review.id)}>
                          Delete
                        </button>
                        {this.state.editing ? (
                            <button className='review-btn' onClick={() => this.update(review.id)}>
                              Save Changes
                            </button>
                        ) : (
                            <button className='review-btn' onClick={() => this.setEdit()}>Edit</button>
                        )}
                    </div>
                ) : null}
            </div>
        )
    }
 }