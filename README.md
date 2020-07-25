
  

# Express-Mongo boilerplate

  

## Usage with Docker

Requirements:

- [Docker](https://www.docker.com/)
- [Docker compose](https://docs.docker.com/compose/)

To use boilerplate with docker you need to clone project  

With SSH:
```
$ git clone git@github.com:Em-Brace/api.git
$ cd examples
$ git checkout express-mongo
$ .env.example .env
$ npm install
```

With HTTP:
```
$ git clone https://github.com/Em-Brace/api.git
$ cd examples
$ git checkout express-mongo
$ .env.example .env
$ npm install
```
Quick start-up (flag -d is for detached mode):
```
$ cd <project-path>
$ docker-compose up -d
```

To build your own image and deploy it to your own registry run: 
```
$ cd <project-path>
$ docker build -t https://github.com/Em-Brace/api.git .
```
To run container with that image *(default: EXPOSED_PORT 5000)*:
```
$ docker images
$ docker run -t <some-tag> -p <LOCAL_PORT>:<EXPOSED_PORT> <IMAGE ID>
```
To deploy image to registry:
```
$ docker login xxxx
$ docker push xxxx
```
For examples how to use tags visit this [link](https://rng-soft.com/vc/dusan.mladenovic/examples/container_registry).  

To test if everything is working you can test this routes:
	- [GET] - http://localhost:5000/test

 *You can change message on first route in src/api/controllers/inital.js. :)*

## Installation

To install project run following commands:
 
With SSH:
```
$ git clone git clone git@github.com:Em-Brace/api.git
$ git checkout express-mongo
```
With HTTP:
```
$ git clone https://github.com/Em-Brace/api.git
$ git checkout express-mongo
```
Then:
```
$ cd examples
$ git checkout express-mongo
$ cp .env.example .env
$ npm install
```
In .env file set environment variables (default are set in .env.example)
```
$ nano .env

...
"code-quality-check": "npx standard",

"fix": "npx standard --fix",
"pre-commit": {
	"run": [
		"code-quality-check"
	],
	"silent": false
},
...
```
Run project with:
```
$ npm run dev
```
or
```
$ npm run prod
```
To run code quality check run:
```
$ npm run code-quality-check
```
To fix code quality errors run:
```
$ npm run fix
```
