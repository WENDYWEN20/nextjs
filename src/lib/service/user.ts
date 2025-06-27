import bcrypt from "bcrypt";
import { verifyJwt } from "../auth/jwt";
import { getLoginToken } from "../auth/session";
import { prisma } from "../prisma";


export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};
export const createUser = async (
  username: string,
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
    console.log("IN VERIFY USER: ", user);
    
    if(!user) return null
    const isValid=await bcrypt.compare(password, user.password)
    if(isValid) return null
    return {username: user.username, email: user.email}
}
export const getUserFromToken=async ()=>{
    const token=await getLoginToken()
    if (!token) return null
    const payload=verifyJwt(token) as {email: string}|| null
    if(!payload) return null
    const user=await prisma.user.findUnique(
      {where:{email: payload.email},
      select:{username:true, email: true}
    })
    return {username: user.username, email: user.email}
}