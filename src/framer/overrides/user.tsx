import React from "react";
import { withTextProperty, withImageProperty } from "./properties";

export function withFirstName(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextProperty(Component, "FirstName");
}

export function withLastName(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextProperty(Component, "LastName");
}

export function withFullName(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextProperty(Component, "FullName");
}

export function withEmail(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextProperty(Component, "Email");
}

export function withAvatar(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withImageProperty(Component, "ProfileImageS3Url");
}

export function withAccountName(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextProperty(Component, "Account.Name");
}
