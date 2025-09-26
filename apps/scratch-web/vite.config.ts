import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ command }) => ({
    plugins: [
        tailwindcss(),
        TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
        react(),
        tsconfigPaths(),
        dts({
            tsconfigPath: './tsconfig.build.json',
            exclude: ['**/*.test.*', '**/*.stories.*', '**/__test__/**/*'],
        }),
    ],
    // test: {
    //   globals: true,
    //   environment: 'jsdom',
    // },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            ...(command === 'serve'
                ? { core: resolve(__dirname, '../../packages/core/src/main.ts') }
                : {}),
            ...(command === 'serve'
                ? { '~core': resolve(__dirname, '../../packages/core/src') }
                : {}),
        },
    },
    test: {
        include: ['src/**/*.test.ts'],
        exclude: ['**/*.int.test.ts'],
    },
}));
