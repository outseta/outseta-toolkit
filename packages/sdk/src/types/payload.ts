export interface OutsetaJwtPayload {
  // Standard JWT claims
  nbf: number;
  exp: number;
  iss: string;
  client_id: string;
  scope: string[];
  sub: string;
  auth_time: number;
  idp: string;
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  nameid: string;
  amr: string[];
  aud: string;
  iat: number;

  // Outseta-specific claims
  "outseta:accountUid": string;
  "outseta:isPrimary": string;
  "outseta:subscriptionUid": string;
  "outseta:planUid": string;
  "outseta:addOnUids": string[];
}
