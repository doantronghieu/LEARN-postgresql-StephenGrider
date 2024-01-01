# Instructions

npm init -y
npm i node-pg-migrate pg express

package.json

``` json
"scripts": {
  "migrate": "node-pg-migrate"
}
```

npm run migrate create table comments
<!-- DATABASE_URL=postgres://USERNAME:PASSWORD@localhost:5432/DBNAME npm run migrate up -->
<!-- DATABASE_URL=postgres://USERNAME:PASSWORD@localhost:5432/DBNAME npm run migrate down -->
DATABASE_URL=postgres://postgres:123456@localhost:5432/socialnetwork npm run migrate up

npm run migrate create rename contents to body
DATABASE_URL=postgres://postgres:123456@localhost:5432/socialnetwork npm run migrate up

npm run migrate create add posts table
DATABASE_URL=postgres://postgres:123456@localhost:5432/socialnetwork npm run migrate up

node index.js

npm run migrate create add loc to posts
DATABASE_URL=postgres://postgres:123456@localhost:5432/socialnetwork npm run migrate up

node migrations/data/01-lng-lat-to-loc.js

npm run migrate create drop lng and lat from posts
DATABASE_URL=postgres://postgres:123456@localhost:5432/socialnetwork npm run migrate up
