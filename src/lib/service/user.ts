import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { verifyJwt } from "../auth/jwt";


export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};
export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: { username, email, password: hashedPassword },
    select: {username:true, email:true}
  });
};
export const verifyUser=async(email:string, password:string)=>{
    const user=await prisma.user.findUnique({where:{email}})
    if(!user) return null
    const isValid=await bcrypt.compare(password, user.password)
    if(isValid) return null
    return {username: user.username, email: user.email}
}
export const getUserFromToken=async ()=>{
    const token=await getLoginToken()
    if (!token) return null
    const payload=verifyJwt()
    return {username: user.username, email: user.email}
}