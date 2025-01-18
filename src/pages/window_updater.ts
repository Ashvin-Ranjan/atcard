export {}

interface ApiPipline {
  ping: () => string;
}

declare global {
  interface Window { 
    api: ApiPipline;
  }
}
