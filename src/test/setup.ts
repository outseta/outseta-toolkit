import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock window.location for tests
Object.defineProperty(window, "location", {
  value: {
    host: "localhost:3000",
    href: "http://localhost:3000",
  },
  writable: true,
});

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};
