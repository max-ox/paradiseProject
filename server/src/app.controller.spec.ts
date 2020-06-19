import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FactionService } from './faction/faction.service';

describe('AppController', () => {
  let appController: AppController;
  let factionService: FactionService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, FactionService],
    }).compile();

    appController = app.get<AppController>(AppController);
    factionService = app.get<FactionService>(FactionService);
  });
  it('should be defined', () => {
    expect(factionService).toBeDefined();
  });


  it('should return array of factions', () => {
    const result = ['test'];
    jest.spyOn(factionService, 'getFactions').mockImplementation(() => result);

    expect(await appController.findAll()).toBe(result);

  });
});
