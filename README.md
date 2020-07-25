
  

# EmBrace API

  

## Usage with Docker

Requirements:

- [Docker](https://www.docker.com/)
- [Docker compose](https://docs.docker.com/compose/)

To use boilerplate with docker you need to clone project  

With SSH:
```
$ git clone git clone git@rng-soft.com:dusan.mladenovic/examples.git
$ cd examples
$ git checkout express-mongo
$ .env.example .env
$ npm install
```

With HTTP:
```
$ git clone https://rng-soft.com/vc/dusan.mladenovic/examples.git
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
$ docker build -t rng-soft.com:4567/dusan.mladenovic/examples .
```
To run container with that image *(default: EXPOSED_PORT 5000)*:
```
$ docker images
$ docker run -t <some-tag> -p <LOCAL_PORT>:<EXPOSED_PORT> <IMAGE ID>
```
To deploy image to registry:
```
$ docker login rng-soft.com:4567
$ docker push rng-soft.com:4567/dusan.mladenovic/examples
```
For examples how to use tags visit this [link](https://rng-soft.com/vc/dusan.mladenovic/examples/container_registry).  

To test if everything is working you can test this routes:
	- [GET] - http://localhost:8081/
	- [GET] - http://localhost:8081/initals
	- [POST] - http://localhost:8081/initals

 *You can change message on first route in src/api/controllers/inital.js. :)*

## Installation

To install project run following commands:
 
With SSH:
```
$ git clone git clone git@rng-soft.com:dusan.mladenovic/examples.git
$ git checkout express-mongo
```
With HTTP:
```
$ git clone https://rng-soft.com/vc/dusan.mladenovic/examples.git
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
```
Checkout https://rng-soft.com/vc/dusan.mladenovic/guidelines#pre-commit-tool-javascript-standard-style if you are going to use [Pre-Commit tool](https://www.npmjs.com/package/pre-commit) & [JavaScript Standard Style](https://standardjs.com/) **(which we recommend)**.

I you are not going to use these tools, remove next lines from **package.json**:
```
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
