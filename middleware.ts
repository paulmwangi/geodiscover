import { authMiddleware } from "@clerk/nextjs";
 
// Configure public and protected routes with RBAC support
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information
export default authMiddleware({
  publicRoutes: ['/', '/about', '/contact', '/blog', '/events', '/api/events', '/api/attractions', '/api/classifications', '/api/contact', '/api/newsletter'],
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 