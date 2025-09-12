import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import { showForAuthStatus, triggerPopup, triggerAction } from "./auth";
import { authStore } from "../../auth-store";

// Mock the auth store
vi.mock("../../auth-store", () => ({
  authStore: vi.fn(),
}));

// Mock the utils log function
vi.mock("./utils", () => ({
  log: vi.fn(),
}));

describe("auth.tsx", () => {
  let mockAuthStore: any;
  let TestComponent: React.ComponentType<any>;

  beforeEach(() => {
    // Create a mock component for testing
    TestComponent = React.forwardRef<HTMLDivElement, any>((props, ref) => (
      <div ref={ref} data-testid="test-component" {...props}>
        Test Component
      </div>
    ));

    // Reset mocks
    vi.clearAllMocks();

    // Mock window.location for Framer canvas detection
    Object.defineProperty(window, "location", {
      value: {
        host: "localhost:3000",
        href: "http://localhost:3000",
      },
      writable: true,
    });

    // Setup mock auth store
    mockAuthStore = vi.fn();
    vi.mocked(authStore).mockImplementation(mockAuthStore);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("authenticated", () => {
    beforeEach(() => {
      mockAuthStore.mockImplementation((selector: any) => {
        const state = {
          status: "authenticated",
          payload: { sub: 1 },
          user: { Uid: 1, FullName: "Test User" },
        };
        return selector(state);
      });
    });

    describe("showForAuthStatus: pending", () => {
      it("should NOT render the component", () => {
        const WrappedComponent = showForAuthStatus(TestComponent, "pending");
        const { queryByTestId } = render(<WrappedComponent />);
        expect(queryByTestId("test-component")).not.toBeInTheDocument();
      });
    });

    describe("showForAuthStatus: anonymous", () => {
      it("should NOT render the component", () => {
        const WrappedComponent = showForAuthStatus(TestComponent, "anonymous");
        const { queryByTestId } = render(<WrappedComponent />);
        expect(queryByTestId("test-component")).not.toBeInTheDocument();
      });

      it("should render the component when in Framer canvas", () => {
        Object.defineProperty(window, "location", {
          value: {
            host: "test.framercanvas.com",
            href: "https://test.framercanvas.com",
          },
          writable: true,
        });

        const WrappedComponent = showForAuthStatus(TestComponent, "anonymous");
        const { getByTestId } = render(<WrappedComponent />);
        expect(getByTestId("test-component")).toBeInTheDocument();
      });
    });

    describe("showForAuthStatus: authenticated", () => {
      it("should render the component", () => {
        const WrappedComponent = showForAuthStatus(
          TestComponent,
          "authenticated"
        );
        const { getByTestId } = render(<WrappedComponent />);
        expect(getByTestId("test-component")).toBeInTheDocument();
      });
    });

    describe("showForAuthStatus: user-loaded", () => {
      it("should render the component when user exists", () => {
        const WrappedComponent = showForAuthStatus(
          TestComponent,
          "user-loaded"
        );
        const { getByTestId } = render(<WrappedComponent />);
        expect(getByTestId("test-component")).toBeInTheDocument();
      });

      it("should NOT render the component when no user", () => {
        // Override mock for this specific test
        mockAuthStore.mockImplementation((selector: any) => {
          const state = {
            status: "authenticated",
            user: null,
            payload: { sub: 1 },
          };
          return selector(state);
        });

        const WrappedComponent = showForAuthStatus(
          TestComponent,
          "user-loaded"
        );
        const { queryByTestId } = render(<WrappedComponent />);
        expect(queryByTestId("test-component")).not.toBeInTheDocument();
      });
    });

    describe("triggerPopup: register", () => {
      it("should NOT render the component when not in Framer", () => {
        const WrappedComponent = triggerPopup(TestComponent, "register");
        const { queryByTestId } = render(<WrappedComponent />);
        expect(queryByTestId("test-component")).not.toBeInTheDocument();
      });

      it("should render the component when in Framer canvas", () => {
        Object.defineProperty(window, "location", {
          value: {
            host: "test.framercanvas.com",
            href: "https://test.framercanvas.com",
          },
          writable: true,
        });

        const WrappedComponent = triggerPopup(TestComponent, "register");
        const { getByTestId } = render(<WrappedComponent />);
        const component = getByTestId("test-component");
        expect(component).toHaveAttribute("data-mode", "popup");
        expect(component).toHaveAttribute("data-o-auth", "1");
        expect(component).toHaveAttribute("data-widget-mode", "register");
      });
    });

    describe("triggerPopup: profile", () => {
      it("should render the component", () => {
        const WrappedComponent = triggerPopup(TestComponent, "profile");
        const { getByTestId } = render(<WrappedComponent />);
        const component = getByTestId("test-component");
        expect(component).toHaveAttribute("data-mode", "popup");
        expect(component).toHaveAttribute("data-o-profile", "1");
      });
    });

    describe("triggerAction: logout", () => {
      it("should render the component", () => {
        const WrappedComponent = triggerAction(TestComponent, "logout");
        const { getByTestId } = render(<WrappedComponent />);
        const component = getByTestId("test-component");
        expect(component).toHaveAttribute("data-o-logout-link", "1");
      });
    });
  });

  describe("anonymous", () => {
    beforeEach(() => {
      mockAuthStore.mockImplementation((selector: any) => {
        const state = { status: "anonymous", payload: null, user: null };
        return selector(state);
      });
    });

    describe("showForAuthStatus: anonymous", () => {
      it("should render the component", () => {
        const WrappedComponent = showForAuthStatus(TestComponent, "anonymous");
        const { getByTestId } = render(<WrappedComponent />);
        expect(getByTestId("test-component")).toBeInTheDocument();
      });
    });

    describe("showForAuthStatus: authenticated", () => {
      it("should NOT render the component", () => {
        const WrappedComponent = showForAuthStatus(
          TestComponent,
          "authenticated"
        );
        const { queryByTestId } = render(<WrappedComponent />);
        expect(queryByTestId("test-component")).not.toBeInTheDocument();
      });
    });

    describe("showForAuthStatus: pending", () => {
      it("should NOT render the component", () => {
        const WrappedComponent = showForAuthStatus(TestComponent, "pending");
        const { queryByTestId } = render(<WrappedComponent />);
        expect(queryByTestId("test-component")).not.toBeInTheDocument();
      });
    });

    describe("triggerPopup: register", () => {
      it("should render the component", () => {
        const WrappedComponent = triggerPopup(TestComponent, "register");
        const { getByTestId } = render(<WrappedComponent />);
        const component = getByTestId("test-component");
        expect(component).toHaveAttribute("data-mode", "popup");
        expect(component).toHaveAttribute("data-o-auth", "1");
        expect(component).toHaveAttribute("data-widget-mode", "register");
      });
    });

    describe("triggerPopup: profile", () => {
      it("should NOT render the component", () => {
        const WrappedComponent = triggerPopup(TestComponent, "profile");
        const { queryByTestId } = render(<WrappedComponent />);
        expect(queryByTestId("test-component")).not.toBeInTheDocument();
      });
    });

    describe("triggerAction: logout", () => {
      it("should NOT render the component", () => {
        const WrappedComponent = triggerAction(TestComponent, "logout");
        const { queryByTestId } = render(<WrappedComponent />);
        expect(queryByTestId("test-component")).not.toBeInTheDocument();
      });
    });
  });

  describe("pending", () => {
    beforeEach(() => {
      mockAuthStore.mockImplementation((selector: any) => {
        const state = { status: "pending", user: null, payload: null };
        return selector(state);
      });
    });

    describe("showForAuthStatus: pending", () => {
      it("should render the component", () => {
        const WrappedComponent = showForAuthStatus(TestComponent, "pending");
        const { getByTestId } = render(<WrappedComponent />);
        expect(getByTestId("test-component")).toBeInTheDocument();
      });
    });

    describe("showForAuthStatus: anonymous", () => {
      it("should render the component when in Framer canvas", () => {
        Object.defineProperty(window, "location", {
          value: {
            host: "test.framercanvas.com",
            href: "https://test.framercanvas.com",
          },
          writable: true,
        });

        const WrappedComponent = showForAuthStatus(TestComponent, "anonymous");
        const { getByTestId } = render(<WrappedComponent />);
        expect(getByTestId("test-component")).toBeInTheDocument();
      });
    });

    describe("showForAuthStatus: authenticated", () => {
      it("should NOT render the component", () => {
        const WrappedComponent = showForAuthStatus(
          TestComponent,
          "authenticated"
        );
        const { queryByTestId } = render(<WrappedComponent />);
        expect(queryByTestId("test-component")).not.toBeInTheDocument();
      });
    });
  });

  describe("Framer canvas detection", () => {
    it("should handle window.location access errors gracefully", () => {
      Object.defineProperty(window, "location", {
        get: () => {
          throw new Error("Access denied");
        },
        configurable: true,
      });

      mockAuthStore.mockImplementation((selector: any) => {
        const state = { status: "anonymous", user: null };
        return selector(state);
      });

      const WrappedComponent = showForAuthStatus(TestComponent, "anonymous");
      const { getByTestId } = render(<WrappedComponent />);
      expect(getByTestId("test-component")).toBeInTheDocument();
    });
  });
});
