export interface OutsetaAddress {
  _objectType: "Address";
  AddressLine1: string | null;
  AddressLine2: string | null;
  AddressLine3: string | null;
  City: string;
  State: string;
  PostalCode: string;
  Country: string | null;
  GeoLocation: any | null;
  ActivityEventData: any | null;
  Uid: string;
  Created: string;
  Updated: string;
}

export interface OutsetaPlan {
  Name: string;
  Uid: string;
}

export interface OutsetaSubscription {
  _objectType: "Subscription";
  BillingRenewalTerm: number;
  Account: any | null;
  Plan: OutsetaPlan;
  Quantity: number | null;
  StartDate: string;
  EndDate: string | null;
  ExpirationDate: string | null;
  RenewalDate: string;
  NewRequiredQuantity: number | null;
  IsPlanUpgradeRequired: boolean;
  PlanUpgradeRequiredMessage: string | null;
  SubscriptionAddOns: any[];
  DiscountCouponSubscriptions: any[];
  DiscountCode: string | null;
  DiscountCouponExpirationDate: string | null;
  LatestInvoice: any | null;
  Rate: number;
  ActivityEventData: any | null;
  Uid: string;
  Created: string;
  Updated: string;
}

export interface OutsetaPerson {
  _objectType: "Person";
  Email: string;
  FirstName: string;
  LastName: string;
  MailingAddress: OutsetaAddress | null;
  PasswordLastUpdated: string | null;
  PasswordMustChange: boolean;
  PhoneMobile: string;
  PhoneWork: string;
  ProfileImageS3Url: string | null;
  Title: string | null;
  Timezone: string | null;
  Language: string | null;
  IPAddress: string | null;
  Referer: string | null;
  UserAgent: string | null;
  LastLoginDateTime: string | null;
  OAuthGoogleProfileId: string | null;
  PersonAccount: any | null;
  DealPeople: any | null;
  LeadFormSubmissions: any | null;
  EmailListPerson: any | null;
  Account: any | null;
  AccountUids: string[] | null;
  FullName: string;
  HasLoggedIn: boolean;
  OAuthIntegrationStatus: number;
  OptInToEmailList: boolean;
  Password: string | null;
  UserAgentPlatformBrowser: string;
  HasUnsubscribed: boolean;
  DiscordUser: any | null;
  IsConnectedToDiscord: boolean;
  SchemaLessDataLoaded: boolean;
  ActivityEventData: any | null;
  Uid: string;
  Created: string;
  Updated: string;
}

export interface OutsetaAccount {
  _objectType: "Account";
  Name: string;
  ClientIdentifier: string | null;
  Currency: string | null;
  InvoiceNotes: string;
  IsDemo: boolean;
  BillingAddress: OutsetaAddress;
  MailingAddress: OutsetaAddress;
  AccountStage: number;
  PaymentInformation: any | null;
  PersonAccount: any | null;
  StripeDefaultPaymentMethodId: string | null;
  StripeInvoices: any | null;
  StripePaymentMethods: any | null;
  StripeSubscriptions: any | null;
  Subscriptions: any | null;
  Deals: any | null;
  LastLoginDateTime: string;
  AccountSpecificPageUrl1: string;
  AccountSpecificPageUrl2: string;
  AccountSpecificPageUrl3: string;
  AccountSpecificPageUrl4: string;
  AccountSpecificPageUrl5: string;
  AccountSpecificPageUrl6: string;
  AccountSpecificPageUrl7: string;
  AccountSpecificPageUrl8: string;
  AccountSpecificPageUrl9: string;
  AccountSpecificPageUrl10: string;
  RewardFulReferralId: string | null;
  TaxIds: any | null;
  TaxStatus: string;
  AccountStageLabel: string;
  CurrentSubscription: OutsetaSubscription;
  DomainName: string | null;
  HasLoggedIn: boolean;
  LatestSubscription: any | null;
  LifetimeRevenue: number;
  Nonce: string | null;
  PrimaryContact: OutsetaPerson;
  PrimarySubscription: any | null;
  RecaptchaToken: string | null;
  StripePrice: any | null;
  TaxId: string | null;
  TaxIdIsInvalid: boolean;
  TaxIdType: string | null;
  WebflowSlug: string | null;
  StripeId: string | null;
  IsLivemode: boolean;
  LastEventCreated: string | null;
  SchemaLessDataLoaded: boolean;
  ActivityEventData: any | null;
  Uid: string;
  Created: string;
  Updated: string;
  // Any custom properties
  [key: string]: any;
}

export interface OutsetaUser {
  _objectType: "Person";
  Email: string;
  FirstName: string;
  LastName: string;
  MailingAddress: OutsetaAddress;
  PasswordLastUpdated: string;
  PasswordMustChange: boolean;
  PhoneMobile: string;
  PhoneWork: string;
  ProfileImageS3Url: string;
  Title: string | null;
  Timezone: string | null;
  Language: string;
  IPAddress: string;
  Referer: string;
  UserAgent: string;
  LastLoginDateTime: string;
  OAuthGoogleProfileId: string | null;
  PersonAccount: any | null;
  DealPeople: any | null;
  LeadFormSubmissions: any | null;
  EmailListPerson: any | null;
  Account: OutsetaAccount;
  AccountUids: string[] | null;
  FullName: string;
  HasLoggedIn: boolean;
  OAuthIntegrationStatus: number;
  OptInToEmailList: boolean;
  Password: string | null;
  UserAgentPlatformBrowser: string;
  HasUnsubscribed: boolean;
  DiscordUser: any | null;
  IsConnectedToDiscord: boolean;
  SchemaLessDataLoaded: boolean;
  ActivityEventData: any | null;
  Uid: string;
  Created: string;
  Updated: string;

  // Any custom properties
  [key: string]: any;

  // Method for updating user data
  update?: (data: any) => Promise<OutsetaUser>;
}
