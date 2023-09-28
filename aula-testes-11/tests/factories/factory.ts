import prisma from "database";
import { UserInput } from "repository"

export function createUserFactory(email: string, password: string): UserInput{
    const userData: UserInput = {
        email,
        password
      }
    return userData;
}

export async function postUser(userData: UserInput){
    return await prisma.user.create({
        data: userData
      });
}

export async function postManyUsers(userData: UserInput, email: string) {
    return await prisma.user.createMany({
        data: [{
          ...userData
        }, {
          ...userData, email
        }]
      });
    
}