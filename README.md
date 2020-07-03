# audity
![CI](https://github.com/rgabisch/headless-cms/workflows/CI/badge.svg)
## Description
Audity is a headless-cms, which is specialized on the integration of audio files. It transcribes audio files and can be used for search engine optimization. 
## Quick Start
### Set up the Application
```shell script
git clone https://github.com/rgabisch/headless-cms.git
cd headless-cms
npm run install
```

### Add an .env-File

An .env file must be added to the backend directory:

```
.
|--backend
|----.env     <-- insert here
|--frontend
```

This file contains credential information for external services. 

If you do not want to store your own credentials for the individual services, an .env file can be found in the ticket [HCMS-63](https://headless-cms.atlassian.net/browse/HCMS-63).

### Run the Application
The application is divided into frontend and backend and they are each started in a separate shell session.

#### Frontend
```shell script
npm run start:frontend
```

#### Backend
The backend can be started in different modes. In instance a decision can be made between the production and development mode

```shell script
npm run start:backend:dev
# npm run start:backend:prod
```
