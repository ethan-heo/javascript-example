describe('정적 프로퍼티 / 메서드', () => {
    type Person = {
        new (name: string): Person;
        name: string;
        staticProp: string;
        staticMethod(): string;
    }

    test(`❓
        정적 프로퍼티와 메서드

        Person 생성자 함수 객체가 소유한 프로퍼티/메서드를 정적 프로퍼티/메서드 라고 한다.
        인스턴스로는 정적 프로퍼티/메서드를 참조/호출 할 수 없다.

        정적 프로퍼티/메서드는 별도의 인스턴스 생성없이 호출 할 수 있다.
    `, () => {
        const Person =  function(this: Person, name: string) {
            this.name = name;
        } as unknown as Person;

        Person.prototype.sayHello = function () {
            return `Hi! My name is ${this.name}`;
        }

        Person.staticProp = `static prop`;

        Person.staticMethod = function () {
            return `static method`;
        }

        const me = new Person('Heo');

        expect(Person.staticProp).toBe(`static prop`);
        expect(Person.staticMethod()).toBe(`static method`);
        expect(me.staticProp).toBe(undefined);
        expect(() => {
            me.staticMethod()
        }).toThrow(TypeError);
    })
})
