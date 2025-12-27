import { Hono } from "hono";

const api = new Hono();

api.get("/ping", (c) => {
  return c.html(<b>Pong</b>);
});

export default api;
