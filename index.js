/**
 * SORTED ARRAY Class
 *
 * @author Brice Chevalier
 *
 * @comparisonFunction {function} comparison function that takes two parameters a and b and returns a number
 *
 * @desc
 *
 *    Method                Time Complexity
 *    ___________________________________
 *
 *    add                    O(n)
 *    remove                O(n)
 *  removeByIdx            O(n)
 *  get                    O(1)
 *  find                O(log2(n) + m) where m is the number of elements that compare equally to the searched object
 *    getFirst            O(1)
 *    getLast                O(1)
 *    getCount            O(1)
 *    apply                O(n)
 *    clear                O(n)
 *
 *    Memory Complexity in O(n)
 */

function SortedArray(comparisonFunction) {
	this.array = [];
	this.cmpFunc = comparisonFunction;
}

SortedArray.prototype.add = function (obj) {
	var length = this.array.length;

	if (length === 0) {
		this.array.push(obj);
		return 1;
	}

	var cmpFirst = this.cmpFunc(obj, this.array[0]);
	var cmpLast = this.cmpFunc(obj, this.array[length - 1]);

	var i;
	if (-cmpFirst > cmpLast) {
		i = 0;
		while(i < length && this.cmpFunc(obj, this.array[i]) > 0 ){
			i += 1;
		}
		this.array.splice(i, 0, obj);
		return i;
	} else {
		i = length - 1;
		while(0 <= i && this.cmpFunc(obj, this.array[i]) < 0){
			i -= 1;
		}
		this.array.splice(i + 1, 0, obj);
		return i + 1;
	}
};

SortedArray.prototype.get = function (idx) {
	return this.array[idx];
};

SortedArray.prototype.find = function (obj) {
	// dichotomic search
	var j;
	var length = this.array.length;
	var i = ~~(length / 2);
	var min = 0;
	var max = length - 1;
	while (min <= max) {
		if (this.cmpFunc(obj, this.array[i]) > 0) {
			min = i + 1;
		} else if (this.cmpFunc(obj, this.array[i]) < 0) {
			max = i - 1;
		} else {
			j = i;
			while (j >= 0 && this.cmpFunc(obj, this.array[j]) === 0) {
				if (obj === this.array[j]) {
					return j;
				}
				j -= 1;
			}

			j = i + 1;
			while (j < length && this.cmpFunc(obj, this.array[j]) === 0) {
				if (obj === this.array[j]) {
					return j;
				}
				j += 1;
			}

			// element not found
			return -1;
		}
		i = ~~((max + min) / 2);
	}
};

SortedArray.prototype.getFirst = function () {
	return this.array[0];
};

SortedArray.prototype.getLast = function () {
	return this.array[this.array.length - 1];
};

SortedArray.prototype.getCount = function () {
	return this.array.length;
};

SortedArray.prototype.remove = function (obj) {
	var i = this.array.indexOf(obj);
	if (i >= 0) {
		this.array.splice(i, 1);
		return 1;
	}
	return 0;
};

SortedArray.prototype.removeByIdx = function (idx) {
	this.array.splice(idx, 1);
};

SortedArray.prototype.forEach = function (processingFunc, params) {
	for (var i = 0; i < this.array.length; i += 1) {
		processingFunc(this.array[i], params);
	}
};

SortedArray.prototype.forEachReverse = function (processingFunc, params) {
	for (var i = this.array.length - 1; i >= 0; i -= 1) {
		processingFunc(this.array[i], params);
	}
};

SortedArray.prototype.clear = function () {
	this.array = [];
};

module.exports = SortedArray;