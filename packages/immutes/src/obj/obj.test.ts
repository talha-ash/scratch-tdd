import { describe, it, expect } from 'vitest';
import { Obj } from '.';

describe('newObj', () => {
    it('should be empty on empty obj given', () => {
        const obj = Obj.newObj({});
        expect(Object.keys(obj).length).toBe(0);
    });

    it('should be length equal to given initial', () => {
        const obj = Obj.newObj({ a: 10, b: 20 });
        expect(Object.keys(obj).length).toBe(2);
    });
    it('should be strict euqal given initail', () => {
        const obj = Obj.newObj({ a: 10, b: 20 });
        expect(obj).toEqual({ a: 10, b: 20 });
    });

    it('should be instance of given obj', () => {
        let user = { id: 1, name: 'John' };
        const obj = Obj.newObj(user);
        expect(obj == user).toBe(true);
    });
});

describe('set', () => {
    it('update key value in obj', () => {
        const user = Obj.newObj({ id: 10, name: 'john' });

        const newUser = Obj.set(user, 'id', 20);
        expect(newUser.id).toBe(20);
        expect(newUser != user).toBe(true);
    });

    it('throw TypeError on invalid key', () => {
        const user = Obj.newObj({ id: 1, name: 'John' });
        expect(() => Obj.set(user, 'idd' as any, 20)).toThrow(TypeError);
    });
});

describe('setNew', () => {
    it('add new key value in obj', () => {
        const user = Obj.newObj({ id: 10, name: 'john' });

        const newUser = Obj.setNew(user, 'address', { street: 10 });
        expect(newUser.address.street).toBe(10);
        expect(newUser != user).toBe(true);
    });
    it('throw TypeError on mutate new key', () => {
        const user = Obj.newObj({ id: 1, name: 'John' });
        const newUser = Obj.setNew(user, 'address', { street: 10 });
        expect(() => ((newUser.address as any) = 10)).toThrow(TypeError);
    });
});

describe('merge', () => {
    it('add new obj value in obj', () => {
        const user = Obj.newObj({ id: 10, name: 'john' });
        const address = { address: { street: 10 } };
        const newUser = Obj.merge(user, address);
        expect(newUser.address.street).toBe(10);
        expect(newUser != user).toBe(true);
    });
    it('check ref differentiation', () => {
        const user = Obj.newObj({ id: 10, name: 'john' });
        const address = { address: { street: { name: 'will' } } };
        const newUser = Obj.merge(user, address);
        const updatedNewUser = Obj.updateByPath(newUser, ['address', 'street', 'name'], 'cloud');
        expect(updatedNewUser == newUser).toBe(false);
        expect(updatedNewUser.address == newUser.address).toBe(false);
        expect(updatedNewUser.address.street == newUser.address.street).toBe(false);
        expect(updatedNewUser.address.street.name).toBe('cloud');
    });
    it('throw TypeError on mutate new key', () => {
        const user = Obj.newObj({ id: 1, name: 'John' });
        const newUser = Obj.setNew(user, 'address', { street: 10 });
        expect(() => ((newUser.address as any) = 10)).toThrow(TypeError);
    });
});
describe('deleteKey', () => {
    it('delete key from obj', () => {
        const user = Obj.newObj({ id: 10, name: 'john' });
        let aa = Obj.deleteKey(user, 'name');
        expect(Obj.deleteKey(user, 'name')).toEqual({ id: 10 });
    });
    it('ignore delete invalid key from obj ', () => {
        const user = Obj.newObj({ id: 10, name: 'john' });
        expect(Obj.deleteKey(user, 'namee' as any)).toEqual({ id: 10, name: 'john' });
    });
});
describe('deleteKeyByPath', () => {
    it('delete nested key from obj', () => {
        const user = Obj.newObj({ id: 10, name: 'john' });
        const address = { address: { street: 10 } };
        const newUser = Obj.merge(user, address);
        const afterDeleteStreetKey = Obj.deleteKeyByPath(newUser, ['address', 'street']);
        expect(afterDeleteStreetKey.address.street).toBe(undefined);
    });
});
