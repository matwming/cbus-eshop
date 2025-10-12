import {rest} from 'msw'

export const handlers = [
    rest.get('/products', (req, res, ctx) => {
        return res(ctx.json({ id: 'abc-123' }))
    }),
]
