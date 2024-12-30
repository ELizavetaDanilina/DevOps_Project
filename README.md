# DevOps Final Project

## Introduction

This document outlines a comprehensive project encompassing the creation of a simple web application with CRUD functionality, its deployment using CI/CD, infrastructure-as-code provisioning, Dockerization, container orchestration with Docker Compose and Kubernetes, service mesh implementation with Istio, and finally, monitoring with Prometheus and Grafana. The project aims to demonstrate a complete DevOps workflow, from development and testing to deployment, orchestration, and monitoring of a containerized application. 


## Project description

This part will be describing the key principles of each step of the project and how to reproduce it.

### Web application

The web application was created on NodeJS language with Redis database. Web application consist several tests of different levels.

**Key features of the application:**
- Create user
- Get all users, get one user by username
- Update user
- Delete user
- Unit, API, configuration and connection tests.
- Health check endpoint (/health, /liveness, /readiness)
- Swagger UI

**Steps to start an application**:
1. Download project files
2. Install Redis database
> - Windows: https://redis.com/ebook/appendix-a/a-3-installing-on-windows/a-3-2-installing-redis-on-window/
> - MacOS: brew install redis or https://redis.io/topics/quickstart
> - Linux or MacOS: https://redis.io/topics/quickstart
3. Install the following software on your computer:
- [Node.js](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
4. Install an IDE or a text editor, for example [VS Code](https://code.visualstudio.com/)
5. Using CLI bash commands in your terminal (Terminal or Git Bash) navigate to the directory where you will store your project folder.
  
  `cd ~/path/to/your-root-project-directory`
  
6. Navigate to the 'userapi' folder
  
  `cd userapi`
  
7. Download project dependencies
  
  `npm install`
  
8. Run NPM script to test application

  `npm test`
  
9. Run NPM script to run the application

   `npm start`

   After that the application will be availabe by this link: [http://localhost:3000](http://localhost:3000)





4. Apply CI/CD pipeline
Configure and apply CI/CD (including deployment) pipeline using any platforms (GitHub Actions, GitLab CI/CD, Jenkins, Netlify, Heroku, etc.).

Note! If the chosen deployment platform (like Heroku) requires a subscription to make use of their database service to connect to your app, you can skip using this service. In this case, your application won't be running properly, but it must successfully display the homepage.

3. Configure and provision a virtual environment and run your application using the IaC approach
Configure with Vagrant: 1 VM running on any Linux distribution
Provision the VM with Ansible, which includes installing and running:
language runtime
database
your application (use sync folders)
health check of your application
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
5. Build Docker image of your application
Create a Docker image of your application
Push the image to Docker Hub
Note! You must ignore all the files and folders that do not need to be included in the image.

6. Make container orchestration using Docker Compose
Create docker-compose.yml file that will start your application

- [Docker](https://docs.docker.com/get-docker/)
7. Make docker orchestration using Kubernetes
Install Kubernetes cluster using Minikube
Create Kubernetes Manifest YAML files:
deployments
services
persistent volume and persistent volume claim
8. Make a service mesh using Istio
Deploy your application using Istio
Create configuration:
route requests between 2 different versions of your app
traffic shifting between 2 different versions of your app
9. Implement Monitoring to your containerized application
Install Prometheus and Grafana to your K8s cluster

Set up monitoring with Prometheus:

Prometheus should contact the application (eg. health check endpoint) and pull its status
You should be able to see the status of the application on Prometheus
Set up monitoring with Grafana:
Link it to the Prometheus server and display the monitored applications
Create alerts and trigger them by shutting down your applications.
Note. You can imagine something different and set up monitoring (eg. memory usage, CPU time, ...)
