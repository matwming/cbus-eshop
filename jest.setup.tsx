import '@testing-library/jest-dom';
import 'whatwg-fetch';
import {server} from "@/mocks/node";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {render} from "@testing-library/react";
import React from "react";
import {createStore, PrimitiveAtom, Provider} from "jotai";
import {cartAtom} from "@/app/components/states";

export const renderWithProviders = (ui: React.ReactNode) => {
    function renderWithRQ(ui: React.ReactNode) {
        const qc = new QueryClient({
            defaultOptions: { queries: { retry: false } }
        });
        return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>);
    }
    return renderWithRQ(ui);
};

export const renderWithJotaiProvider = (
    ui: React.ReactElement,
    states:any[]
) => {
    const store = createStore();
    states.forEach(state => store.set(state[0], state[1]));
    render(<Provider store={store}>{ui}</Provider>);
    return { store };
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


