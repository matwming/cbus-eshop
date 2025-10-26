import { rest } from "msw";

export const handlers = [
  rest.get("https://fakestoreapi.com/products", (req, res, ctx) => {
    return res(ctx.json({ id: "abc-123" }));
  }),
];
