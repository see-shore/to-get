# to.get

To.get is an application created by team See Shore of the CDM to facilitate group buying on campus and to tackle plastic waste reduction.

## Team See Shore

[Project Page @ CDM](https://thecdm.ca/projects/industry-projects/seeshore-sfu-fcat)

**Developers**: James Chung (UBC), Jaddie Tan (SFU)\
**Product Owners**: Xiao Chen (CDM), Javier (Monkey) Fernandez (CDM)\
**Project Manager**: Maia Puyat (CDM)\
**UI/UX Designer**: Oscar Chu (CDM)

## Technical Overview
- Spring Boot server
- React.js client
- MUI components
- AWS RDS MySQL database
- Hosted on AWS EC2

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
    password: <DB_PASSWORD>
    url: jdbc:mysql://toget-db.cq3uctxl0ape.us-west-2.rds.amazonaws.com:3306/toget
    driverClassName: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
      dialect: org.hibernate.dialect.MySQL5Dialect
    generate-ddl: true
    show-sql: true
aws:
  accessKey: <ACCESS_KEY>
  secretKey: <SECRET_KEY>
  s3:
    region: us-west-2
    bucketName: to-get
```
Ask the project admins for credentials to the AWS RDS database and the S3 bucket and replace the password and key placeholders above.

The server runs on port 8080 and API endpoints can be tested on Postman with:
```
http://localhost:8080/
```
