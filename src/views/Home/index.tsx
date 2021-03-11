import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import TextareaEmojiPicker from '../../components/TextareaEmojiPicker';

export default defineComponent({
	name: 'App',
	setup() {
		const store = useStore();

		const showRef = ref(false);
		let text = 'some text here';
		const textRef = ref(text);
		const resultTextRef = ref(text);

		const showPopup = () => {
			// text.value = ;
			showRef.value = true;
		};

		return () => (
			<>
				<h1>Home2</h1>
				<h2>{store.state.title}</h2>

				<div
					style='word-break: break-all;border:1px solid gray; min-width:200px; font-size:1.5em; line-height:1.5em; margin: 1em; padding:0.2em;'
					onClick={showPopup}
				>
					{resultTextRef.value}
				</div>

				<TextareaEmojiPicker
					// @ts-ignore
					onCommit={(val: string) => {
						resultTextRef.value = val;
					}}
					textLimit={50}
					textRows={2}
					v-models={[
						[showRef.value, 'show'],
						[textRef.value, 'textValue'],
					]}
				/>
			</>
		);
	},
});
