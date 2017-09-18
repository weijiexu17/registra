## Registration Services

This is REST API developed using NodeJS and express component, currently it supports 2 API calls:
    Add patient using post: /v1/patients
	To retrieve insurance eligibility using post: /v1/elig
	


## Run Service
### `npm install`

In the project directory, you can run:

### `node server.js`

Open [http://localhost:8081](http://localhost:8081) in postman or any rest client tool to access data.


Note:
During development, I encountered a couple issues: 
1. Certificate validation issue for calling external REST api
2. CORS issue on ReactJS UI, which is the main reason I put eligibility checking into services.