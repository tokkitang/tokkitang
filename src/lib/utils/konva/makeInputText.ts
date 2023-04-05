import type Konva from 'konva';

// Text 노드에 편집 가능한 textarea를 부착합니다.
export function makeInputText(stage: Konva.Stage, textNode: Konva.Text): Konva.Text {
	textNode.on('dblclick', () => {
		// create textarea over canvas with absolute position

		// first we need to find position for textarea
		// how to find it?

		// at first lets find position of text node relative to the stage:
		const textPosition = textNode.getAbsolutePosition();

		// then lets find position of stage container on the page:
		const stageBox = stage.container().getBoundingClientRect();

		// so position of textarea will be the sum of positions above:
		const areaPosition = {
			x: stageBox.left + textPosition.x,
			y: stageBox.top + textPosition.y
		};

		// create textarea and style it
		const textarea = document.createElement('textarea');
		textarea.style.backgroundColor = 'transparent'; // 투명 처리
		document.body.appendChild(textarea);

		textarea.value = textNode.text();
		textarea.style.position = 'absolute';
		textarea.style.top = areaPosition.y + 'px';
		textarea.style.left = areaPosition.x + 'px';
		textarea.style.width = textNode.width().toString() + 'px';
		textarea.style.height = textNode.height().toString() + 'px';
		textarea.style.border = 'none';

		textNode.text('');

		textarea.focus();

		const saveTextAndClose = () => {
			textNode.text(textarea.value);
			document.body.removeChild(textarea);
		};

		textarea.addEventListener('keydown', function (e) {
			// hide on enter
			if (e.keyCode === 13) {
				saveTextAndClose();
			}
		});

		textarea.addEventListener('focusout', function (e) {
			saveTextAndClose();
		});
	});

	return textNode;
}
