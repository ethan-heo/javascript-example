describe("๐ ๊ฐ์ฒด ์์ฑ ๋ฐฉ์", () => {
	/**
	 * CreateOrdinaryObject์ ์ํด ์์ฑ๋๋ค.
	 */
	type Person = {
		new (name: string): void;
		name: string;
	};

	test(`โ
        ๊ฐ์ฒด ๋ฆฌํฐ๋ด
    `, () => {
		const obj = { x: 1 };

		expect(obj.constructor === Object).toBeTruthy();
		expect(obj.hasOwnProperty("x")).toBeTruthy();
	});

	test(`โ
        Object ์์ฑ์ ํจ์
    `, () => {
		const obj = new Object();

		(obj as any).x = 1;

		expect(obj.constructor === Object).toBeTruthy();
		expect(obj.hasOwnProperty("x")).toBeTruthy();
	});

	test(`โ
        ์์ฑ์ ํจ์
    `, () => {
		const Person = function (this: Person, name: string) {
			this.name = name;
		} as unknown as Person;

		Person.prototype.sayHello = function () {};

		const me = new Person(`Heo`);
		const eun = new Person(`Eun`);

		expect((me as any).sayHello === (eun as any).sayHello).toBeTruthy();
	});
});
