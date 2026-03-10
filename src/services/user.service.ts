import { prisma } from "../prisma/prisma";
import bcrypt from "bcrypt";

export const createUser = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      birthDate: new Date(data.birthDate),
      email: data.email,
      password: hashedPassword,
      role: data.role || "user"
    }
  });

  return user;
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email }
  });
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

export const getUsers = async () => {
  return prisma.user.findMany();
};

export const blockUser = async (id: number) => {
  return prisma.user.update({
    where: { id },
    data: { isActive: false },
  });
};