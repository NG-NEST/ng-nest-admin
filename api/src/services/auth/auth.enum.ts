export enum AuthDescription {
  AccessToken = 'JWT访问令牌',
  RefreshToken = 'JWT刷新令牌'
}

export enum AuthUnauthorized {
  AccountOrPasswordVerificationFailed = '账号或密码验证失败',
  TokenFailureOrValidationFailure = 'JWT令牌失效或验证失败'
}

export enum LoginDescription {
  Account = '账号',
  Password = '密码'
}

export enum AuthResolverName {
  Login = '登录',
  RefreshToken = '刷新JWT令牌',
  User = '用户信息'
}
