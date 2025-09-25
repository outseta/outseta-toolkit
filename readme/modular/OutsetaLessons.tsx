// File: OutsetaLessons.tsx
// Lesson tracking system for Outseta integration
import { type ComponentType } from "react";
import { lessons } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.3/dist/framer/overrides.js";

/*
 ***********************************************************
 ** 🚨 **REQUIRES** a person custom property with system name: LessonsCompleted **
 ***********************************************************
 1. Go to CRM > Custom Properties > Person > Add Property
 2. Make sure the system name is "LessonsCompleted"
 3. and the control type is "text"
 */

//// LESSON TRACKING ////

/*
 ***********************************************************
 ** 🚨 **REQUIRES** a person custom property with system name: LessonsCompleted **
 ***********************************************************
 1. Go to CRM > Custom Properties > Person > Add Property
 2. Make sure the system name is "LessonsCompleted"
 3. and the control type is "text"
 */

/**
 * ℹ️ **NOTE:** The following overrides require a `slug` property on the component
 */

// Component visible for authenticated users when lesson is completed
export function showWhenCompleted(Component): ComponentType {
  return lessons.showWhenLessonCompleted(Component);
}

// Toggle lesson completion status
// Selects primary variant for authenticated users when lesson is completed
// Selects configured variant for authenticated users when lesson is not completed
export function toggleCompleted(Component): ComponentType {
  return lessons.toggleLessonCompleted(Component);
}

// Selects primary variant for authenticated users when lesson is completed
// Selects configured variant for authenticated users when lesson is not completed
export function selectPrimaryVariantWhenCompleted(Component): ComponentType {
  return lessons.selectPrimaryVariantWhenLessonCompleted(Component);
}
