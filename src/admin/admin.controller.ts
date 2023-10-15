import { Controller, Get, Param, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import {
    GetUserListByPagingAndSearchResType,
    getOtherUserInfoResType,
} from './type/admin_common_service_type';

@Controller('admin')
export class AdminController {
    constructor(private service: AdminService) {}

    @Get('/users')
    async getUserListByPagingAndSearch(
        @Query('page') page: number = 1,
        @Query('cond') cond: string,
        @Query('keyword') keyword: string,
    ): Promise<GetUserListByPagingAndSearchResType> {
        return this.service.getUserListByPagingAndSearch(page, cond, keyword);
    }

    @Get('/user/:userId')
    async getOtherUserInfo(
        @Param('userId') userId: string,
    ): Promise<getOtherUserInfoResType> {
        return this.service.getOtherUserInfo(userId);
    }
}
