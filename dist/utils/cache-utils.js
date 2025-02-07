"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializateCache = exports.cacheState = void 0;
const client_1 = require("@prisma/client");
const NodeCache = require('node-cache');
const prisma = new client_1.PrismaClient();
exports.cacheState = new NodeCache({ stdTTL: 3600 });
const initializateCache = () => {
    let states = prisma.state.findMany();
    exports.cacheState.set("states", states);
};
exports.initializateCache = initializateCache;
