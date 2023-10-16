import { SetMetadata } from '@nestjs/common';
import { AuthRole } from '../auth/enum/auth_role.enum';

export const Roles = (...roles: AuthRole[]) => SetMetadata('authRole', roles);
