describe(`๐ ๋ฆฌํฐ๋ด ํ๊ธฐ๋ฒ์ ์ํด ์์ฑ๋ ๊ฐ์ฒด์ ์์ฑ์ ํจ์์ ํ๋กํ ํ์`, () => {
	type Person = {
		new (name: string): Person;
		name: string;
	};
	const Person = function (this: Person, name: string) {
		this.name = name;
	} as unknown as Person;

	test(`โ ์ธ์คํด์ค์ prototype์ constructor๋ ์ธ์คํด์ค๋ฅผ ์์ฑํ ์์ฑ์ ํจ์์ด๋ค.`, () => {
		const obj = new Object();

		expect(obj.constructor === Object).toBeTruthy();

		const add = new Function(`a`, `b`, `return a + b`);

		expect(add.constructor === Function).toBeTruthy();

		const me = new Person(`Heo`);

		expect(me.constructor === Person).toBeTruthy();
	});

	test(`โ ์ธ์คํด์ค๋ฅผ ์์ฑํ์ง ์๋ ๋ฆฌํฐ๋ด ํ๊ธฐ๋ฒ์ ์ํด ์์ฑ๋ ๊ฐ์ฒด๋ฐฉ์`, () => {
		const obj = {};

		expect(obj.constructor === Object).toBeTruthy();

		const add = function (a: number, b: number) {
			return a + b;
		};

		expect(add.constructor === Function).toBeTruthy();

		const arr = [1, 2, 3];

		expect(arr.constructor === Array).toBeTruthy();

		const regexp = /is/g;

		expect(regexp.constructor === RegExp).toBeTruthy();
	});

	test(`โ 
        ๋ฆฌํฐ๋ด ํ๊ธฐ๋ฒ์ ์ํด ๊ฐ์ฒด๋ฅผ ์์ฑํ  ๋ ๋ด๋ถ์ ์ผ๋ก OrdinaryObjectCreate๋ฅผ 
        ํธ์ถํ์ฌ Object.prototype์ ํ๋กํ ํ์์ผ๋ก ๊ฐ๋ ๋น ๊ฐ์ฒด๋ฅผ ์์ฑํ๋ค.
    `, () => {
		// 2. Object ์์ฑ์ ํจ์์ ์ํ ๊ฐ์ฒด ์์ฑ
		// OrdinaryObjectCreate ํธ์ถ
		const obj = new Object();

		expect(Object.getPrototypeOf(obj)).toBe(Object.prototype);

		// 1. new.target์ด undefined๋ Object๊ฐ ์๋ ๊ฒฝ์ฐ
		class Foo extends Object {}

		const foo = new Foo();

		expect(Object.getPrototypeOf(foo)).toBe(Foo.prototype);
		expect(Object.getPrototypeOf(Foo.prototype)).toBe(Object.prototype);

		// 3. ์ธ์๊ฐ ์ ๋ฌ๋ ๊ฒฝ์ฐ์๋ ์ธ์๋ฅผ ๊ฐ์ฒด๋ก ๋ณํํ๋ค.
		const number = new Object(123);

		expect(Object.getPrototypeOf(number)).toBe(Number.prototype);

		const str = new Object("123");

		expect(Object.getPrototypeOf(str)).toBe(String.prototype);
	});

	test(`โ
        ํจ์ ์ ์ธ๋ฌธ๊ณผ ํจ์ ํํ์์ผ๋ก ํจ์ ๊ฐ์ฒด๋ฅผ ์์ฑํ ๊ฒ์ Function ์์ฑ์ ํจ์๊ฐ ์๋๋ค.
        ํ์ง๋ง ๊ฐ์์ ์ธ ์์ฑ์ ํจ์๋ฅผ ๊ฐ๋๋ค. ํ๋กํ ํ์์ ์์ฑ์ ํจ์์ ๋๋ถ์ด ์์ฑ๋๋ฉฐ 
        prototype, constructor ํ๋กํผํฐ์ ์ํด ์ฐ๊ฒฐ๋์ด ์๊ธฐ ๋๋ฌธ์ด๋ค.
        (ํ๋กํ ํ์๊ณผ ์์ฑ์ ํจ์๋ ๋จ๋์ผ๋ก ์กด์ฌํ  ์ ์๊ณ  ์ธ์ ๋ ์์ผ๋ก ์กด์ฌํ๋ค.)
    `, () => {
		// ์ด๋ป๊ฒ ํ์คํธ๋ฅผ ํด๋ณด์ง?
		// Function ์์ฑ์ ํจ์๋ ๋ ์์ปฌ ์ค์ฝํ๋ฅผ ์์ฑํ์ง ์๊ณ  ์ ์ญ์ผ๋ก ์์ฑํ๋ค๋๋ฐ...
	});
});
