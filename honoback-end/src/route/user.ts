import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
}>();

userRoute.use("/getAllUser", async (c, next) => {
  const token = c.req.header("Authorization") || "";
  try {
    const decodeString: any = await verify(token, "Smit@1212");
    if (decodeString?.userId) {
      c.set("userId", decodeString.userId);
      await next();
    }
  } catch (e) {
    return c.json({ error: e });
  }
});

userRoute.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });
    await prisma.balance.create({
      data: {
        balance: 1000,
        userId: user?.id,
      },
    });
    if (user) {
      return c.json({ msg: "user create successfully" });
    }
  } catch (e) {
    c.status(403);
    return c.json({ msg: "Email with this  User already created" });
  }
});
userRoute.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user?.id) {
      c.status(403);
      return c.json({ msg: "User does not exist" });
    }
    const jwt = await sign({ userId: user?.id }, "Smit@1212");
    c.status(200);
    return c.json({
      msg: "user Login successfully",
      userDetails: {
        token: jwt,
        user: {
          id: user?.id,
          name: user?.username,
          email: user?.email,
        },
      },
    });
  } catch (e) {
    c.status(400);
    return c.json({ msg: "Something went wrong" });
  }
});
userRoute.get("/getAllUser", async (c) => {
  const Prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const { filter } = c.req.query();
    const user = await Prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: filter,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: filter,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return c.json({
      users: user,
    });
  } catch (e) {
    return c.json({ error: e });
  }
});
