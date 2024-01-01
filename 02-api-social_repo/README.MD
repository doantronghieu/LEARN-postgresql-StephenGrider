# Instructions

npm init -y
npm i dedent express jest node-pg-migrate nodemon pg pg-format supertest

npm run migrate create add users table
DATABASE_URL=postgres://postgres:123456@localhost:5432/socialnetwork npm run migrate up

npm run start

DATABASE_URL=postgres://postgres:123456@localhost:5432/socialnetwork-test npm run migrate up

npm run test
