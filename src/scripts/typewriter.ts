export default function typewriterEffect() {
  const textElement = document.querySelector<HTMLSpanElement>
    ('.header__title--effect');
  const textContent : string = "dependency injection?";
  const length = textContent.length;
  
  if (!textElement) return;

  const caret : HTMLSpanElement = document.createElement('span');
  caret.className = 'header__caret';

  const textNode : Text = document.createTextNode("");
  textElement.appendChild(textNode);
  textElement.appendChild(caret);

  for (let currentLength : number = 0; currentLength <= length; currentLength++) {
    setTimeout(() => {
      textNode.nodeValue = textContent.slice(0, currentLength);
    }, currentLength * 100);
  }
}