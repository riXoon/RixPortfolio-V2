// Cache headers for the public, read-only GET endpoints.
// - Visitors (no token): cached by the browser/CDN for 60s, then served stale for up
//   to 5 minutes while it revalidates in the background.
// - Admin requests (carry a token): never cached, so the dashboard always shows the
//   latest data right after a save.
export const publicCache = (req, res, next) => {
    if (req.method === 'GET') {
        res.set(
            'Cache-Control',
            req.headers.authorization ? 'no-store' : 'public, max-age=60, stale-while-revalidate=300'
        )
        res.vary('Authorization')
    }
    next()
}
