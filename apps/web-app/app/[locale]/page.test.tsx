/// <reference types="vitest/globals" />
import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import Layout from "./layout";
import Page from "./page";

vi.mock("server-only", () => {
  return {};
});

test.each(["client", "server", "layout"])("%s component", async (keyword) => {
  render(
    <Layout
      params={{
        locale: "en",
      }}
    >
      <Suspense fallback="loading">
        <Page />
      </Suspense>
    </Layout>
  );

  await screen.findByText(keyword);
});
