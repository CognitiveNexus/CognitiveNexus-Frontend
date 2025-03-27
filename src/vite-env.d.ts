/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly CNCR_API_HOST: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
