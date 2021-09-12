type Circle = {
	new (radius: number): Circle;
	radius: number;
	getArea(): number;
};

describe(`🚨 Circle 생성자 함수 내 getArea 메서드는 매 인스턴스 마다 생성된다.`, () => {
	/**
	 * 매번 동일한 메서드를 중복 소유하는 것은 메모리를 불필요하게 낭비.
	 */
	const Circle = function (this: Circle, radius: number) {
		this.radius = radius;
		this.getArea = function () {
			return Math.PI * this.radius ** 2;
		};
	} as unknown as Circle;

	let circle1 = new Circle(5);
	let circle2 = new Circle(10);

	test.each`
		circle1    | circle2    | expected
		${circle1} | ${circle2} | ${false}
	`(
		`circle1의 getArea는 circle2의 getArea와 같지 않다.`,
		({ circle1, circle2, expected }) => {
			expect(circle1.getArea === circle2.getArea).toBe(expected);
		}
	);
});

describe(`👌 프로토타입 상속을 통해 구현하면 불필요한 메모리 낭비를 막을 수 있다.`, () => {
	const Circle = function (this: Circle, radius: number) {
		this.radius = radius;
	} as unknown as Circle;

	Circle.prototype.getArea = function () {
		return Math.PI * this.radius ** 2;
	};

	let circle1 = new Circle(5);
	let circle2 = new Circle(10);

	test.each`
		circle1    | circle2    | expected
		${circle1} | ${circle2} | ${true}
	`(
		`circle1의 getArea는 circle2의 getArea와 같다.`,
		({ circle1, circle2, expected }) => {
			expect(circle1.getArea === circle2.getArea).toBe(expected);
		}
	);
});
