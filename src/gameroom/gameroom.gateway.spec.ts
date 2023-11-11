import { Test, TestingModule } from '@nestjs/testing';
import { GameroomGateway } from './gameroom.gateway';

describe('GameroomGateway', () => {
    let gateway: GameroomGateway;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GameroomGateway],
        }).compile();

        gateway = module.get<GameroomGateway>(GameroomGateway);
    });

    it('should be defined', () => {
        expect(gateway).toBeDefined();
    });
});
