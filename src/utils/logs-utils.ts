import { PrismaClient } from "@prisma/client";
import logger from "../config/logger"
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient(); 

export const saveLogs = (req : Request, res : Response, next : NextFunction) => {

    logger.info("Saving information in logs"); 

}