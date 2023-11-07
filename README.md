# News Aggregator App

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn run start-watch`

This is only used by Docker Compose for hot reload

## Run within a Docker container

This application can be containerized using Docker.\
To run the project within a Docker container, follow these steps:

- Install Docker on your local machine if don't have it already, and be sure it's running.
- Clone this repository into any directory of your choice on your local machine with this command: `git clone https://github.com/CHUKWUKA-EMI/news-aggregator.git`.
- In the root directory of this project, build your docker image by running this command: `docker build -t news-aggregator .`
- After the build has succeeded, run the following command to start the application within a docker container using docker compose: `docker-compose up`
- If everything goes well, you should be able to access the application at `http://localhost:3000` or on any Port you expose in the Dockerfile.
