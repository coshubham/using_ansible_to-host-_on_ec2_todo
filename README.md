# What is this project?

* This is a simple To-Do application built using React, Express, MongoDB, GitHub, GitHub Actions, Ansible, Ubuntu, and REST API.

* The main objective of this project is to demonstrate automated deployment using Ansible and CI/CD pipelines. The process works as follows:

* Ansible automatically provisions an EC2 instance on AWS.

* The project files are deployed from the local machine to the cloud (remote machine) without manually logging into the instance.

* Required packages such as Node.js, npm, PM2, and Ansible are installed automatically on the EC2 instance.

* The frontend (React) and backend (Express + MongoDB) are deployed and run seamlessly on the remote machine.

* # All of this is controlled from the local machine using Ansible playbooks, triggered via GitHub Actions. This setup enables deployment to multiple EC2 instances (e.g.,i was launched 11 EC2 at once) without opening a single remote terminal session.

* In short, this project showcases a fully automated, zero-manual-intervention deployment pipeline for a full-stack application — from provisioning the server to running the application with a database in the cloud.

# Tech Stack

* Frontend: React, HTML, CSS, JavaScript
* Backend: Node.js, Express
* Database: MongoDB
* Automation & Deployment: Ansible, GitHub Actions, AWS EC2, PM2
* Operating System: Ubuntu

# Key Features

* ✅ Fully automated server provisioning with Ansible
* ✅ One-command deployment using GitHub Actions
* ✅ Simultaneous deployment to multiple EC2 instances
* ✅ No need to manually log in to any remote server
* ✅ Full-stack application with CRUD operations for tasks
* ✅ REST API-based backend integration
