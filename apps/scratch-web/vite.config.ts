import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'path';

export default defineConfig({
    plugins: [
        tailwindcss(),
        TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
        react(),
        tsconfigPaths(),
    ],
    test: {
        include: ['src/**/*.test.ts'],
        exclude: ['**/*.int.test.ts'],
    },

    //using optimize deps core cause error in cypress due to new instance of deps like react. So
    // app have different instance and core have different cause issue
    // optimizeDeps: {
    //     exclude: ['core'],
    // },

    // it forces Vite to hot reload whenever the build artifact changes.
    resolve: {
        alias: {
            core: path.resolve(__dirname, '../../packages/core/main.ts'),
        },
    },
});
