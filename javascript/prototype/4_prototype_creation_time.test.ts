describe("π νλ‘ν νμμ μμ± μμ ", () => {
	type Person = {
		new (name: string): Person;
		name: string;
	};

	test(`β
        νλ‘ν νμμ μμ±μ ν¨μκ° μμ±λλ μμ μ λλΆμ΄ μμ±λλ€.
    `, () => {
		expect(Person.prototype.hasOwnProperty("constructor")).toBeTruthy();

		function Person(this: Person, name: string) {
			this.name = name;
		}
	});

	test(`β
        non-constructorλ νλ‘ν νμμ΄ μμ±λμ§ μλλ€.
    `, () => {
		const Person = (name: string) => {
			console.log(name);
		};

		expect("prototype" in Person).toBeFalsy();
	});
});
