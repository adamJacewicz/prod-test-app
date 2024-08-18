/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: string;
  readonly APP_VERSION: string;
  readonly VITE_AWS_MONITORING_API: string;
  readonly VITE_AWS_ERROR_TRACKING_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __APP_VERSION__: string;
