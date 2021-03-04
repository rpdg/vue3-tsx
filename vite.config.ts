// import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import { defineConfig } from 'vite';

const pathResolve = (pathStr: string) => {
	return path.resolve(__dirname, pathStr);
};

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		// legacy({
		// 	targets: ['defaults', 'not IE 11'],
		// }),
	],
	resolve: {
		alias: {
			'@': pathResolve('./src'),
		},
	},
	build: {
		target: 'es6',
	},
});
