import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import sendEmailRoute from "./routes/contact/send-email/route";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  contact: createTRPCRouter({
    sendEmail: sendEmailRoute,
  }),
});

export type AppRouter = typeof appRouter;