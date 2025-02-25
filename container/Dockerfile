FROM node

COPY . .

RUN echo DATABASE_URL="postgresql://postgres:mysecretpassword@postgresql-database:5432/postgres" > .env

RUN npm install && npx prisma generate && npm run build

EXPOSE 3001

RUN echo 1

CMD ["node", "dist/index.js"]