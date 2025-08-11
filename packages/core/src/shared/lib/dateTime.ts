import type { DateTimeString } from '../types/common';

export function currentDatetime(): DateTimeString {
    return new Date().toISOString();
}
