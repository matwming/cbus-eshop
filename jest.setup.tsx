import '@testing-library/jest-dom';
import 'whatwg-fetch';
import {server} from "@/mocks/node";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {render} from "@testing-library/react";

export const renderWithProviders = (ui: React.ReactNode) => {
    function renderWithRQ(ui: React.ReactNode) {
        const qc = new QueryClient({
            defaultOptions: { queries: { retry: false } }
        });
        return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>);
    }
    return renderWithRQ(ui);
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


