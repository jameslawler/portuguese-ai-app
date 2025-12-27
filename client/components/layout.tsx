import type { FC } from "hono/jsx";

const Layout: FC = (props) => {
  return (
    <html>
      <body>
        <>{props.children}</>
        <script src="/htmx.min.js"></script>
      </body>
    </html>
  );
};

export default Layout;
