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
}
