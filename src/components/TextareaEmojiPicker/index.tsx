import { Popup } from 'vant';
import { defineComponent, nextTick, onMounted, ref, watch } from 'vue';
import emojis from './emojis';
import styles from './index.module.scss';
import SmileLogo from './smile.vue';

export default defineComponent({
	name: 'TextareaEmojiPicker',
	props: {
		textValue: {
			type: String,
			required: false,
			default: '',
		},
		textLimit: {
			type: Number,
			required: false,
			default: 20,
		},
		textRows: {
			type: Number,
			required: false,
			default: 2,
		},
		show: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	emits: ['update:textValue', 'update:show', 'commit'],
	setup(props, { emit, attrs, slots }) {
		let refTextarea = ref<HTMLTextAreaElement>();

		let showPopup = props.show;
		const showDuration = ref(0.3);
		const showEmoji = ref(false);
		const maxLength = props.textLimit;

		onMounted(() => {
			let textarea = refTextarea.value as HTMLTextAreaElement;

			textarea.addEventListener('focus', () => {
				showEmoji.value = false;
			});
		});

		watch(
			() => props.show,
			(value, prevValue) => {
				showPopup = value;
			}
		);

		function handleInput(e: InputEvent) {
			let textarea = e.target as HTMLTextAreaElement;
			let txt = textarea.value;
			// if (txt.length > maxLength) {
			// 	// console.warn(txt.length);
			// 	txt = txt.substr(0, maxLength);
			// 	textarea.value = txt;
			// }

			//// console.log(e);
			emit('update:textValue', txt);
		}

		function handleCommit() {
			emit('commit', (refTextarea.value as HTMLTextAreaElement).value);
		}

		function handleOpened() {
			showDuration.value = 0;
			(refTextarea.value as HTMLTextAreaElement).focus();
		}

		function handleWillClose() {
			showDuration.value = 0.3;
			emit('update:show', false);
		}

		function handleClose() {
			showEmoji.value = false;
		}

		function renderEmojis(emojiCategoryName: keyof typeof emojis): JSX.Element[] {
			let spans: JSX.Element[] = [];
			Object.keys(emojis[emojiCategoryName]).forEach((emojiName) => {
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
			if (showEmoji.value) {
				showEmoji.value = false;
				nextTick(() => {
					const textarea = refTextarea.value as HTMLTextAreaElement;
					textarea.focus();
				});
			} else {
				showEmoji.value = true;
			}
		}

		function addEmoji(emoji: string) {
			// debugger;
			const textarea = refTextarea.value as HTMLTextAreaElement;
			const cursorPosition = textarea.selectionEnd;
			const start = textarea.value.substring(0, textarea.selectionStart);
			const end = textarea.value.substring(textarea.selectionStart);
			textarea.value = start + emoji + end;
			textarea.dispatchEvent(new InputEvent('change'));
			// this.$emit('input', text);
			// textarea.focus();
			nextTick(() => {
				textarea.selectionEnd = cursorPosition + emoji.length;
			});
		}

		function calcuCount(): JSX.Element {
			const textarea = refTextarea.value as HTMLTextAreaElement;
			let count = textarea?.value.length ?? 0;
			let limit = maxLength - count;
			let sty: string = '';
			if (limit < 0) {
				sty = `color: #d9534f;`;
			}
			return (
				<>
					<div class={styles.textCount}>
						<span style={sty}>{limit < 0 ? limit : count}</span>
					</div>
					<button class={styles.commitButton} disabled={limit < 0} onClick={handleCommit}>
						提交
					</button>
				</>
			);
		}

		return () => (
			<Popup
				duration={showDuration.value}
				v-model={[showPopup, 'show']}
				position='bottom'
				lazyRender={false}
				// @ts-ignore
				onOpened={handleOpened}
				onClosed={handleClose}
				onClickOverlay={handleWillClose}
			>
				<div class={styles.wrapper}>
					<textarea
						placeholder='请输入'
						ref={refTextarea}
						class={styles.textarea}
						value={props.textValue}
						rows={props.textRows}
						style={{ height: `${props.textRows * 1.5}em` }}
						// @ts-ignore
						onInput={handleInput}
						// @ts-ignore
						onChange={handleInput}
					></textarea>

					<div class={styles.actionWrapper}>
						<SmileLogo
							// @ts-ignore
							onClick={displayEmojis}
						/>

						{calcuCount()}

					</div>
				</div>
						<div class={styles.emojiWrapper} v-show={showEmoji.value}>
							<div class={styles.emojiPicker}>
								{Object.keys(emojis).map((category) => (
									<div key={category}>
										<h5>{category}</h5>
										<div class={styles.emojis}>{renderEmojis(category as keyof typeof emojis)}</div>
									</div>
								))}
							</div>
						</div>
			</Popup>
		);
	},
});
