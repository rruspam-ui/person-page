import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

import { localePagesPlugin } from './build/locale-pages-plugin.ts';

/** Конфигурация Vite и Vitest */
export default defineConfig({
    base: './',
    plugins: [react(), localePagesPlugin()],
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
        css: { modules: { classNameStrategy: 'non-scoped' } },
    },
});
