import React from "react";
import { withTextProperty, withImageProperty } from "./properties";

/**
 * Sets component text to user's first name
 * @param Component - The component to wrap
 */
export function withFirstName(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextProperty(Component, "FirstName");
}

/**
 * Sets component text to user's last name
 * @param Component - The component to wrap
 */
export function withLastName(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextProperty(Component, "LastName");
}

/**
 * Sets component text to user's full name
 * @param Component - The component to wrap
 */
export function withFullName(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextProperty(Component, "FullName");
}

/**
 * Sets component text to user's email address
 * @param Component - The component to wrap
 */
export function withEmail(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextProperty(Component, "Email");
}

/**
 * Sets component background image to user's avatar/profile image
 * @param Component - The component to wrap
 */
export function withAvatar(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withImageProperty(Component, "ProfileImageS3Url");
}

/**
 * Sets component text to account name
 * @param Component - The component to wrap
 */
export function withAccountName(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextProperty(Component, "Account.Name");
}
