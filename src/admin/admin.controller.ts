import { Controller, Get, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { GetUserListByPagingAndSearchType } from './type/admin_common_service_type';

@Controller('admin')
export class AdminController {
    constructor(private service: AdminService) {}

    @Get('/users')
    async getUserListByPagingAndSearch(
        @Query('page') page: number = 1,
        @Query('cond') cond: string,
        @Query('keyword') keyword: string,
    ): Promise<GetUserListByPagingAndSearchType> {
        return this.service.getUserListByPagingAndSearch(page, cond, keyword);
    }
}
