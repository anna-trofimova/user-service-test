
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      fullName: "Admin User",
      birthDate: new Date("1990-01-01"),
      email: "admin@test.com",
      password,
      role: "admin",
      isActive: true,
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());