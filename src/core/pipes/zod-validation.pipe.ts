import { BadRequestException } from '@nestjs/common';
import { createZodValidationPipe } from 'nestjs-zod';
import { z } from 'zod';
import { handleZodErrors } from '../../utils/zod-utils';

export const ZodValidationPipe = createZodValidationPipe({
  createValidationException: (error: unknown) =>
    new BadRequestException({ details: handleZodErrors(error as z.ZodError) }),
});
