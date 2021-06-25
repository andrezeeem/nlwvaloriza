import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({ email, password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories)
 
       //Email !null
        const user = await usersRepositories.findOne({
            email,
        });

        if(!user) {
            throw new Error("E-mail / Password incorrect");
        }

      //Senha==Senha

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch)
            throw new Error("E-mail / Password incorrect");
        
        
        //Token Gen

        const token = sign({
            email: user.email,
        }, "e3a1c543ed44af9f1e7cea5f31335872", {
            subject : user.id,
            expiresIn: "1d",
        });

        return token;
    }
}

export { AuthenticateUserService };