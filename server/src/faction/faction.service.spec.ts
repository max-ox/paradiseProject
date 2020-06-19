import { Test, TestingModule } from '@nestjs/testing';
import { FactionService } from './faction.service';

describe('FactionService', () => {
  let service: FactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactionService],
    }).compile();

    service = module.get<FactionService>(FactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should return array of factions', () => {
    const result = ['test'];
    jest.spyOn(service, 'getFactions').mockImplementation(() => result);

    expect(await catsController.findAll()).toBe(result);

  });
});
