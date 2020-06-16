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