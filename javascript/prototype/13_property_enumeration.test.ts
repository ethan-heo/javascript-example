describe('프로퍼티 열거', () => {
    const person = {
        name: 'Heo',
        address: 'Seoul'
    }

    test(`❓
        모든 프로퍼티를 열거하려면 for-in 문을 사용한다.

        for-in문은 객체의 프로토타입 체인상에 존재하는 모든 프로토타입의 프로퍼티 중에서 
        프로퍼티 어트리뷰트 [[Enumerable]]의 값이 true인 프로퍼티를 순회하며 열거 한다.

        symbol 프로퍼티는 열거하지 않는다.

        상속 받지 않은 프로퍼티만 열거하려면 hasOwnProperty를 사용하면 된다.
        `, () => {
        const checkProps = [['name', 'Heo'], ['address', 'Seoul'], ['age', 20]];

        (person as any).__proto__ = {
            age: 20,
        }

        for(const key in person) {
            const checkProp = checkProps.find(([_key]) => _key === key);

            if (checkProp) {
                expect(checkProp[0]).toBe(key);
                expect(checkProp[1]).toBe(person[key as keyof typeof person]);
            }
        }

        const checkChainingProp = [['age', 20]];
        let isCheck = false;

        for(const key in person) {
            if (person.hasOwnProperty(key) && checkChainingProp.some(([_key]) => _key === key)) {
                isCheck = true;
            }
        }

        expect(isCheck).toBeFalsy();
    })
})
