        
import bcrypt from "bcrypt";

async function encryptPassword(){

    const hash = await bcrypt.hash("admin123", 10);
    console.log("hasedPassword")
console.log(hash);

}


encryptPassword();