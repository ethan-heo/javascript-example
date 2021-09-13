describe('특정 프로퍼티가 존재하는지 여부를 확인한다.', () => {
    test(`❓
        in
    `, () => {
        const person = {
            name: 'Heo',
            address: 'Seoul',
        }

        expect('name' in person).toBeTruthy();
        expect('address' in person).toBeTruthy();
        expect('age' in person).toBeFalsy();

        expect('toString' in person).toBeTruthy();
    })

    test(`❓
        Reflect.has
    `, () => {
        const person = {
            name: 'Heo',
            address: 'Seoul',
        }

        expect(Reflect.has(person, 'name')).toBeTruthy();
        expect(Reflect.has(person, 'address')).toBeTruthy();
        expect(Reflect.has(person, 'age')).toBeFalsy();

        expect(Reflect.has(person, 'toString')).toBeTruthy();
    })

    test(`❓
        hasOwnProperty

        인수로 전달 받은 프로퍼티 객체만 확인. 상속받은 프로퍼티인 경우 체크 안함.
    `, () => {
        const person = {
            name: 'Heo',
            address: 'Seoul',
        }

        expect(person.hasOwnProperty('name')).toBeTruthy();
        expect(person.hasOwnProperty('address')).toBeTruthy();
        expect(person.hasOwnProperty('age')).toBeFalsy();

        expect(person.hasOwnProperty('toString')).toBeFalsy();
    })
})
