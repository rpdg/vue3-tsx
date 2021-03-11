import { Popup } from 'vant';
import { defineComponent, onMounted, ref, watch } from 'vue';
import emojis from './emojis';
import styles from './index.module.scss';

export default defineComponent({
	props: {
		value: String,
		show: Boolean,
	},
	setup(props, { emit, attrs, slots }) {
		let refTextarea = ref<HTMLTextAreaElement>();

		const showPopup = ref(false);
		const showDuration = ref(0.3);
		const showEmoji = ref(false);

		onMounted(() => {
			let textarea = refTextarea.value as HTMLTextAreaElement;
			console.log(textarea);
			textarea.addEventListener('focus', () => {
				showEmoji.value = false;
			});
		});

		watch(
			() => props.show,
			(value, prevValue) => {
				// alert(value);
				showPopup.value = value;
			}
		);

		function handleInput(e: InputEvent) {
			console.log(e);
			emit('update:value', (e.target as HTMLTextAreaElement).value);
		}

		function handleOpened() {
			showDuration.value = 0;
			// console.log(refTextarea.value);
			(refTextarea.value as HTMLTextAreaElement).focus();
		}

		function handleWillClose() {
			showDuration.value = 0.3;
		}

		function handleClose() {
			showEmoji.value = false;
			emit('update:show', false);
		}

		function renderEmojis(emojiCategoryName: keyof typeof emojis): JSX.Element[] {
			let spans: JSX.Element[] = [];
			Object.keys(emojis[emojiCategoryName]).forEach((emojiName) => {
				// @ts-ignore
				let emoji: string = emojis[emojiCategoryName][emojiName];
				spans.push(
					<span
						onClick={() => {
							addEmoji(emoji);
						}}
					>
						{emoji}
					</span>
				);
			});
			return spans;
		}

		function displayEmojis(evt: MouseEvent) {
			evt.stopImmediatePropagation();
			// console.log(evt);
			showEmoji.value = true;
		}

		function addEmoji(emoji: string) {
			// debugger;
			const textarea = refTextarea.value as HTMLTextAreaElement;
			// const cursorPosition = textarea.selectionEnd;
			const start = textarea.value.substring(0, textarea.selectionStart);
			const end = textarea.value.substring(textarea.selectionStart);
			textarea.value = start + emoji + end;
			textarea.dispatchEvent(new InputEvent('change'))
			// this.$emit('input', text);
			// textarea.focus();
			// this.$nextTick(() => {
			// 	textarea.selectionEnd = cursorPosition + emoji.length;
			// });
		}

		return () => (
			<Popup
				duration={showDuration.value}
				v-model={[showPopup.value, 'show']}
				position='bottom'
				lazyRender={false}
				// @ts-ignore
				onOpened={handleOpened}
				onClosed={handleClose}
				onClickOverlay={handleWillClose}
			>
				<div class={styles.wrapper}>
					<textarea
						ref={refTextarea}
						class={styles.textarea}
						v-model={props.value}
						rows={2}
						// @ts-ignore
						onInput={handleInput}
						// @ts-ignore
						onChange={handleInput}
					></textarea>
					<div class={styles.emojiInvoker} onClick={displayEmojis}>
						<svg height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
							<path d='M0 0h24v24H0z' fill='none' />
							<path d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z' />
						</svg>
					</div>
					<div v-show={showEmoji.value} class={styles.emojiWrapper}>
						<div class={styles.emojiPicker}>
							{Object.keys(emojis).map((category) => (
								<div key={category}>
									<h5>{category}</h5>
									<div class={styles.emojis}>{renderEmojis(category as keyof typeof emojis)}</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</Popup>
		);
	},
});
