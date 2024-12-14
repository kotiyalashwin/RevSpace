import zod from "zod";

const formFields = zod.object({
  header: zod.string(),
  message: zod.string(),
  wantVideo: zod.boolean(),
  wantText: zod.boolean(),
  questions: zod.array(zod.string()),
});

const spaceMetadata = zod.object({
  formFields: formFields,
});

export const newSpaceSchema = zod.object({
  spaceName: zod.string(),
  description: zod.string(),
  spaceMetadata: spaceMetadata,
});