import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/user/app.jsx',
                'resources/js/admin/app.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],
});
