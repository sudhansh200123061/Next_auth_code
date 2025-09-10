import { NextRequest } from "next/server";
import jwt , {JwtPayload} from "jsonwebtoken";

export const getDataFromToken = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
        return decodedToken.id;
    } catch (error: Error | any) {
        throw new Error(error.message);
    }
}