const jwt = require("jsonwebtoken");
const express = require("express");

module.exports = {
    async verifyToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split('Bearer ')[1];

        if(token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            req.id = decoded.id;
            
            next();
        })
    }
}