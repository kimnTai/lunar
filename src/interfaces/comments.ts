export interface CommentProps {
  _id: string;
  comment: string;
  cardId: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface NewCommentProps {
  cardId: string;
  comment: string;
}
