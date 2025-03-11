import { PrismaClient } from "@prisma/client";
import logger from "../config/logger"

const prisma = new PrismaClient(); 

export const saveLogs = () => {

    logger.info("Saving information in logs"); 

}