import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeToggle } from "./theme-toggle";

test("Toggle Test", async () => {
  render(<ThemeToggle />);
  expect(screen.getByText("Toggle theme")).toBeDefined();
});
