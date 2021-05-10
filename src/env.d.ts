declare namespace NodeJS {
  export interface ProcessEnv {
    DB_NAME: string;
    DB_USER: string;
    DB_PSW: string;
    CORS_ORIGIN: string;
  }
}
