# Angular Login, Registration and Dashboard

A beginner-friendly Angular standalone-components project. It demonstrates Reactive Forms, a shared authentication service, Angular routing, a route guard and browser sessionStorage.

## Requirements

- Node.js 24.15.0 or later in the Node 24 line (or another version supported by the Angular CLI)
- npm
- VS Code or another editor

## Run the project

1. Extract this ZIP file.
2. Open the extracted `angular-login-register-dashboard` folder in VS Code.
3. Open the terminal in this folder (the folder that contains `package.json`).
4. Install the dependencies:

   ```bash
   npm install
   ```

5. Start Angular:

   ```bash
   npm start
   ```

6. Open `http://localhost:4200`.

## Application flow

1. The Login page is displayed first.
2. A new user selects **Register here**.
3. The user enters a name, email and password.
4. After successful registration, the app returns to Login and displays a success message.
5. The user signs in with the same email and password.
6. The Dashboard displays the registered user's name and email.
7. Logout clears the current login session but keeps the registered user available in the current browser tab session.

## Where the data is stored

Open Chrome Developer Tools (`F12`) → **Application** → **Session Storage** → `http://localhost:4200`.

The project uses these keys:

- `registered-users`: registered names, email addresses and SHA-256 password hashes.
- `login-dashboard-signed-in`: current login status.
- `login-dashboard-user-name`: current user's name.
- `login-dashboard-user-email`: current user's email.

Session Storage is scoped to the browser tab's session. It survives refreshes, but registered accounts are cleared when that tab session ends. Use the same tab when testing registration and login.

## Important security note

This is a frontend learning demo only. The SHA-256 hash in the browser is not production-grade password storage, and users can inspect or change browser storage. A real application must send registration and login requests to a backend such as Spring Boot, store password hashes on the server using a password-hashing algorithm such as BCrypt or Argon2, and enforce authorization on the server. An Angular route guard only controls frontend navigation; it does not secure backend APIs.

## GitHub / Eclipse

The `.gitignore` excludes `node_modules`, Angular build output and local environment files. After testing, import this project folder into Eclipse and use EGit to create a repository, commit the source files, add your GitHub repository as the remote and push the `main` branch. Do not commit `node_modules`.
