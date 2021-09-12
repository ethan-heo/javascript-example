describe("📝 프로토타입의 생성 시점", () => {
	type Person = {
		new (name: string): Person;
		name: string;
	};

	test(`❓
        프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.
    `, () => {
		expect(Person.prototype.hasOwnProperty("constructor")).toBeTruthy();

		function Person(this: Person, name: string) {
			this.name = name;
		}
	});

	test(`❓
        non-constructor는 프로토타입이 생성되지 않는다.
    `, () => {
		const Person = (name: string) => {
			console.log(name);
		};

		expect("prototype" in Person).toBeFalsy();
	});
});
