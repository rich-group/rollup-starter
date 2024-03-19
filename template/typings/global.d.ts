declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'sit' | 'pre' | 'prd';
  }
}