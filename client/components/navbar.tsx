import type { FC } from "hono/jsx";
import { User } from "../../types/auth";

const Navbar: FC<{ user: User }> = (props: { user: User }) => {
  return (
    <nav class="bg-blue-900 text-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex h-16 items-center justify-between">
          <div class="text-xl font-semibold tracking-wide"><a href="/">Portuguese AI</a></div>
          {props.user.isLoggedIn && (
            <div class="flex space-x-6">
              <a
                href="#"
                hx-post="/api/auth/sign-out"
                hx-trigger="click"
                hx-swap="none"
                class="text-sm font-medium hover:text-blue-300 transition-colors"
              >
                Sign Out
              </a>
            </div>
          )}
          {!props.user.isLoggedIn && (
            <div class="flex space-x-6">
              <a
                href="/account/signup"
                class="text-sm font-medium hover:text-blue-300 transition-colors"
              >
                Sign Up
              </a>
              <a
                href="/account/signin"
                class="text-sm font-medium hover:text-blue-300 transition-colors"
              >
                Sign In
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
