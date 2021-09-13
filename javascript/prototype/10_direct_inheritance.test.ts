describe(`직접 상속`, () => {
    /**
     * Object.create
     * 
     * 명시적으로 프로토타입을 지정하여 새로운 객체를 생성한다.
     * 다른 객체 생성방식과 마찬가지로 OrdinaryObjectCreate을 호출한다.
     */

    type Person = {
        new (name: string): Person;
        name: string;
    }

    test(`❓
        Object.create
    `, () => {
        let obj = Object.create(null);

        // Object.prototype을 상속받지 못함.
        expect(Object.getPrototypeOf(obj)).toBe(null);

        obj = Object.create(Object.prototype);

        expect(Object.getPrototypeOf(obj) === Object.prototype).toBeTruthy();

        obj = Object.create(Object.prototype, {
            x: {
                value: 1,
                writable: true,
                enumerable: true,
                configurable: true,
            }
        })

        expect(obj.x).toBe(1);
        expect(Object.getPrototypeOf(obj) === Object.prototype).toBeTruthy();

        const proto = { x: 10 };

        obj = Object.create(proto);

        expect(obj.x).toBe(10);
        expect(Object.getPrototypeOf(obj) === proto).toBeTruthy();

        const Person = function (this: Person, name: string) {
            this.name = name;
        } as unknown as Person

        obj = Object.create(Person);

        // 예제에서는 obj의 프로퍼티로 name이 사용된 것처럼 되어 있지만
        // 실제는 Function 객체의 name 프로퍼티를 사용함.
        expect(obj.name).toBe('Person');
        expect(Object.getPrototypeOf(obj) === Person).toBeTruthy();
    })

    /**
     * ESLint에서는 Object.prototype의 빌트인 메서드를 객체가 직접 호출하는 것을 권장하지 않는다.
     * 이유는 Object.create 메서드르 통해 프로토타입 체인의 종점에 위치하는 객체를 생성할 수 있기 때문
     */

    test(`❓
        Object.prototype 의 빌드인 메서드 직접 호출 이슈
    `, () => {
        const obj = Object.create(null);

        obj.a = 1;

        expect(Object.getPrototypeOf(obj)).toBe(null);
        expect(() => {
            obj.hasOwnProperty('a')
        }).toThrow(TypeError);
    })

    test(`❓
        Object.prototype 의 빌드인 메서드 직접 호출 이슈 해결

        간접적인 호출방식 사용.
    `, () => {
        const obj = Object.create(null);

        obj.a = 1;

        expect(Object.prototype.hasOwnProperty.call(obj, 'a')).toBeTruthy();
    })

    test(`❓
        __proto__ 접근자 프로퍼티를 사용해 상속하기
    `, () => {
        const myProto = { x: 10 };
        const obj = {
            y: 20,
            __proto__: myProto
        }

        expect((obj as any).x).toBe(10);
        expect(obj.y).toBe(20);
        expect(Object.getPrototypeOf(obj) === myProto).toBeTruthy();
    })    
})