export interface UserSigninDto {
  email: string;
  password: string;
}

export interface UserSignupDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
