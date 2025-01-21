import { PrismaClient, State } from "@prisma/client";

const NodeCache = require('node-cache');
const prisma = new PrismaClient();
export const cacheState = new NodeCache({ stdTTL: 3600 });

export const initializateCache = () => {

    let states : Promise<State[]> = prisma.state.findMany(); 
    cacheState.set("states", states);
    
}
