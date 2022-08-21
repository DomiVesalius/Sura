import React from 'react';

interface CommentProps {
    authorName: string;
    createdAt: string;
    content: string;
    id: string;
}

const Comment: React.FC<CommentProps> = () => {
    return <h2>Comment Component</h2>;
};

export default Comment;
