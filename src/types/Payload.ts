type JWTPayload = {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    user: User;
    user_id: number;
  }