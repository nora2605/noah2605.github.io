var audio = new Audio('simp.mp3');
audio.loop = true;
document.getElementById('camrageStart').onclick = () => {
    let incSnd = document.getElementById('incSnd').checked;
	if (incSnd) audio.play();
    let textCount = document.getElementById('textCount').value,
        animSpeed = document.getElementById('animSpeed').value,
        appSpeed = document.getElementById('appSpeed').value,
        bgSpeed = document.getElementById('bgSpeed').value,
        tasrb = document.getElementById('tasrb').value,
        fontFamily = document.getElementById('fontFamily').value,
		fontSize = document.getElementById('fontSize').value,
        hexColors = document.getElementById('hexColors').value,
		hexColorCount = document.getElementById('hexColorCount').value,
		useRandomColors = document.getElementById('ranColors').checked
		textColors = document.getElementById('textColors').value.split(','),
		useRandomTextColors = document.getElementById('ranTextColors').checked;

    let mainText = document.getElementById('mainText');

    document.getElementsByClassName('ControlContainer')[0].style.visibility = "hidden";
    for (let i = 0; i < textCount; i++) {
        let element = document.createElement('h1');
        element.style.animationDelay = i;
        element.innerHTML = mainText.value.replace(/[\n]/g, '</br>');
		mainText.style.visibility = "hidden";
        let ccss = [
            `font-family: ${fontFamily};`,
			`font-size: ${fontSize}pt;`,
            `color: ${useRandomTextColors ? generateRandomColor() : ('#' + textColors[i % textColors.length])};`,
            `top: ${Math.floor(Math.random() * 200 - 50).toFixed(0)}%;`,
            `animation: title ${(Math.floor(animSpeed) + (Math.random() * 100 * tasrb - 100 * tasrb/2)/50).toFixed(2)}s linear -${i * appSpeed}s infinite forwards;`
        ].join(' ');
		element.style = ccss;
        document.body.appendChild(element);
    }
    let colors = useRandomColors ? genList(generateRandomColor,hexColorCount) : hexColors.split(',');
    let cssString = "@keyframes bgf {\n";
    for (let i = 0; i < colors.length; i++) {
        cssString += `\t${Math.floor(100/(colors.length)*i)}% {background-color: ${useRandomColors ? '' : '#'}${colors[i]};}\n`;
    }
	cssString += `\t100% {background-color: ${useRandomColors ? '' : '#'}${colors[0]};}\n`;
    cssString += "}";
    document.getElementById('bgfS').innerHTML = cssString;
    document.body.style.animation = `bgf ${bgSpeed}s ease-in-out 0s infinite`;
}
document.getElementById('reset').onclick = () => {
	let mainText = document.getElementById('mainText');
	mainText.style.visibility = "visible";
    if (!audio.paused)
        audio.pause();
    let o = document.getElementsByTagName('h1');
    while (o[0]) {
        o[0].remove();
    }
    document.getElementsByClassName('ControlContainer')[0].style.visibility = 'visible';
    document.body.style.animation = '';
}
document.getElementById('resetOptions').onclick = () => {
    let o = document.getElementsByTagName('input');
    for (let i = 0; i < o.length; i++) {
        switch (o[i].id) {
            case 'fontFamily':
                o[i].value = "Arial";
                break;
            case 'textCount':
                o[i].value = "20";
                break;
            case 'appSpeed':
                o[i].value = "1";
                break;
            case 'animSpeed':
                o[i].value = "6";
                break;
            case 'bgSpeed':
                o[i].value = "2";
                break;
            case 'hexColors':
                o[i].value = "FF0000,00FF00,0000FF";
                break;
			case 'hexColorCount':
				o[i].value = "3";
				break;
			case 'ranColors':
				o[i].checked = false;
				break;
			case 'ranTextColors':
				o[i].checked = true;
				break;
			case 'textColors':
				o[i].value = "000000";
			break;
				case 'fontSize':
				o[i].value = "12";
				break;
            default:
                o[i].value = "1";
                break;
        }
		o[i].dispatchEvent(new Event('change'));
    }
}

document.getElementById('ranColors').addEventListener("change", () => {
	if (document.getElementById('ranColors').checked) {
		document.getElementById('hexColors').disabled = true;
		document.getElementById('hexColorCount').disabled = false;
	} else {
		document.getElementById('hexColors').disabled = false;
		document.getElementById('hexColorCount').disabled = true;
	}
});

document.getElementById('ranTextColors').addEventListener("change", () => {
	if (document.getElementById('ranTextColors').checked)
		document.getElementById('textColors').disabled = true;
	else
		document.getElementById('textColors').disabled = false;
});

document.getElementById('hexColors').addEventListener("change", () => {
	document.getElementById('hexColorCount').value = `${document.getElementById('hexColors').value.split(',').length}`;
});

document.getElementById('fontFamily').addEventListener("change", () => {
	document.getElementById('mainText').style.fontFamily = `${document.getElementById('fontFamily').value}`;
});

document.getElementById('fontSize').addEventListener("change", () => {
	document.getElementById('mainText').style.fontSize = `${document.getElementById('fontSize').value}pt`;
});

document.getElementById('incImg').addEventListener("change", () => {
	if (document.getElementById('incImg').checked) document.getElementById('camImg').style.visibility = "visible";
	else document.getElementById('camImg').style.visibility = "hidden";
});

function generateRandomColor() {
	return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
}

function genList(func, len) {
	let l = [];
	for (let i = 0; i < len; i++) {
		l[i] = func();
	}
	console.log(l);
	return l;
}