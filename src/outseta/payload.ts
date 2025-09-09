export interface OutsetaJwtPayload {
  // Standard JWT claims
  nbf: number; // Not before
  exp: number; // Expiration time
  iss: string; // Issuer
  client_id: string;
  scope: string[];
  sub: string; // Subject
  auth_time: number;
  idp: string; // Identity provider
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  nameid: string;
  amr: string[]; // Authentication method references
  aud: string; // Audience
  iat: number; // Issued at

  // Outseta-specific claims
  "outseta:accountUid": string;
  "outseta:isPrimary": string;
  "outseta:subscriptionUid": string;
  "outseta:planUid": string;
  "outseta:addOnUids": string[];
}
