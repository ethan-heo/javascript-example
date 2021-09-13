describe("📝 객체 생성 방식", () => {
	/**
	 * CreateOrdinaryObject에 의해 생성된다.
	 */
	type Person = {
		new (name: string): void;
		name: string;
	};

	test(`❓
        객체 리터럴
    `, () => {
		const obj = { x: 1 };

		expect(obj.constructor === Object).toBeTruthy();
		expect(obj.hasOwnProperty("x")).toBeTruthy();
	});

	test(`❓
        Object 생성자 함수
    `, () => {
		const obj = new Object();

		(obj as any).x = 1;

		expect(obj.constructor === Object).toBeTruthy();
		expect(obj.hasOwnProperty("x")).toBeTruthy();
	});

	test(`❓
        생성자 함수
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
