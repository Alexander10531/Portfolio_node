"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routerAuth = (0, express_1.Router)();
routerAuth.get('/profile', (req, res) => {
    console.log("Se esta entrando al perfil");
    res.send(JSON.stringify(req.oidc.user));
});
routerAuth.get("/login", (req, res) => {
    console.log("Se esta entrando al login");
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
exports.default = routerAuth;
