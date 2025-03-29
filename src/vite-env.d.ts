/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly COGNEX_API_HOST?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
