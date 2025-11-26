import { withAuth } from 'next-auth/middleware';

export default withAuth({
pages: { signIn: '/login' },
callbacks: {
authorized: ({ token }) => !!token
}
});

export const config = {
matcher: [
'/add-toys',
'/manage-toys',
'/edit-toy/(.+)',
'/toys/(.+)'
]
};