# Developper Documentation

View the book with "<i class="fa fa-book fa-fw"></i> Book Mode".

Summary
---
- [Installations](#Installations)
- [Run Project](#Run-Project)
- [API](#API)

Installations
---
Dependencies installation guide to develop the project correctly.

### Install dependencies
#### Install SASS
```bash
brew install sass/sass/sass
```

#### Install TypeScript
```bash
sudo npm install -g typescript
```

#### Install TypeScript Watcher
```bash
sudo npm install ts-watch
```

#### Run SASS
```bash
sass --watch src/main/resources/static/css
```

#### Run TypeScript
```bash
npx ts-watch src/main/resources/static/js/*.script.ts --outDir src/main/resources/static/js/
```

Run Project
---
Find out how to start correctly the project.

#### Which file to start?
Start, open the project folder with IntelliJ IDEA. Right click on `PorareApplication.java` in `src/main/java/com/codingfactory/porare` and select `Run PorareApplication`.

API
---
The API documentation

### User
#### Informations :
Get all users list

URL : `http://localhost:8080/api/users`

Method : `GET`

Multipart Form : `false`

### Login/Register
#### Register
#### Informations :
Register a new user

URL : `http://localhost:8080/api/register`

Method : `POST`

Multipart Form : `true`

#### Required Multipart Form
- `username` : `String`
- `email` : `String`
- `password` : `String`
- `confirmPassword` : `String`

#### Returned JSON
Return a token if the user is registered correctly. Otherwise, return false (`String`).
- `token` : `String`

#### Get User Information
#### Informations :
Register a new user

URL : `http://localhost:8080/api/getUserInformations`

Method : `POST`

Multipart Form : `true`

#### Required Multipart Form
- `token` : `String`

#### Returned JSON
Return user information if token is valid. Otherwise, return null.
- `userId` : `String`
- `username` : `String`
- `email` : `String`