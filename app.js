function fillArray(maxNumber) {
	var randomArr = [];
	while (randomArr.length < maxNumber) {
		var r = Math.floor(Math.random() * 309);
		if (randomArr.indexOf(r) === -1) randomArr.push(r);
	}
	return randomArr;
}

function ShuffleAll() {
	randomArr = fillArray(309);
	InsertArray = fillArray(309);
	flashArray = fillArray(309);
	NSArray = fillArray(309);
	heapArray = fillArray(309);
	SelectSortArray = fillArray(309);
	countingArray = fillArray(309);
	stalinArray = fillArray(309);
	BogoArray = fillArray(7);

	draw(ctx, ctx.canvas.width, ctx.canvas.height, randomArr, 310);
	draw(
		ctxInsert,
		ctxInsert.canvas.width,
		ctxInsert.canvas.height,
		InsertArray,
		310
	);
	draw(ctxNS, ctxNS.canvas.width, ctxNS.canvas.height, NSArray, 310);
	draw(ctxHeap, ctxHeap.canvas.width, ctxHeap.canvas.height, heapArray, 310);
	draw(ctxFlash, ctxFlash.canvas.width, ctxFlash.canvas.height, flashArray, 310);
	draw(
		ctxSelectionSort,
		ctxSelectionSort.canvas.width,
		ctxSelectionSort.canvas.height,
		SelectSortArray,
		310
	);
	draw(
		ctxCountingSort,
		ctxCountingSort.canvas.width,
		ctxCountingSort.canvas.height,
		countingArray,
		310
	);

	draw(
		ctxStalSort,
		ctxStalSort.canvas.width,
		ctxStalSort.canvas.height,
		stalinArray,
		310
	);
	draw(ctxBogo, ctxBogo.canvas.width, ctxBogo.canvas.height, BogoArray, 300);
	cancelAnimationFrame(animateX);
	cancelAnimationFrame(animateStalS);
	cancelAnimationFrame(animateCS);
	cancelAnimationFrame(animateSS);
	cancelAnimationFrame(animateS);
	cancelAnimationFrame(animateH);
	cancelAnimationFrame(animateF);
	cancelAnimationFrame(animate);
	cancelAnimationFrame(xd);
	//	cancelAnimationFrame(animateX);
}
var animateS;
var animate;
var xd;
var animateF;
var animateH;
var animateQs;
var animateCS;
var animateSS;
var animateStalS;

function draw(ctx, width, height, array, hello) {
	widthForEachBar = width / array.length;

	ctx.clearRect(0, 0, width, height);
	var widthForEachBarIter = 0;
	for (var i = 0; i < array.length; i++) {
		if (array[i] == hello) {
			ctx.fillStyle = "#b2ffff";
		} else {
			ctx.fillStyle = "#FFC300";
		}
		ctx.fillRect(widthForEachBarIter, 0, widthForEachBar - 0.5, array[i]);
		widthForEachBarIter += widthForEachBar;
	}
}

function* BubbleSort(randomArr) {
	var tmp;
	for (var i = 0; i < randomArr.length; ++i) {
		for (var j = 0; j < randomArr.length; ++j) {
			if (i === randomArr.length - 1) {
				yield randomArr[j + 1];
			} else if (randomArr[j] > randomArr[j + 1]) {
				tmp = randomArr[j + 1];
				randomArr[j + 1] = randomArr[j];
				randomArr[j] = tmp;
				yield randomArr[j + 1];
			}
		}
		//yield randomArr;
	}
	cancelAnimationFrame(xd);
}

function* insertionSort(inputArr) {
	for (var i = 0; i < inputArr.length; i++) {
		let key = inputArr[i];
		let j = i - 1;
		while (j >= 0 && inputArr[j] > key) {
			inputArr[j + 1] = inputArr[j];
			j = j - 1;
			yield inputArr[j];
		}
		inputArr[j + 1] = key;
		yield inputArr[i];
	}

	for (var i = 0; i < inputArr.length; i++) {
		if (inputArr[i] < inputArr[i + 1]) yield inputArr[i];
	}
	return cancelAnimationFrame(animate);
}

function init() {
	var sort = BubbleSort(randomArr);

	function anim() {
		var xd = requestAnimationFrame(anim);
		var hello = sort.next();
		draw(ctx, ctx.canvas.width, ctx.canvas.height, randomArr, hello.value);
	}
	anim();
}

function initInsert(InsertArr, ctxD) {
	var sort = insertionSort(InsertArr);

	function animateInsert() {
		animate = requestAnimationFrame(animateInsert);
		var nextGener = sort.next();

		draw(ctxD, ctxD.canvas.width, ctxD.canvas.height, InsertArr, nextGener.value);
	}
	animateInsert();
}
// src stackoverflow
function* sortLSD(array, numberlength) {
	var counter = [[]];
	var modulo = 10;
	var divide = 1;
	for (var i = 0; i < numberlength; i++, divide *= 10, modulo *= 10) {
		for (var j = 0; j < array.length; j++) {
			var bucket = parseInt((array[j] % modulo) / divide);
			if (counter[bucket] == null) {
				counter[bucket] = [];
			}
			counter[bucket].push(array[j]);
		}
		var position = 0;
		for (var j = 0; j < counter.length; j++) {
			var value = null;
			if (counter[j] != null) {
				while ((value = counter[j].shift()) != null) {
					array[position++] = value;
					yield array[position];
				}
			}
		}
	}
	cancelAnimationFrame(animateS);
}

function initRadix(array, ctxD) {
	var sort = sortLSD(array, 3);
	function animateInsert() {
		animateS = requestAnimationFrame(animateInsert);
		var nextGener = sort.next();

		draw(ctxD, ctxD.canvas.width, ctxD.canvas.height, array, nextGener.value);
	}
	animateInsert();
}

function thisisSorted(array) {
	for (var i = 0; i < array.length - 1; i++) {
		if (array[i] < array[i + 1]) {
		} else {
			return false;
		}
	}
	return true;
}

function* BogoSort(array) {
	var i = 0;
	var test;
	while (true) {
		var a = Math.floor(Math.random() * array.length);
		var b = Math.floor(Math.random() * array.length);

		var tmp = array[a];
		array[a] = array[b];
		array[b] = tmp;

		yield array[a];
		i++;

		test = thisisSorted(array);
		if (test === true) {
			break;
		}
		if (i === 40320) {
			return;
		}
	}
	cancelAnimationFrame(animateX);
}

function initBogo(array, ctxD) {
	var sort = BogoSort(array);
	function animateBogo() {
		animateX = requestAnimationFrame(animateBogo);
		var nextGener = sort.next();
		draw(ctxD, ctxD.canvas.width, ctxD.canvas.height, array, nextGener.value);
	}
	animateBogo();
}
// understood and made with https://www.w3resource.com/javascript-exercises/searching-and-sorting-algorithm/searching-and-sorting-algorithm-exercise-3.phps
function heapMax(input, i) {
	var left = 2 * i + 1;
	var right = 2 * i + 2;
	var largestChildNum = i;

	if (left < arrayLen && input[left] > input[largestChildNum]) {
		largestChildNum = left;
	}

	if (right < arrayLen && input[right] > input[largestChildNum]) {
		largestChildNum = right;
	}

	if (largestChildNum != i) {
		swap(input, i, largestChildNum);
		heapMax(input, largestChildNum);
	}
	return largestChildNum;
}

function swap(input, a, b) {
	var temp = input[a];

	input[a] = input[b];
	input[b] = temp;
}

function* heapSort(input) {
	arrayLen = input.length;
	var d;
	for (var i = input.length; i >= 0; i -= 1) {
		d = heapMax(input, i);
		yield input[d];
	}

	for (i = input.length - 1; i > 0; i--) {
		swap(input, 0, i);
		arrayLen--;
		heapMax(input, 0);
		yield input[arrayLen];
	}
	cancelAnimationFrame(animateH);
}
//flashSort src == https://github.com/rgupta443/Flashsort-in-JavaScript/blob/master/flashsort.js
function* flashsort(a) {
	var max = 0;
	var key = a[0];
	var n = a.length;
	var m = ~~(0.45 * n);
	var l = new Array(m);

	for (var i = 1; i < n; ++i) {
		if (a[i] < key) {
			key = a[i];
		}
		if (a[i] > a[max]) {
			max = i;
		}
	}

	if (key === a[max]) {
		return a;
	}

	var c1 = (m - 1) / (a[max] - key);

	for (var k = 0; k < m; k++) {
		l[k] = 0;
	}
	for (var j = 0; j < n; ++j) {
		k = ~~(c1 * (a[j] - key));
		++l[k];
	}

	for (var p = 1; p < m; ++p) {
		l[p] = l[p] + l[p - 1];
	}

	var hold = a[max];
	a[max] = a[0];
	a[0] = hold;

	//permutation
	var move = 0;
	var j = 0,
		t;
	var k = m - 1;
	var flash;

	while (move < n - 1) {
		while (j > l[k] - 1) {
			++j;
			k = ~~(c1 * (a[j] - key));
		}
		if (k < 0) break;
		flash = a[j];
		while (j !== l[k]) {
			k = ~~(c1 * (flash - key));
			hold = a[(t = --l[k])];
			a[t] = flash;
			//console.log("Cycle counter:"+move+"\t\t"+a);
			flash = hold;
			++move;
			yield a[t];
		}
	}

	//insertion
	for (var j = 1; j < n; j++) {
		hold = a[j];
		var i = j - 1;
		while (i >= 0 && a[i] > hold) {
			a[i + 1] = a[i--];
		}
		a[i + 1] = hold;
	}
	cancelAnimationFrame(animateF);
	//console.log(a);
}
function* SelectionSort(array) {
	var len = array.length;
	for (var i = 0; i < len; i++) {
		var key = i;
		for (var j = i + 1; j < len; j++) {
			if (array[j] < array[key]) {
				key = j;
				yield array[j];
			}
		}
		if (key !== i) {
			swap(array, i, key);
			yield array[key];
		}
	}
	cancelAnimationFrame(animateSS);
}

function initSelectionSort(array, ctxD) {
	var sort = SelectionSort(array);
	function animate() {
		animateSS = requestAnimationFrame(animate);
		var nextGener = sort.next();
		draw(ctxD, ctxD.canvas.width, ctxD.canvas.height, array, nextGener.value);
	}
	animate();
}
function* countingSort(array, min, max) {
	let i = min,
		j = 0,
		len = array.length,
		count = [];

	for (i; i <= max; i++) {
		count[i] = 0;
		yield array[i];
	}

	for (i = 0; i < len; i++) {
		count[array[i]] += 1;
		yield array[i];
	}

	for (i = min; i <= max; i++) {
		while (count[i] > 0) {
			array[j] = i;
			j++;
			count[i]--;
			yield array[j];
		}
	}
	return array;
}

function initCS(array, ctxD) {
	var sort = countingSort(
		countingArray,
		Math.min(...countingArray),
		Math.max(...countingArray)
	);

	function animate() {
		animateCS = requestAnimationFrame(animate);
		var nextGener = sort.next();
		draw(ctxD, ctxD.canvas.width, ctxD.canvas.height, array, nextGener.value);
	}
	animate();
}

function* stalinSort(array) {
	for (let i = 1; i < array.length; i++) {
		if (array[i - 1] > array[i]) {
			yield array[i];
			array.splice(i, 1);
			i--;
		}
	}
}

function initStalinSort(array, ctxD) {
	var sort = stalinSort(array);

	function animate() {
		animateStalS = requestAnimationFrame(animate);
		var nextGener = sort.next();
		draw(ctxD, ctxD.canvas.width, ctxD.canvas.height, array, nextGener.value);
	}
	animate();
}

/*
These are responsible for the bubblesort animation
*/
var ctx = document.getElementById("canvas").getContext("2d");
var randomArr = [];
randomArr = fillArray(309);

ctx.translate(0, ctx.canvas.height);
ctx.scale(1, -1);
draw(ctx, ctx.canvas.width, ctx.canvas.height, randomArr, 310);

bubbleSortEvent = document.getElementById("BubbleSort");

var ctxInsert = document.getElementById("canvas2").getContext("2d");
var InsertArray = [];
InsertArray = fillArray(309);

ctxInsert.translate(0, ctxInsert.canvas.height);
ctxInsert.scale(1, -1);
draw(
	ctxInsert,
	ctxInsert.canvas.width,
	ctxInsert.canvas.height,
	InsertArray,
	310
);

var ctxNS = document.getElementById("canvas3").getContext("2d");
var NSArray = [];
NSArray = fillArray(309);
ctxNS.translate(0, ctxNS.canvas.height);
ctxNS.scale(1, -1);
draw(ctxNS, ctxNS.canvas.width, ctxNS.canvas.height, NSArray, 310);

var ctxBogo = document.getElementById("canvas4").getContext("2d");
var BogoArray = [];
BogoArray = fillArray(7);
ctxBogo.translate(0, ctxBogo.canvas.height);
ctxBogo.scale(1, -1);
draw(ctxBogo, ctxBogo.canvas.width, ctxBogo.canvas.height, BogoArray, 310);

function initHeap(array, ctxD) {
	var sort = heapSort(array);
	function animateBogo() {
		animateH = requestAnimationFrame(animateBogo);
		var nextGener = sort.next();
		draw(ctxD, ctxD.canvas.width, ctxD.canvas.height, array, nextGener.value);
	}
	animateBogo();
}

var ctxHeap = document.getElementById("canvas5").getContext("2d");
var heapArray = [];
heapArray = fillArray(309);
ctxHeap.translate(0, ctxHeap.canvas.height);
ctxHeap.scale(1, -1);
draw(ctxHeap, ctxHeap.canvas.width, ctxHeap.canvas.height, heapArray, 310);

function initFlash(array, ctxD) {
	var sort = flashsort(array);
	function animate() {
		animateF = requestAnimationFrame(animate);
		var nextGener = sort.next();
		draw(ctxD, ctxD.canvas.width, ctxD.canvas.height, array, nextGener.value);
	}
	animate();
}

var ctxFlash = document.getElementById("canvas6").getContext("2d");
var flashArray = [];
flashArray = fillArray(309);
ctxFlash.translate(0, ctxHeap.canvas.height);
ctxFlash.scale(1, -1);
draw(ctxFlash, ctxFlash.canvas.width, ctxFlash.canvas.height, flashArray, 310);

var ctxSelectionSort = document.getElementById("canvas7").getContext("2d");
var SelectSortArray = [];
SelectSortArray = fillArray(309);
ctxSelectionSort.translate(0, ctxSelectionSort.canvas.height);
ctxSelectionSort.scale(1, -1);
draw(
	ctxSelectionSort,
	ctxSelectionSort.canvas.width,
	ctxSelectionSort.canvas.height,
	SelectSortArray,
	310
);

ctxCountingSort = document.getElementById("canvas8").getContext("2d");
countingArray = [];
countingArray = fillArray(309);
ctxCountingSort.translate(0, ctxCountingSort.canvas.height);
ctxCountingSort.scale(1, -1);
draw(
	ctxCountingSort,
	ctxCountingSort.canvas.width,
	ctxCountingSort.canvas.height,
	countingArray,
	310
);

var ctxStalSort = document.getElementById("canvas9").getContext("2d");
stalinArray = [];
stalinArray = fillArray(309);
ctxStalSort.translate(0, ctxStalSort.canvas.height);
ctxStalSort.scale(1, -1);
draw(
	ctxStalSort,
	ctxStalSort.canvas.width,
	ctxStalSort.canvas.height,
	stalinArray,
	310
);
