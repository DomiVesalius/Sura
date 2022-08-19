import React, { Component } from 'react';

interface CommentProps {
    authorName: string;
    createdAt: string;
    content: string;
    id: string;
}

interface CommentState {}

class Comment extends Component<CommentProps, CommentState> {
    includeDeleteButton() {
        return (
            <form action="" method="delete">
                <input className="btn btn-danger btn-sm" type="button" value="Delete" />
            </form>
        );
    }

    render() {
        return (
            <div className="comment">
                <div className="commenter-info">
                    <img
                        className="profile-picture"
                        src="..." // TODO: Implement user profile pictures
                        alt={`${this.props.authorName}'s profile picture`}
                    />
                    <div>{this.props.authorName}</div>
                </div>
                <div>{this.props.content}</div>
                <div>{this.props.createdAt}</div>
            </div>
        );
    }
}

export default Comment;
