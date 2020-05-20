import {assert} from 'chai';
import FindByNameCriteria from "../../../../src/domain/repositories/criterias/FindByNameCriteria";

const userId = '1';
const otherUserId = '2';
const equalId = userId;
const name = 'a';
const unequalName = 'b';
const equalName = name;

const testSubject = new FindByNameCriteria({name, userId});


suite('FindByNameCriteria', () => {

    suite('when verify', () => {
        test('given unequal name, same user id -> it returns false', () => {
            const obj = {name: unequalName, userId: equalId};

            const isMatch = testSubject.matches(obj);

            assert.isFalse(isMatch);
        });

        test('given unequal name, different user id -> it returns false', () => {
            const obj = {name: unequalName, userId: otherUserId};

            const isMatch = testSubject.matches(obj);

            assert.isFalse(isMatch);
        });

        test('given equal name, different user id -> it returns false', () => {
            const obj = {name: equalName, userId: otherUserId};

            const isMatch = testSubject.matches(obj);

            assert.isFalse(isMatch);
        });

        test('given equal name, same user id -> it returns true', () => {
            const obj = {name: equalName, userId: equalId};

            const isMatch = testSubject.matches(obj);

            assert.isTrue(isMatch);
        });
    });

});