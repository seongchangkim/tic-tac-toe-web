import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Query,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
    GetUserListByPagingAndSearchResType,
    GetOtherUserInfoResType,
    EditOtherUserResType,
} from './type/admin_common_service_type';
import { UserEditReqDto } from './user_edit.dto';
import { RolesGuard } from './guard/roles.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Roles } from './roles.decorator';
import { AuthRole } from '../auth/enum/auth_role.enum';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
    constructor(private service: AdminService) {}

    @Get('/users')
    @Roles(AuthRole.ADMIN)
    async getUserListByPagingAndSearch(
        @Query('page') page: number = 1,
        @Query('cond') cond: string,
        @Query('keyword') keyword: string,
    ): Promise<GetUserListByPagingAndSearchResType> {
        return this.service.getUserListByPagingAndSearch(page, cond, keyword);
    }

    @Get('/user/:userId')
    @Roles(AuthRole.ADMIN)
    async getOtherUserInfo(
        @Param('userId') userId: string,
    ): Promise<GetOtherUserInfoResType> {
        return this.service.getOtherUserInfo(userId);
    }

    @Patch('/user/:userId')
    @Roles(AuthRole.ADMIN)
    async editOtherUser(
        @Body(ValidationPipe) req: UserEditReqDto,
        @Param('userId') userId: string,
    ): Promise<EditOtherUserResType> {
        return this.service.editOtherUser(req, userId);
    }
}
