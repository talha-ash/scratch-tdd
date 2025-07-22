import { describe, expect, it } from 'vitest';
import { List } from '.';

describe('newList', () => {
    it('should be empty on empty array given', () => {
        const list = List.newList([]);
        expect(list.length).toBe(0);
    });

    it('should be length equal to given initial', () => {
        const list = List.newList([1, 2, 3, 4]);
        expect(list.length).toBe(4);
    });
    it('should be strict euqal given initail', () => {
        const list = List.newList([1, 2, 3, 4]);
        expect(list).toEqual([1, 2, 3, 4]);
    });
});
describe('push', () => {
    it('add the elements to the end of the list', function () {
        expect(List.push(['x', 'y'], 'z')).toEqual(['x', 'y', 'z']);
        expect(List.push(['a', 'z'], 'x', 'y')).toEqual(['a', 'z', 'x', 'y']);
    });

    it('works on empty list', function () {
        expect(List.push([], 1)).toEqual([1]);
    });
});
describe('pop', () => {
    it('remove the last elements from the  list', function () {
        const [popValue, list] = List.pop(['x', 'y']);

        expect(popValue).toEqual('y');
        expect(list).toEqual(['x']);
    });

    it('works on empty list', function () {
        const [popValue, list] = List.pop([]);

        expect(popValue).toEqual(undefined);
        expect(list).toEqual([]);
    });
});

describe('shift', () => {
    it('remove the start elements from the  list', function () {
        const [shiftValue, list] = List.shift(['x', 'y']);

        expect(shiftValue).toEqual('x');
        expect(list).toEqual(['y']);
    });

    it('works on empty list', function () {
        const [shiftValue, list] = List.shift([]);

        expect(shiftValue).toEqual(undefined);
        expect(list).toEqual([]);
    });
});

describe('unshift', () => {
    it('add the elements to the start of the list', function () {
        expect(List.unshift(['x', 'y'], 'z')).toEqual(['z', 'x', 'y']);
        expect(List.unshift(['a', 'z'], 'x', 'y')).toEqual(['x', 'y', 'a', 'z']);
    });

    it('works on empty list', function () {
        expect(List.unshift([], 1)).toEqual([1]);
    });
});

describe('map', () => {
    it('multiply by 2', function () {
        expect(List.map([1, 2, 3, 4, 5], (x) => x * 2)).toEqual([2, 4, 6, 8, 10]);
    });

    it('throws a TypeError on null and undefined', function () {
        expect(() => List.map([1, 2, 3, 4, 5], null as any)).toThrow(TypeError);
        expect(() => List.map([1, 2, 3, 4, 5], undefined as any)).toThrow(TypeError);
    });
});

describe('filter', () => {
    it('filter multiple of 2', function () {
        expect(List.filter([1, 2, 3, 4, 5], (x) => x % 2 === 0)).toEqual([2, 4]);
    });

    it('throws a TypeError on null and undefined', function () {
        expect(() => List.filter([1, 2, 3, 4, 5], null as any)).toThrow(TypeError);
        expect(() => List.filter([1, 2, 3, 4, 5], undefined as any)).toThrow(TypeError);
    });
});

describe('reduce', () => {
    it('reduce to sum', function () {
        expect(List.reduce([1, 2, 3, 4, 5], (acc, x) => acc + x)).toEqual(15);
    });
    it('reduce to users names', function () {
        const users = [
            { id: 1, name: 'john' },
            { id: 2, name: 'adam' },
            { id: 3, name: 'will' },
        ];

        expect(List.reduce(users, (acc, x) => acc + x.name, '' as string)).toEqual('johnadamwill');
    });
    it('not effect initial value', function () {
        const users = [
            { id: 1, name: 'john' },
            { id: 2, name: 'adam' },
            { id: 3, name: 'will' },
        ];

        const user = { id: 4, name: 'sam' };

        const result = List.reduce(
            users,
            (acc, x) => {
                acc.name = x.name;
                return acc;
            },
            user,
        );
        expect(result).toEqual({ id: 4, name: 'will' });
        expect(result == user).toBe(false);
    });

    it('throws a TypeError on null and undefined', function () {
        expect(() => List.reduce([1, 2, 3, 4, 5], null as any)).toThrow(TypeError);
        expect(() => List.reduce([1, 2, 3, 4, 5], undefined as any)).toThrow(TypeError);
    });
});

describe('concat', () => {
    it('concat 2 list', function () {
        expect(List.concat([1, 2, 3, 4, 5], [2, 4])).toEqual([1, 2, 3, 4, 5, 2, 4]);
    });
    it('concat list with rest params lists', function () {
        expect(List.concat([1, 2, 3, 4, 5], [2, 4], [9, 0])).toEqual([1, 2, 3, 4, 5, 2, 4, 9, 0]);
    });
    it('concat list with rest params lists', function () {
        expect(() => List.concat([1, 2, 3, 4, 5], null as any)).toThrow();
    });
});

describe('updateAtIndex', () => {
    it('update user object', function () {
        const users = [
            { id: 1, name: 'john' },
            { id: 2, name: 'adam' },
            { id: 3, name: 'will' },
        ];

        const newUsers = List.concat(users, [{ id: 4, name: 'willer' }]);

        const afterUserAdded = List.updateAtIndex(newUsers, 3, { id: 4, name: 'sam' });
        expect(afterUserAdded).toEqual([
            { id: 1, name: 'john' },
            { id: 2, name: 'adam' },
            { id: 3, name: 'will' },
            { id: 4, name: 'sam' },
        ]);
        expect(afterUserAdded != newUsers).toBe(true);
        expect(List.updateAtIndex(newUsers, 4, { id: 4, name: 'sam' })).toEqual([
            { id: 1, name: 'john' },
            { id: 2, name: 'adam' },
            { id: 3, name: 'will' },
            { id: 4, name: 'willer' },
            { id: 4, name: 'sam' },
        ]);
    });
});

describe('insertAtIndex', () => {
    it('insert user object', function () {
        const users = [
            { id: 1, name: 'john' },
            { id: 2, name: 'adam' },
            { id: 3, name: 'will' },
        ];

        const newUsers = List.concat(users, [{ id: 4, name: 'willer' }]);

        const afterUserAdded = List.insertAtIndex(newUsers, 1, { id: 5, name: 'sam' });
        expect(afterUserAdded).toEqual([
            { id: 1, name: 'john' },
            { id: 5, name: 'sam' },
            { id: 2, name: 'adam' },
            { id: 3, name: 'will' },
            { id: 4, name: 'willer' },
        ]);
        expect(afterUserAdded != newUsers).toBe(true);

        expect(List.insertAtIndex(newUsers, 4, { id: 5, name: 'sam' })).toEqual([
            { id: 1, name: 'john' },
            { id: 2, name: 'adam' },
            { id: 3, name: 'will' },
            { id: 4, name: 'willer' },
            { id: 5, name: 'sam' },
        ]);
        expect(afterUserAdded != newUsers).toBe(true);
    });
});
describe('remveByIndex', () => {
    it('remove user by index', function () {
        const users = [
            { id: 1, name: 'john' },
            { id: 2, name: 'adam' },
            { id: 3, name: 'will' },
        ];

        const afterUserAdded = List.removeByIndex(users, 1);
        expect(afterUserAdded).toEqual([
            { id: 1, name: 'john' },
            { id: 3, name: 'will' },
        ]);

        expect(List.removeByIndex(afterUserAdded, 1)).toEqual([{ id: 1, name: 'john' }]);
    });
});

describe('updateByKey', () => {
    it('find and update user by key', function () {
        const users = [
            { id: 1, name: 'john' },
            { id: 2, name: 'adam' },
            { id: 3, name: 'will' },
        ];

        const afterUserAdded = List.updateByKey(users, 'name', 'john', { id: 1, name: 'lala' });
        expect(afterUserAdded).toEqual([
            { id: 1, name: 'lala' },
            { id: 2, name: 'adam' },
            { id: 3, name: 'will' },
        ]);
    });
});

describe('delete', () => {
    it('find and delete user by key', function () {
        const users = [
            { id: 1, name: 'john' },
            { id: 2, name: 'adam' },
            { id: 3, name: 'will' },
        ];

        const afterUserAdded = List.deleteByKey(users, 'name', 'john');
        expect(afterUserAdded).toEqual([
            { id: 2, name: 'adam' },
            { id: 3, name: 'will' },
        ]);
    });
});
