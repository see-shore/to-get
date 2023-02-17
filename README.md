# to.get

To.get is an application created by team See Shore of the CDM to facilitate group buying on campus and to tackle plastic waste reduction.

## Technical Overview
- Spring Boot server
- React.js client
- MUI components
- AWS RDS MySQL database
- Hosted on AWS EC2

AWS RDS DB Instance:
```
URL: to-get-db-1.cq3uctxl0ape.us-west-2.rds.amazonaws.com
Port: 3306
```

## Server Environment Setup

After cloning the repository, go to the root directory of the project and:
```
cd ./src/main/resources
touch application.yml
```
In the new YAML file, paste:
```
spring:
  datasource:
    username: admin
    password: <PASSWORD>
    url: jdbc:mysql://to-get-db-1.cq3uctxl0ape.us-west-2.rds.amazonaws.com:3306/toget
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```
Ask the project admins for credentials to the AWS RDS database and replace the password placeholder above.

The server runs on port 8080 and API endpoints can be tested on Postman with:
```
http://localhost:8080/
```
