/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly COGNEX_API_HOST?: string;
  readonly COGNEX_FOOTER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
