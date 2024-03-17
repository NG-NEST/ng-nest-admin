export const AuthI18n = 'auth';

export enum AuthDescription {
  AccessToken = 'AccessToken',
  RefreshToken = 'RefreshToken',
}

export enum AuthUnauthorized {
  Forbidden = 'Forbidden',
  Unauthorized = 'Unauthorized',
  AccountOrPasswordVerificationFailed = 'AccountOrPasswordVerificationFailed',
  TokenFailureOrValidationFailure = 'TokenFailureOrValidationFailure',
}

export enum LoginDescription {
  Account = 'Account',
  Password = 'Password',
  Code = 'Code',
}

export enum AuthResolverName {
  Login = 'Login',
  RefreshToken = 'RefreshToken',
  User = 'User',
}
