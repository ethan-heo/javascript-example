describe(`π νλ‘ν νμ κ°μ²΄`, () => {
	describe(`__proto__`, () => {
		test(`β __proto__(μ κ·Όμ νλ‘νΌν°)λ₯Ό ν΅ν΄ μμ μ νλ‘ν νμμ κ°μ μ μΌλ‘ μ κ·Όν  μ μλ€.`, () => {
			/**
			 * νλ‘ν νμμ μ§μ  μ κ·Όν  μ μλ€. κ·Έλ κΈ° λλ¬Έμ __proto__λ₯Ό ν΅ν΄μ κ°μ μ μΌλ‘
			 * μ κ·Όν  μ μλ€.
			 *
			 * __proto__λ μ κ·Όμ ν¨μ [[get]], [[set]]μΌλ‘ μ΄λ£¨μ΄μ§ νλ‘νΌν°μ΄λ€.
			 */
			const obj: any = {
				a: 1,
			};
			expect(obj.__proto__ === Object.prototype).toBeTruthy();
		});

		test(`β __proto__λ₯Ό ν΅ν΄ prototype μ¬μ μλ₯Ό ν  μ μλ€.`, () => {
			const obj: any = {
				a: 1,
			};
			const newObj = {
				b: 2,
			};

			obj.__proto__ = newObj;

			expect(obj.b).toBe(2);
			expect(obj.a).toBe(1);
		});

		test(`β __proto__ μ κ·Όμλ μμμ ν΅ν΄ μ¬μ©λλ€.`, () => {
			const obj: any = {
				a: 1,
			};

			expect(obj.hasOwnProperty(`__proto__`)).toBeFalsy();
			expect(Object.prototype).toBe(obj.__proto__);
		});

		test(`β 
            __proto__ μ κ·Όμ νλ‘νΌν°λ₯Ό ν΅ν΄ νλ‘ν νμμ μ κ·Όνλ μ΄μ λ 
            μνΈ μ°Έμ‘°μ μν΄ νλ‘νΉνμ μ²΄μΈμ΄ μμ±λλ κ²μ λ°©μ§νκΈ° μν΄μμ΄λ€.`, () => {
			/**
			 * νλ‘ν νμ μ²΄μΈμ λ¨λ°©ν₯ λ§ν¬λ λ¦¬μ€νΈλ‘ κ΅¬νλμ΄μΌ νλ€. μ¦. μν μ°Έμ‘°νλ νλ‘ν  νμ μ²΄μΈμ΄
			 * λ§λ€μ΄μ§λ©΄ νλ‘ν νμ μ²΄μΈ μ’μ μ΄ μ‘΄μ¬νμ§ μκΈ° λλ¬Έμ λ¬΄νλ£¨νμ λΉ μ§λ€.
			 */
			const parent: any = {};
			const child: any = {};

			child.__proto__ = parent;

			const cycling = () => {
				parent.__proto__ = child;
			};

			expect(cycling).toThrow(TypeError);
			expect(cycling).toThrow("Cyclic __proto__ value");
		});

		test(`β 
            __proto__ μ κ·Όμ νλ‘νΌν°λ₯Ό μ½λ λ΄ μμ μ§μ  μ¬μ©νλ κ²μ κΆμ₯νμ§ μλλ€. 
            λͺ¨λ  κ°μ²΄κ° __proto__ μ κ·Όμλ₯Ό μ¬μ©νλ κ²μ μλκΈ° λλ¬Έμ΄λ€.`, () => {
			const obj = Object.create(null);

			expect(obj.__proto__).toBeFalsy();
			expect(Object.getPrototypeOf(obj)).toBe(null);
		});

		test(`β
            Object.setPrototypeOf === __proto__([[set]])
            Object.getPrototypeOf === __proto__([[get]])
        `, () => {
			const obj: any = {};
			const parent = { x: 1 };

			expect(Object.getPrototypeOf(obj)).toBe(obj.__proto__);

			Object.setPrototypeOf(obj, parent);

			expect(obj.x).toBe(1);
		});
	});

	describe(`ν¨μ κ°μ²΄μ prototype νλ‘νΌν°`, () => {
		test(`β ν¨μ κ°μ²΄λ prototypeμ μμ νλ€.`, () => {
			expect(function () {}.hasOwnProperty(`prototype`)).toBeTruthy();
		});

		test(`β νμ΄ν ν¨μ, λ©μλ ν¨μλ prototypeμ μμ νμ§ μμΌλ©° μμ±νμ§λ μλλ€.`, () => {
			expect((() => {}).hasOwnProperty(`prototype`)).toBeFalsy();
			expect(
				{
					getA() {},
				}.getA.hasOwnProperty(`prototype`)
			).toBeFalsy();
		});
	});

	describe(`νλ‘ν νμμ constructor νλ‘νΌν°μ μμ±μ ν¨μ`, () => {
		type Person = {
			new (name: string): Person;
			name: string;
		};

		const Person = function (this: Person, name: string) {
			this.name = name;
		} as unknown as Person;

		test(`β constructor νλ‘νΌν°λ prototype νλ‘νΌν°λ‘ μμ μ μ°Έμ‘°νκ³  μλ μμ±μν¨μλ₯Ό κ°λ¦¬ν¨λ€.`, () => {
			const me = new Person("Heo");

			expect((me as any).__proto__.constructor).toBe(Person);
		});
	});
});
