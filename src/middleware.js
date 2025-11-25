import { withAuth } from 'next-auth/middleware';

export default withAuth({
pages: { signIn: '/login' }, // where to send unauthenticated users
callbacks: {
authorized: ({ token }) => !!token // only allow when logged in
}
});

export const config = {
matcher: [
'/add-toys',
'/manage-toys',
'/edit-toy/(.+)',
'/toys/(.+)' // protects /toys/[id] (details)
]
};