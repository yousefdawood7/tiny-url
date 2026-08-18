import z from 'zod';

export const zodIssue = function (requiredMsg: string, typeMsg: string) {
  return (issue: { input: unknown }) =>
    issue.input === undefined ? requiredMsg : typeMsg;
};

export const handleZodErrors = function (zodError: z.ZodError<unknown>) {
  const errorObjects: Record<string, string | string[]> = {};

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const fieldErrorsObject = z.flattenError(zodError).fieldErrors as {
    [key: string]: string[];
  };

  for (const key in fieldErrorsObject) {
    errorObjects[key] =
      fieldErrorsObject[key].length > 1
        ? fieldErrorsObject[key]
        : fieldErrorsObject[key][0];
  }

  return { fieldErrors: errorObjects };
};
