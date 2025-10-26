import "@testing-library/jest-dom";
import "whatwg-fetch";
import { server } from "@/mocks/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import React from "react";
import { createStore, Provider } from "jotai";

export const renderWithJotaiProvider = (
  ui: React.ReactElement,
  states?: any[],
) => {
  const store = createStore();
  if (states) {
    states.forEach((state) => store.set(state[0], state[1]));
  }
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  render(
    <QueryClientProvider client={qc}>
      <Provider store={store}>{ui}</Provider>
    </QueryClientProvider>,
  );
  return { store };
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
