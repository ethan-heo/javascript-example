describe(`instanceof`, () => {
    /**
     * instanceof
     * 
     * 우변의 생성자 함수의 prototype에 바인딩된 객체가 좌변의 객체 프로토타입 체인 상에 존재하면
     * true, 그렇지 않으면 false
     */

    type Person = {
        new (name: string): Person;
        name: string;
    }

    const Person = function (this: Person, name: string) {
        this.name = name;
    } as unknown as Person;

    test(`❓
        instanceof
    `, () => {
        const me = new Person('Heo');

        expect(me instanceof Person).toBeTruthy();
        expect(me instanceof Object).toBeTruthy();
    })

    test(`❓
        프로토타입 교체

        생성자 함수의 prototype에 바인딩된 객체가 프로토타입 체인 상에 존재하는지 확인한다.
    `, () => {
        const me = new Person('Heo');
        const parent = {};

        Object.setPrototypeOf(me, parent);
        
        expect(me instanceof Person).toBeFalsy();
        expect(me instanceof Object).toBeTruthy();
    })

    test(`❓
        프로토타입 체인상 존재하기만 한다면 instanceof는 true로 처리.
    `, () => {
        const Person = (function() {
            function Person (this: Person, name: string) {
                this.name = name;
            }

            Person.prototype = {
                sayHello() {
                    return `Hi! My name is ${this.name}`;
                }
            }

            return Person as unknown as Person;
        })()

        const me = new Person('Heo');

        expect(me.constructor === Person).toBeFalsy();
        expect(me instanceof Person).toBeTruthy();
        expect(me instanceof Object).toBeTruthy();
    })
})