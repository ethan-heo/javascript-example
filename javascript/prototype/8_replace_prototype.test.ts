describe('프로토타입의 교체', () => {
    /**
     * 프로토타입은 임의의 다른 객체로 변경할 수 있다.
     * 생성자 함수 또는 인스턴스에 의해 교체할 수 있다.
     */

    type Person = {
        new (name: string): Person;
        name: string;
        sayHello?: () => string;
    }

    describe('생성자 함수에 의한 프로토타입의 교체', () => {
        
        const Person = (function () {
            function Person (this: Person, name: string) {
                this.name = name;
            }

            Person.prototype = {
                sayHello() {
                    return `Hi! My name is ${this.name}`
                }
            }

            return Person as unknown as Person;
        })()

        test(`❓
            Person의 프로토타입을 객체로 변경 후 인스턴스의 프로토타입에는 constructor가 생성되어 있지 않음.

            constructor는 프로토타입을 생성할 때 암묵적으로 추가한 프로퍼티이다.
        `, () => {
            const me = new Person('Heo');

            expect(Object.getPrototypeOf(me).hasOwnProperty('constructor')).toBeFalsy();
        })

    })
    
    describe(`인스턴스에 의한 프로토타입의 교체`, () => {
        test(`❓
            프로토타입이 가리키는 객체가 달라진다.
        `, () => {
            const Person = function (this: Person, name: string) {
                this.name = name;
            } as unknown as Person
    
            const me = new Person('Heo');
    
            const parent = {
                sayHello(): string {
                    return `Hi! My name is ${(this as any).name}`;
                }
            }
    
            Object.setPrototypeOf(me, parent);
    
            expect((me as any).sayHello()).toBe(`Hi! My name is Heo`);
    
            expect(Object.getPrototypeOf(me) === Person.prototype).toBeFalsy();
            expect(Object.getPrototypeOf(me) === parent).toBeTruthy();
            expect(Object.getPrototypeOf(me).constructor === Person).toBeFalsy();
            expect(Object.getPrototypeOf(me).constructor === Object).toBeTruthy();
        })
    })
})
