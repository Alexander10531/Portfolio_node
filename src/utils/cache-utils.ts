import { PrismaClient, State } from "@prisma/client";
import logger from "../config/logger";

const NodeCache = require('node-cache');
const prisma = new PrismaClient();
export const cacheState = new NodeCache({ stdTTL: 3600 });

export const initializateCache = async () => {

    let states = await prisma.state.findMany(); 
    cacheState.set("states", states);
    
}