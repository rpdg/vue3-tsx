import { defineComponent, ref } from 'vue';
import styles from './index.module.scss';

export default defineComponent({
	name: 'HelloWorld',
	props: {
		msg: {
			type: String,
			required: true
		},
	},
	setup(prop) {
		const count = ref(0);


		return () => (
			<>
				<h3>msg: {prop.msg}</h3>
				<button
					onClick={() => {
						count.value++;
					}}
				>
					count is: {count.value}
				</button>
				<p class={styles.code}>
					Edit <code>components/HelloWorld.tsx</code> to test hot module replacement.
				</p>
			</>
		);
	},
});
