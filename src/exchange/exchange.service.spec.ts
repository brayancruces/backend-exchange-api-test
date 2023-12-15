import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeService } from './exchange.service';

describe('ExchangeService', () => {
  let exchangeService: ExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeService],
    }).compile();

    exchangeService = module.get<ExchangeService>(ExchangeService);
  });

  describe('calculateExchange', () => {
    it('should calculate the exchange', async () => {
      const amount = 20;
      const fromCurrency = 'USD';
      const toCurrency = 'PEN';

      const rate = 3.7765;

      const result = await exchangeService.calculateExchange({amount, from: fromCurrency, to: toCurrency});

      expect(result.original_amount).toBe(amount);
      expect(result.result_amount).toBe(amount * rate);
      expect(result.from).toBe(fromCurrency);
      expect(result.to).toBe(toCurrency);
      expect(result.rate).toBe(rate);
    });
  });

});
