module.exports={
    secret: process.env.USER_SECRET || "trololo",
    expires: process.env.USER_EXPIRESS || "24h",
    rounds: process.env.USER_ROUNDS ||10
}