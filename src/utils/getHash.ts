import crypto from 'crypto';
import { HashedValue } from '../types/hash.model';

export function getHash<T extends string>(value: T, times = 5000): T & HashedValue {
    if (times <= 0) return "" as T & HashedValue;

    for (let i = 0; i < times; i++) {
        let hashCreator = crypto.createHash('sha256');
        value = hashCreator.update(value).digest('hex') as T;
    }

    return value as T & HashedValue;
}
