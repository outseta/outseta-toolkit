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

// Display completed lessons (comma-separated list) as component text
export function withLessonsCompleted(Component): ComponentType {
  return lessons.withLessonsCompletedAsText(Component);
}

/**
 * ℹ️ **NOTE:** The following overrides require a `slug` property on the component
 */

// Component visible if lesson is completed
export function showWhenLessonCompleted(Component): ComponentType {
  return lessons.showWhenLessonCompleted(Component);
}

// Component visible if lesson is not completed
export function showWhenLessonNotCompleted(Component): ComponentType {
  return lessons.showWhenLessonNotCompleted(Component);
}

// Toggle lesson completion status
// Selects primary variant when lesson is completed
// Selects configured variant when lesson is not completed
export function toggleLessonCompleted(Component): ComponentType {
  return lessons.toggleLessonCompleted(Component);
}

// Selects primary variant when lesson is completed
// Selects configured variant when lesson is not completed
export function selectPrimaryVariantWhenLessonCompleted(
  Component
): ComponentType {
  return lessons.selectPrimaryVariantWhenLessonCompleted(Component);
}
