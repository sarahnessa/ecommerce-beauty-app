import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import App from "./page";

describe("password gate accessibility and interaction", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_VERCEL_ENV", "preview");
    window.sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
  });

  it("renders a named password field without an initial error", async () => {
    render(<App />);

    const passwordInput = await screen.findByLabelText("Password");

    expect(passwordInput.getAttribute("type")).toBe("password");
    expect(passwordInput.getAttribute("aria-invalid")).toBeNull();
    expect(passwordInput.getAttribute("aria-describedby")).toBeNull();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("announces an invalid password and clears the error when edited", async () => {
    const user = userEvent.setup();
    render(<App />);

    const passwordInput = await screen.findByLabelText("Password");
    await user.type(passwordInput, "wrong-password");
    await user.keyboard("{Enter}");

    const error = await screen.findByRole("alert");
    expect(error.textContent).toContain("Incorrect password. Please try again.");
    expect(passwordInput.getAttribute("aria-invalid")).toBe("true");
    expect(passwordInput.getAttribute("aria-describedby")).toBe(error.id);

    await user.type(passwordInput, "a");

    await waitFor(() => {
      expect(screen.queryByRole("alert")).toBeNull();
      expect(passwordInput.getAttribute("aria-invalid")).toBeNull();
      expect(passwordInput.getAttribute("aria-describedby")).toBeNull();
    });
  });
});
