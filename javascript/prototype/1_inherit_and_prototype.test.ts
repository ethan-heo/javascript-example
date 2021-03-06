type Circle = {
	new (radius: number): Circle;
	radius: number;
	getArea(): number;
};

describe(`๐จ Circle ์์ฑ์ ํจ์ ๋ด getArea ๋ฉ์๋๋ ๋งค ์ธ์คํด์ค ๋ง๋ค ์์ฑ๋๋ค.`, () => {
	/**
	 * ๋งค๋ฒ ๋์ผํ ๋ฉ์๋๋ฅผ ์ค๋ณต ์์ ํ๋ ๊ฒ์ ๋ฉ๋ชจ๋ฆฌ๋ฅผ ๋ถํ์ํ๊ฒ ๋ญ๋น.
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
		`circle1์ getArea๋ circle2์ getArea์ ๊ฐ์ง ์๋ค.`,
		({ circle1, circle2, expected }) => {
			expect(circle1.getArea === circle2.getArea).toBe(expected);
		}
	);
});

describe(`๐ ํ๋กํ ํ์ ์์์ ํตํด ๊ตฌํํ๋ฉด ๋ถํ์ํ ๋ฉ๋ชจ๋ฆฌ ๋ญ๋น๋ฅผ ๋ง์ ์ ์๋ค.`, () => {
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
		`circle1์ getArea๋ circle2์ getArea์ ๊ฐ๋ค.`,
		({ circle1, circle2, expected }) => {
			expect(circle1.getArea === circle2.getArea).toBe(expected);
		}
	);
});
