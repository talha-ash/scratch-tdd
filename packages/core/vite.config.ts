import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        dts({
            tsconfigPath: './tsconfig.json',
            exclude: ['**/*.test.*', '**/*.stories.*', '**/__test__/*'],
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'main',
            // the proper extensions will be added
            fileName: 'main',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['react', 'zustand', 'valibot', 'axios', '@tanstack/react-query'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: 'React',
                    zustand: 'Zustand',
                    valibot: 'Valibot',
                    axios: 'Axios',
                    '@tanstack/react-query': 'ReactQuery',
                },
            },
        },
        // Generate sourcemaps
        sourcemap: true,
        // Clean output directory
        emptyOutDir: true,
    },
    // resolve: {
    //     alias: {
    //         '~contexts': resolve(__dirname, 'src/contexts'),
    //         '~shared': resolve(__dirname, 'src/shared'),
    //     },
    // },
});
