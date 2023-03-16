projectPulse

Description:-

projectPulse is a project tracking tool for organizations where any organization can track of their projects. This project is in initial stage only backend is developed using nodejs

How to Install the project

Download the git repository manually or clone it by following command

git clone https://github.com/MAHESH-GCET/Project-Pulse.git

If you download manually extract the zip file.

then run the following command to install all the modules that are used in this project

npm install

then start the server using below command

npm start

Configurations

create .env folder and add the following details to the .env file

DB\_NAME = YOUR\_DB\_NAME (Add your details)

DB\_USER = YOUR\_DB\_USER

DB\_PASSWORD = YOUR\_DB\_PASSWORD

PORT = PORT

SECRET\_KEY = jdhfskjdfl

EMAIL\_PASSWORD = EMAIL\_PASSWORD (App Password)

EMAIL\_SERVICE\_PROVIDER = EMAIL\_SERVICE\_PASSWORD

EMAIL = YOUR\_EMAIL

Create database named projectPulse

We assume that employee table is existing in a database so create table employee(attributes:{empId,empName}) and insert data into table

Overview

Roles in this project:-

1. SuperAdmin
1. Admin
1. GDO (Global Delivery Organization)
1. Project Manager
1. HR Manager

Tasks of the roles

superAdmin

1. Get all the users.
1. Assign the roles to the Employees.

Admin

1. Get all the projects in an organization
1. Get specific project details (Detailed overview,project concerns, project updates team Composition)
1. Create a project
1. Get the resourcing requests
1. Update the existing project
1. Delete existing project(soft delete)

GDO (Global Delivery Organization)

1. Get all projects under his maintanance
1. Get specific project details (Detailed overview,project concerns, project updates team Composition)
1. Assigning projects to employees(Creating a team)
1. Update employees in the project
1. Delete Employees from the project
1. Raising Resource requests

Project Manager

1. Adding project updates
1. Raise project concerns
1. Get all the projects under his maintanance
1. Get specific project details (Detailed overview,project concerns, project updates team Composition)
