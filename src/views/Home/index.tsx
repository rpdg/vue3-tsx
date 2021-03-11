import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import TextareaEmojiPicker from '../../components/TextareaEmojiPicker';

export default defineComponent({
	name: 'App',
	setup() {
		const store = useStore();

		const show = ref(false);
		const text = ref('inited text');

		const showPopup = () => {
			// text.value = ;
			show.value = true;
		};

		return () => (
			<>
				<h1>Home2</h1>
				<h2>{store.state.title}</h2>

				<div style='border:1px solid gray; min-width:200px; font-size:1.5em; line-height:1.5em; margin: 1em; padding:0.2em;' onClick={showPopup}>
					{text.value}
				</div>

				<TextareaEmojiPicker
					v-models={[
						[show.value, 'show'],
						[text.value, 'textareaValue'],
					]}
				/>
			</>
		);
	},
});
