﻿import { Button } from 'vant';
import { defineComponent, PropType, ref } from 'vue';
import styles from './index.module.scss';

type Fn = () => void;

export default defineComponent({
	name: 'HelloWorld',
	props: {
		msg: {
			type: String,
			required: true,
		},
		onOk: {
			type: Function as PropType<Fn>,
			required: true,
		},
	},
	setup(prop) {
		const count = ref(0);

		return () => (
			<>
				<h3>msg: {prop.msg}</h3>
				<Button
					type='primary'
					// @ts-ignore
					onClick={() => {
						count.value++;
					}}
				>
					count is: {count.value}
				</Button>
				<p class={styles.code}>
					Edit <code>components/HelloWorld.tsx</code> to test hot module replacement.
				</p>
			</>
		);
	},
});
