import { Hono } from "hono";
import { userRoute } from "./route/user";
import { accountRoute } from "./route/account";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();
app.use(cors());
app.route("/api/v1/user", userRoute);
app.route("/api/v1/account", accountRoute);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
