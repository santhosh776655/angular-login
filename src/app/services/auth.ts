import { Injectable } from '@angular/core';

export interface RegisteredUser {
  name: string;
  email: string;
  passwordHash: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly registeredUsersKey = 'registered-users';
  private readonly signedInKey = 'login-dashboard-signed-in';
  private readonly userNameKey = 'login-dashboard-user-name';
  private readonly userEmailKey = 'login-dashboard-user-email';

  // Save a new user's details in sessionStorage.
  async register(details: {
    name: string;
    email: string;
    password: string;
  }): Promise<boolean> {
    const users = this.getRegisteredUsers();
    const email = details.email.trim().toLowerCase();

    const emailExists = users.some(user => user.email === email);

    if (emailExists) {
      return false;
    }

    const newUser: RegisteredUser = {
      name: details.name.trim(),
      email,
      passwordHash: await this.hashPassword(details.password)
    };

    users.push(newUser);

    sessionStorage.setItem(
      this.registeredUsersKey,
      JSON.stringify(users)
    );

    return true;
  }

  // Check the entered email and password against a registered user.
  async login(email: string, password: string): Promise<boolean> {
    const normalizedEmail = email.trim().toLowerCase();
    const user = this.getRegisteredUsers().find(
      registeredUser => registeredUser.email === normalizedEmail
    );

    if (!user) {
      return false;
    }

    const enteredPasswordHash = await this.hashPassword(password);

    if (enteredPasswordHash !== user.passwordHash) {
      return false;
    }

    sessionStorage.setItem(this.signedInKey, 'true');
    sessionStorage.setItem(this.userNameKey, user.name);
    sessionStorage.setItem(this.userEmailKey, user.email);

    return true;
  }

  // Read the list of registered users.
  private getRegisteredUsers(): RegisteredUser[] {
    const storedUsers = sessionStorage.getItem(this.registeredUsersKey);

    if (!storedUsers) {
      return [];
    }

    try {
      const parsedUsers: unknown = JSON.parse(storedUsers);

      if (!Array.isArray(parsedUsers)) {
        return [];
      }

      return parsedUsers.filter((item: unknown): item is RegisteredUser => {
        if (typeof item !== 'object' || item === null) {
          return false;
        }

        const user = item as Record<string, unknown>;

        return typeof user['name'] === 'string'
          && typeof user['email'] === 'string'
          && typeof user['passwordHash'] === 'string';
      });
    } catch {
      return [];
    }
  }

  // Create a SHA-256 hash for this frontend learning example.
  private async hashPassword(password: string): Promise<string> {
    const passwordBytes = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', passwordBytes);

    return Array.from(new Uint8Array(hashBuffer))
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem(this.signedInKey) === 'true';
  }

  getUserName(): string {
    return sessionStorage.getItem(this.userNameKey) ?? '';
  }

  getUserEmail(): string {
    return sessionStorage.getItem(this.userEmailKey) ?? '';
  }

  // Remove only the current login session. Keep registered accounts for later login.
  logout(): void {
    sessionStorage.removeItem(this.signedInKey);
    sessionStorage.removeItem(this.userNameKey);
    sessionStorage.removeItem(this.userEmailKey);
  }
}
