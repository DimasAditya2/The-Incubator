# Link docs sequelize
- getting started: https://sequelize.org/docs/v6/getting-started/
- migration: https://sequelize.org/docs/v6/other-topics/migrations/
- data types: https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types

1. install
- npm install --save sequelize
- npm install --save pg 

- shorthand
- npm i sequelize pg express ejs

2. install dev
- npm install --save-dev sequelize-cli

3. Init project:
`npx sequelize-cli init` or `npx sequelize init`

4. Setup config/config.json (username, password, database(ini nama database), dialect (postgres))

5. Buat model:
   -  npx sequelize-cli model:generate --name Employees --attributes name:string,position:string,education:string,email:string,phone_number:string,profile_picture:string

   -  npx sequelize-cli model:create --name Category --attributes name:string

6. `npx sequelize-cli db:create`

7. `npx sequelize-cli db:migrate`

8. Lanjut seed: `npx sequelize-cli seed:generate --name demo-user`

15. `npx sequelize-cli db:seed:all`


16. npx sequelize migration:create --name <name file>


required: true = untuk inner join

hook tambahin di model
validation juga dimodel khusu yang allownull diluar validate


<!-- yang punya foreignkey dia belongsTo -->