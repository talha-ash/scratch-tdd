import { Obj } from 'immutes';
import { err, ok } from 'neverthrow';
import * as v from 'valibot';

export const TagSchema = v.object({
    name: v.pipe(v.string(), v.minLength(3), v.maxLength(20)),
});

export type Tag = v.InferInput<typeof TagSchema>;

export function createTag(ingredient: Tag) {
    const result = v.safeParse(TagSchema, ingredient);
    if (result.success) {
        return ok(Obj.newObj(ingredient));
    }
    const flatErrors = v.flatten<typeof TagSchema>(result.issues);
    return err(Obj.newObj(flatErrors.nested!));
}
