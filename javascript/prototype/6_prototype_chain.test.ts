describe('📝 프로토타입 체인', () => {
    /**
     * 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 메커니즘. 그리고 탐색
     */

    describe(`
        모든 객체는 Object.prototype을 상속받는다.
        Object.prototype을 프로토타입 체인의 종점이라고 한다.
        Object.prototype의 prototype은 null이다.
    `, () => {

        test(`❓
            모든 객체는 Object.prototype을 상속 받는다.
        `, () => {
            expect(Object.getPrototypeOf(Array.prototype) === Object.prototype).toBeTruthy();
            expect(Object.getPrototypeOf(RegExp.prototype) === Object.prototype).toBeTruthy();
            expect(Object.getPrototypeOf(Function.prototype) === Object.prototype).toBeTruthy();
            expect(Object.getPrototypeOf(String.prototype) === Object.prototype).toBeTruthy();
            expect(Object.getPrototypeOf(Number.prototype) === Object.prototype).toBeTruthy();
            expect(Object.getPrototypeOf(Boolean.prototype) === Object.prototype).toBeTruthy();
        })

        test(`❓
            Object.prototype.prototype === null
        `, () => {
            expect(Object.getPrototypeOf(Object.prototype)).toBe(null);
        })
    })

    /**
     * 스코프 체인은 식별자 검색을 위한 메커니즘
     * 
     * 함수의 중첩관계로 이루어진 스코프의 계층적 구조에서 식별자를 검색.
     * 서로 연관없이 별도 동작하는 것이 아니라 서로 협력하여 식별자와 프로퍼티를 검색하는데 사용.
     */
})
