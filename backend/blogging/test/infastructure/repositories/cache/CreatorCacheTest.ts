import {assert} from "chai";
import Creator from "../../../../src/domain/entities/Creator";
import CreatorCache from "../../../../src/infastructure/repositories/cache/CreatorCache";

suite('Creator Cache', () => {

    let cache: CreatorCache;

    setup(() => {
        cache = new CreatorCache();
    });


    suite('add an creator', () => {

        test('given creator when add to an empty cache -> creator gets added', () => {
            const creator = new Creator('1', new Map(), new Map());

            cache.add(creator);

            assert.deepStrictEqual(creator, cache.getBy(creator.id));
        });

        test('given other creator when add to an filled cache -> other creator gets added', () => {
            const creator = new Creator('1', new Map(), new Map());
            const otherCreator = new Creator('2', new Map(), new Map());
            cache.add(creator);

            cache.add(otherCreator);

            assert.deepStrictEqual(otherCreator, cache.getBy(otherCreator.id));
        });

        test('given same creator when add to an filled cache -> creator gets overwritten', () => {
            const creator = new Creator('1', new Map(), new Map());
            cache.add(creator);
            const sameCreator = new Creator('1', new Map(), new Map());

            cache.add(sameCreator);

            assert.deepStrictEqual(sameCreator, cache.getBy(creator.id));
        });

    });

    suite('find an creator', () => {

        test('given empty empty cache when get creator by id -> throw exception', () => {
            let exception;
            try {
                cache.getBy('1');
            } catch (e) {
                exception = e;
            } finally {
                assert.isDefined(exception);
            }
        });

        test('given filled cache when get creator by id -> find creator', () => {
            const creator = new Creator('1', new Map(), new Map());
            cache.add(creator);

            const found = cache.getBy(creator.id);

            assert.deepStrictEqual(found, creator);
        });

    });

    suite('contains an creator', () => {

        test('given empty cache when check if creator exists -> return false', () => {

            const contains = cache.contains('1');

            assert.isFalse(contains);
        });

        test('given filled cache when check with id of a not added creator -> return false', () => {
            cache.add(new Creator('1', new Map(), new Map()));

            const contains = cache.contains('2');

            assert.isFalse(contains);
        });

        test('given filled cache when check with id of an added creator -> return true', () => {
            cache.add(new Creator('1', new Map(), new Map()));

            const contains = cache.contains('1');

            assert.isTrue(contains);
        });

    });

});