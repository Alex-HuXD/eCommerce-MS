// this is for local dev only, never use this as documentation for prod env

// shared secrets inside kubernetes

const jwtSecret = 'kubectl create secret generic jwt-secret --from-literal=JWT_KEY=secret'
