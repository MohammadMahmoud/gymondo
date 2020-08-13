# A Coding Challenge for Gymondo

Bulit with Express and React in Typescript using MongoDB as database

## Author

Mohammed Mahmoud

#### Including :

- Express.js
- React.js
- MongoDB
- Jest
- SwaggerUI

## Quick Start

**Quick Note : Please Check .env file for more settings**
**Quick Note : if you want see the logging for every request (Recommended) please set LOGGING=production in .env file and restart the server**

### Use same node version

```shell
nvm use
```

### Install node modules

```shell
yarn install
```

### Run MongoDB in docker (please install docker if you don't have)

```shell
yarn mongodb:start
```

### Run Migration

```shell
yarn migrate
```

### Run development

```shell
yarn dev
```

### To build production (you will find it in dist path)

```shell
yarn client:build
yarn server:build
```

### To run tests

#### Watch Test

```shell
yarn test
```

#### Test Coverage

```shell
yarn test:coverage
```

## Consuming The API

## in Dev

[API Documention](http://localhost:3001/api)

## in Docker

[API Documention](http://localhost:5000/api)
