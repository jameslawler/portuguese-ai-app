import { Hono } from "hono";
import HomePage from "../../client/pages/home-page";

const web = new Hono();

web.get("/", (c) => {
  const messages = ["Good Morning", "Good Evening", "Good Night"];
  return c.html(<HomePage messages={messages} />);
});

export default web;
