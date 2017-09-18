## Registration Services

This is REST API developed using NodeJS and express component, currently it supports 2 API calls:<br>
	Add patient using post: /v1/patients
	To retrieve insurance eligibility using post: /v1/elig
	


## Run Service
### `npm install`

In the project directory, you can run:

### `node server.js`

Open [http://localhost:8081](http://localhost:8081) in postman or any rest client tool to access data.

## Further development
Currently backend is using file system to save patient info. Further development should use db as backend.


##Note:
During development, I encountered a few issues: 
1. Certificate validation issue for calling external REST api
2. CORS issue on ReactJS UI, which is the main reason I put eligibility checking into services.
3. Payload truncated when using NodeJS https to retrieve patient eligibility.
