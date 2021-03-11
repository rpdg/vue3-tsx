import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import TextareaEmojiPicker from '../../components/TextareaEmojiPicker';

export default defineComponent({
	name: 'App',
	setup() {
		const store = useStore();

		const show = ref(false);
		const text = ref('');

		const showPopup = () => {
			text.value = 'inited text';
			show.value = true;
		};

		return () => (
			<>
				<h1>Home</h1>
				<h2>{store.state.title}</h2>

				<div style='border:1px solid gray; width:200px; height:1.5em;' onClick={showPopup}></div>

				<TextareaEmojiPicker
					v-models={[
						[show.value, 'show'],
						[text.value, 'value'],
					]}
				/>
			</>
		);
	},
});
