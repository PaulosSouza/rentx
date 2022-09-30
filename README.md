<h1 align="center">
  Rentx
</h1>

<p align="center">
  <a href="https://www.linkedin.com/in/paulo-henrique-89b148166/"><img alt="Made by" src="https://img.shields.io/badge/made%20by-Paulo%20Henrique-blue"></a>
  <img alt="GitHub" src="https://img.shields.io/github/license/PaulosSouza/rentx?color=%23DC1637">
  <img alt="Github Actions" src="https://github.com/PaulosSouza/rentx/actions/workflows/main.yml/badge.svg">
</p>

<p align="center">
  <a href="#-technologies">Technologies</a> •
  <a href="#-getting-started">Getting started</a> •
  <a href="#-license">License</a>
</p>

## 🚀 Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Multer](https://github.com/expressjs/multer)
- [TypeORM](https://typeorm.io/#/)
- [JSON Web Token](https://jwt.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://github.com/visionmedia/supertest)
- [Sentry](https://sentry.io)

## 💻 Getting started

Import the `Insomnia.json` on Insomnia App

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

**Clone the project and access the folder**

```bash
git clone https://github.com/PaulosSouza/rentx.git && cd rentx
```

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables.
# The aws variables do not need to be filled for dev environment
$ cp .env.example .env

# Start all the services and the application with Docker Compose
$ docker-compose up -d

# Once the services are running, run the migrations
$ yarn migration:run

# Run the seeds
$ yarn seed:run

# To finish, run the api service
$ yarn dev

# Well done, project is started!
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made by <a href="https://www.linkedin.com/in/paulo-henrique-89b148166/">Paulo Henrique</a> 🎸
</p>
