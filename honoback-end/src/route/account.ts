import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const accountRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
}>();

accountRoute.use("/*", async (c, next) => {
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

accountRoute.get("/balance", async (c) => {
  const Prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.get("userId");
  try {
    const balance = await Prisma.balance.findFirst({
      where: {
        userId: id,
      },
    });
    return c.json({ balance: balance?.balance });
  } catch (e) {
    return c.json({ error: e });
  }
});
accountRoute.post("/transfer", async (c) => {
  const Prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.get("userId");
  const { amount, to } = await c.req.json();
  try {
    const result = await Prisma.$transaction(async (prisma) => {
      const fromBalance = await prisma.balance.findFirst({
        where: {
          userId: id,
        },
      });
      await prisma.balance.update({
        where: {
          userId: id,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });
      await prisma.balance.update({
        where: {
          userId: to,
        },
        data: {
          balance: {
            increment: amount,
          },
        },
      });
    });
    return c.json({ msg: "transaction successfully", result: result });
  } catch (e) {
    return c.json({ error: e });
  }
});
