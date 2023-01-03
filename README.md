config

```shell
cd backend
```
```shell
npm install
```
create a .env file
```shell
touch .env
```

and fill those variables.
for the MONGO_URI variable you need to inspect with docker the mongo container and get his ipAdress 
```dotenv
#server port
PORT=
# database in this case i use mongodb with typeorm
MONGO_URI=
DB_NAME=
DB_NAME_TEST=
# test when you launch test whatever other case
NODE_ENV=
#pass phrase jwt sign opt
PRIVATE_KEY_PASS_PHRASE=
```

to start docker
- install docker if not installed on your machine
```shell
cd backend
```
```shell
docker build -t backend .
```
```shell
docker compose up
```
