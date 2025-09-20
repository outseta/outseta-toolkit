import React from "react";
import {
  withTextProperty as withTextPropertyFunc,
  withImageProperty as withImagePropertyFunc,
} from "./properties";

/**
 * Sets component text to user's first name
 * @param Component - The component to wrap
 */
export function withFirstName(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextPropertyFunc(Component, { name: "FirstName" });
}

/**
 * Sets component text to user's last name
 * @param Component - The component to wrap
 */
export function withLastName(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextPropertyFunc(Component, { name: "LastName" });
}

/**
 * Sets component text to user's full name
 * @param Component - The component to wrap
 */
export function withFullName(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextPropertyFunc(Component, { name: "FullName" });
}

/**
 * Sets component text to user's email address
 * @param Component - The component to wrap
 */
export function withEmail(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextPropertyFunc(Component, { name: "Email" });
}

/**
 * Sets component background image to user's avatar/profile image
 * @param Component - The component to wrap
 */
export function withAvatar(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withImagePropertyFunc(Component, { name: "ProfileImageS3Url" });
}

/**
 * Sets component text to account name
 * @param Component - The component to wrap
 */
export function withAccountName(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextPropertyFunc(Component, { name: "Account.Name" });
}

export function withTextProperty(
  Component: React.ComponentType<any>,
  propertyName: string
): React.ComponentType<any> {
  return withTextPropertyFunc(Component, { name: propertyName });
}

export function withImageProperty(
  Component: React.ComponentType<any>,
  propertyName: string
): React.ComponentType<any> {
  return withImagePropertyFunc(Component, { name: propertyName });
}
