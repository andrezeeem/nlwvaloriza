import { Request, Response, NextFunction }from "express";
import { verify } from "jsonwebtoken";


interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    //take token

    const authToken = request.headers.authorization;

    //token !null

    if(!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
    const { sub } = verify( token, "e3a1c543ed44af9f1e7cea5f31335872") as IPayload;

        request.user_id = sub;
        return next();
        
    }catch(err) {
        return response.status(401).end();
    }
    //token auth && !Error



    //Recover user info

}