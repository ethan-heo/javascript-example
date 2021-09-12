describe(`📝 프로토타입 객체`, () => {
	describe(`__proto__`, () => {
		test(`❓ __proto__(접근자 프로퍼티)를 통해 자신의 프로토타입에 간접적으로 접근할 수 있다.`, () => {
			/**
			 * 프로토타입은 직접 접근할 수 없다. 그렇기 때문에 __proto__를 통해서 간접적으로
			 * 접근할 수 있다.
			 *
			 * __proto__는 접근자 함수 [[get]], [[set]]으로 이루어진 프로퍼티이다.
			 */
			const obj: any = {
				a: 1,
			};
			expect(obj.__proto__ === Object.prototype).toBeTruthy();
		});

		test(`❓ __proto__를 통해 prototype 재정의를 할 수 있다.`, () => {
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

		test(`❓ __proto__ 접근자는 상속을 통해 사용된다.`, () => {
			const obj: any = {
				a: 1,
			};

			expect(obj.hasOwnProperty(`__proto__`)).toBeFalsy();
			expect(Object.prototype).toBe(obj.__proto__);
		});

		test(`❓ 
            __proto__ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유는 
            상호 참조에 의해 프로톹타입 체인이 생성되는 것을 방지하기 위해서이다.`, () => {
			/**
			 * 프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다. 즉. 순환 참조하는 프로토 타입 체인이
			 * 만들어지면 프로토타입 체인 종점이 존재하지 않기 때문에 무한루프에 빠진다.
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

		test(`❓ 
            __proto__ 접근자 프로퍼티를 코드 내 에서 직접 사용하는 것은 권장하지 않는다. 
            모든 객체가 __proto__ 접근자를 사용하는 것은 아니기 때문이다.`, () => {
			const obj = Object.create(null);

			expect(obj.__proto__).toBeFalsy();
			expect(Object.getPrototypeOf(obj)).toBe(null);
		});

		test(`❓
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

	describe(`함수 객체의 prototype 프로퍼티`, () => {
		test(`❓ 함수 객체는 prototype을 소유한다.`, () => {
			expect(function () {}.hasOwnProperty(`prototype`)).toBeTruthy();
		});

		test(`❓ 화살표 함수, 메서드 함수는 prototype을 소유하지 않으며 생성하지도 않는다.`, () => {
			expect((() => {}).hasOwnProperty(`prototype`)).toBeFalsy();
			expect(
				{
					getA() {},
				}.getA.hasOwnProperty(`prototype`)
			).toBeFalsy();
		});
	});

	describe(`프로토타입의 constructor 프로퍼티와 생성자 함수`, () => {
		type Person = {
			new (name: string): Person;
			name: string;
		};

		const Person = function (this: Person, name: string) {
			this.name = name;
		} as unknown as Person;

		test(`❓ constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자함수를 가리킨다.`, () => {
			const me = new Person("Heo");

			expect((me as any).__proto__.constructor).toBe(Person);
		});
	});
});
