import {
  createTRPCRouter,
  baseProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { agentsInsertSchema } from "../schemas";
import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";
export const agentsRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const data = await db.select().from(agents);

    return data;
  }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({
          ...getTableColumns(agents),
        })
        .from(agents)
        .where(eq(agents.id, input.id));

      return existingAgent;
    }),
  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, instructions } = input;
      const { auth } = ctx;

      const data = await db
        .insert(agents)
        .values({
          name,
          instructions,
          userId: auth.user.id,
        })
        .returning();

      return data[0];
    }),
});
