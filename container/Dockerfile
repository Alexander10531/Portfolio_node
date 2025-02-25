FROM node

COPY . .

RUN echo DATABASE_URL="postgresql://postgres:mysecretpassword@postgresql-database:5432/postgres" > .env

RUN npm install

EXPOSE 3001

CMD ["node", "dist/index.js"]