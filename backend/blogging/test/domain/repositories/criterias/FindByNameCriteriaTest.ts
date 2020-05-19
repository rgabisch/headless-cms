import {expect} from 'chai';
import FindByNameCriteria from "../../../../src/domain/repositories/criterias/FindByNameCriteria";

const testSubject = new FindByNameCriteria({name: 'a', userId: '1'});
const objectWithSameName = {name: 'a', userId: '1'};
const objectWithOtherName = {name: 'b', userId: '1'};


describe('FindByNameCriteria', () => {
    describe('when match', () => {
        it('with unequal name, it returns false', () => {
            const isMatch = testSubject.matches(objectWithOtherName);

            expect(isMatch).to.be.false;
        });

        it('with equal name, it returns true', () => {
            const isMatch = testSubject.matches(objectWithSameName);

            expect(isMatch).to.be.true;
        });
    })
});