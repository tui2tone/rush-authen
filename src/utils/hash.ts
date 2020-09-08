import * as crypto from "crypto";
import { Config } from "@config/index";

export const sha256 = (text, secret) => {
    return crypto.createHmac('sha256', secret)
        .update(text)
        .digest('hex');
}

export const sha1 = (text, salt) => {
    const encrypted = crypto.createHash('sha1')
    const insertText = `=${salt}${text}${salt}=`
    encrypted.update(insertText)
    return encrypted.digest('hex')
}

export const generateToken = (data = {}) => {
    data["timestamp"] = Date.now()
    const stringify = JSON.stringify(data)

    return sha256(stringify, Config.TOKEN_SECRET)
}

export const Hash = {
    sha1,
    sha256,
    generateToken
}