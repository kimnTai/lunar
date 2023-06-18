export interface LoginProps {
  email: string;
  password: string;
  name: string;
}

export interface UserProps {
  avatar: string;
  createdAt: string;
  email: string;
  googleId: string;
  isEmailVerification: boolean;
  name: string;
  updatedAt: string;
  _id: string;
}

export interface UpdateProfileProps {
  userId: string;
  name?: string;
  avatar?: string;
}
