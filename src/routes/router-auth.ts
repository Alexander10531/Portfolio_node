import { Router, Request, Response } from "express";

const routerAuth : Router = Router(); 

routerAuth.get('/profile', (req : Request, res : Response) => {
    console.log("Se esta entrando al perfil"); 
    res.send(JSON.stringify(req.oidc.user));
});

routerAuth.get("/login", (req, res) => {
    console.log("Se esta entrando al login");
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
}); 


export default routerAuth;