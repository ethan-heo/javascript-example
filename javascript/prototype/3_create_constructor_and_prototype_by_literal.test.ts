describe(`📝 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입`, () => {
	type Person = {
		new (name: string): Person;
		name: string;
	};
	const Person = function (this: Person, name: string) {
		this.name = name;
	} as unknown as Person;

	test(`❓ 인스턴스의 prototype의 constructor는 인스턴스를 생성한 생성자 함수이다.`, () => {
		const obj = new Object();

		expect(obj.constructor === Object).toBeTruthy();

		const add = new Function(`a`, `b`, `return a + b`);

		expect(add.constructor === Function).toBeTruthy();

		const me = new Person(`Heo`);

		expect(me.constructor === Person).toBeTruthy();
	});

	test(`❓ 인스턴스를 생성하지 않는 리터럴 표기법에 의해 생성된 객체방식`, () => {
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

	test(`❓ 
        리터럴 표기법에 의해 객체를 생성할 때 내부적으로 OrdinaryObjectCreate를 
        호출하여 Object.prototype을 프로토타입으로 갖는 빈 객체를 생성한다.
    `, () => {
		// 2. Object 생성자 함수에 의한 객체 생성
		// OrdinaryObjectCreate 호출
		const obj = new Object();

		expect(Object.getPrototypeOf(obj)).toBe(Object.prototype);

		// 1. new.target이 undefined나 Object가 아닌 경우
		class Foo extends Object {}

		const foo = new Foo();

		expect(Object.getPrototypeOf(foo)).toBe(Foo.prototype);
		expect(Object.getPrototypeOf(Foo.prototype)).toBe(Object.prototype);

		// 3. 인수가 전달된 경우에는 인수를 객체로 변환한다.
		const number = new Object(123);

		expect(Object.getPrototypeOf(number)).toBe(Number.prototype);

		const str = new Object("123");

		expect(Object.getPrototypeOf(str)).toBe(String.prototype);
	});

	test(`❓
        함수 선언문과 함수 표현식으로 함수 객체를 생성한 것은 Function 생성자 함수가 아니다.
        하지만 가상적인 생성자 함수를 갖는다. 프로토타입은 생성자 함수와 더불어 생성되며 
        prototype, constructor 프로퍼티에 의해 연결되어 있기 때문이다.
        (프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재한다.)
    `, () => {
		// 어떻게 테스트를 해보지?
		// Function 생성자 함수는 렉시컬 스코프를 생성하지 않고 전역으로 생성한다던데...
	});
});
