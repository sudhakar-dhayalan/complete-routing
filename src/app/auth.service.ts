export class AuthService {
    authenticated = false;

    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(
                    () => {
                        resolve(this.authenticator())
                } , 400);
            }
        );
        return promise;
    }

    login() {
        this.authenticated = true;
    }

    logout() {
        this.authenticated = false;
    }

    authenticator() {
        return this.authenticated;
    }
}