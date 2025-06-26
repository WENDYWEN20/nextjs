import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
// 1. **Is there already a client stored on the global?**  
//    *Yes* → reuse it.  
//    *No* (`undefined` or `null`) → create a new one.
// 2. **Logging option** – the new instance logs every SQL query to the console, handy in development.
// The result is exported so any module can `import { prisma } …` and get the same object.