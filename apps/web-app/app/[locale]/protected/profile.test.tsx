/// <reference types="vitest/globals" />
import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import Layout from "../layout";
import Profile from "./profile";

vi.mock("server-only", () => {
  return {};
});

test("%s component", async (keyword) => {
  render(<Profile />);

  await screen.findByText("asas");
});
