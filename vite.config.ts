import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

export default defineConfig({
    plugins: [
        tailwindcss(),
        TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
        react(),
        tsconfigPaths(),
    ],
    test: {
        include: ['src/**/*.test.ts'],
        exclude: ['**/*.int.test.ts']        
    },
});
