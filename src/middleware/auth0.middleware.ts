// Middleware definitions for auth0

import jwt from "express-jwt";
import jwks from "jwks-rsa";
import jwtAuthz from "express-jwt-authz";

// Auth0 access tokens: https://auth0.com/docs/quickstart/backend/nodejs#configure-auth0-apis
export const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_DOMAIN,
  algorithms: ["RS256"],
});

export const usersScopes = {
  readAllUsers: jwtAuthz(["read:all_users"]),
  createUser: jwtAuthz(["create:user"]),
  deleteUser: jwtAuthz(["delete:user"]),
  readCurrentUser: jwtAuthz(["read:current_user"]),
  updateCurrentUser: jwtAuthz(["read:current_user"]),
};
