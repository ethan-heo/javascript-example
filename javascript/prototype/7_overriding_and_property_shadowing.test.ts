describe('오버라이딩과 프로퍼티 쉐도잉', () => {
    /**
     * 상속 관계에 의해 프로퍼티가 가려지는 현상을 프로퍼티 쉐도잉 이라고 한다.
     */
    type Person = {
        new (name: string): Person;
        name: string;
        sayHello?: () => string;
    }
    const Person = (function () {
        function Person(this: Person, name: string) {
            this.name = name;
        };

        Person.prototype.sayHello = function () {
            return `Person Hello ${this.name}`;
        }

        return Person as unknown as Person;
    })()


    test(`❓
        Prototype Shadowing
    `, () => {
        const me = new Person('Heo');

        me.sayHello = function () {
            return `Me Hello ${this.name}`;
        }

        expect(me.sayHello()).toBe(`Me Hello Heo`);
    })

    test(`❓
        프로퍼티를 삭제하는 경우도 마찬가지로 동작 한다.
    `, () => {
        const me = new Person('Heo');

        me.sayHello = function () {
            return `Me Hello ${this.name}`;
        }

        delete me.sayHello;

        expect((me as any).sayHello()).toBe(`Person Hello Heo`);
    })

    test(`❓
        하위 객체를 통해 프로토타입의 프로퍼티를 변경 또는 삭제하는 것은 불가능하다.
    `, () => {
        const me = new Person('Heo');

        expect(() => {
            me.prototype.sayHello = function () {}
        }).toThrow(TypeError)

        expect(() => {
            delete me.prototype.sayHello
        }).toThrow(TypeError);
    })

    test(`❓
        변경하거나 삭제하려면 prototype에 직접 접근해야한다.
    `, () => {
        const me = new Person('Heo');

        Person.prototype.sayHello = function () {
            return `Updated Person Hello ${this.name}`
        }

        expect((me as any).sayHello()).toBe(`Updated Person Hello Heo`)

        delete Person.prototype.sayHello;

        expect(() => {
            (me as any).sayHello()
        }).toThrow(TypeError)
    })
})
