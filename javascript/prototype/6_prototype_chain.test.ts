describe('๐ ํ๋กํ ํ์ ์ฒด์ธ', () => {
    /**
     * ์๋ฐ์คํฌ๋ฆฝํธ๊ฐ ๊ฐ์ฒด์งํฅ ํ๋ก๊ทธ๋๋ฐ์ ์์์ ๊ตฌํํ๋ ๋ฉ์ปค๋์ฆ. ๊ทธ๋ฆฌ๊ณ  ํ์
     */

    describe(`
        ๋ชจ๋  ๊ฐ์ฒด๋ Object.prototype์ ์์๋ฐ๋๋ค.
        Object.prototype์ ํ๋กํ ํ์ ์ฒด์ธ์ ์ข์ ์ด๋ผ๊ณ  ํ๋ค.
        Object.prototype์ prototype์ null์ด๋ค.
    `, () => {

        test(`โ
            ๋ชจ๋  ๊ฐ์ฒด๋ Object.prototype์ ์์ ๋ฐ๋๋ค.
        `, () => {
            expect(Object.getPrototypeOf(Array.prototype) === Object.prototype).toBeTruthy();
            expect(Object.getPrototypeOf(RegExp.prototype) === Object.prototype).toBeTruthy();
            expect(Object.getPrototypeOf(Function.prototype) === Object.prototype).toBeTruthy();
            expect(Object.getPrototypeOf(String.prototype) === Object.prototype).toBeTruthy();
            expect(Object.getPrototypeOf(Number.prototype) === Object.prototype).toBeTruthy();
            expect(Object.getPrototypeOf(Boolean.prototype) === Object.prototype).toBeTruthy();
        })

        test(`โ
            Object.prototype.prototype === null
        `, () => {
            expect(Object.getPrototypeOf(Object.prototype)).toBe(null);
        })
    })

    /**
     * ์ค์ฝํ ์ฒด์ธ์ ์๋ณ์ ๊ฒ์์ ์ํ ๋ฉ์ปค๋์ฆ
     * 
     * ํจ์์ ์ค์ฒฉ๊ด๊ณ๋ก ์ด๋ฃจ์ด์ง ์ค์ฝํ์ ๊ณ์ธต์  ๊ตฌ์กฐ์์ ์๋ณ์๋ฅผ ๊ฒ์.
     * ์๋ก ์ฐ๊ด์์ด ๋ณ๋ ๋์ํ๋ ๊ฒ์ด ์๋๋ผ ์๋ก ํ๋ ฅํ์ฌ ์๋ณ์์ ํ๋กํผํฐ๋ฅผ ๊ฒ์ํ๋๋ฐ ์ฌ์ฉ.
     */
})
