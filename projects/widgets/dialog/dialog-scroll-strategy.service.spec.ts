import { IdsDialogScrollStrategyService } from './dialog-scroll-strategy.service';

import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';

describe('IdsDialogScrollStrategyService', () => {
  const blockScrollStrategy = {
    attach: jest.fn(),
    disable: jest.fn(),
    enable: jest.fn(),
  };

  let service: IdsDialogScrollStrategyService;
  let originalBodyOverflow: string;
  let originalHtmlOverflow: string;

  beforeEach(() => {
    originalBodyOverflow = document.body.style.overflow;
    originalHtmlOverflow = document.documentElement.style.overflow;
    blockScrollStrategy.attach.mockClear();
    blockScrollStrategy.disable.mockClear();
    blockScrollStrategy.enable.mockClear();

    TestBed.configureTestingModule({
      providers: [
        IdsDialogScrollStrategyService,
        {
          provide: Overlay,
          useValue: {
            scrollStrategies: {
              block: (): typeof blockScrollStrategy => blockScrollStrategy,
            },
          },
        },
      ],
    });

    service = TestBed.inject(IdsDialogScrollStrategyService);
  });

  afterEach(() => {
    document.body.style.overflow = originalBodyOverflow;
    document.documentElement.style.overflow = originalHtmlOverflow;
  });

  it('uses the CDK block strategy when document scrolling is enabled', () => {
    const strategy = service.create();

    strategy.enable();

    expect(blockScrollStrategy.enable).toHaveBeenCalledTimes(1);

    strategy.disable();

    expect(blockScrollStrategy.disable).toHaveBeenCalledTimes(1);
  });

  it('does not add a second document lock when body scrolling is already blocked', () => {
    document.body.style.overflow = 'hidden';
    const strategy = service.create();

    strategy.enable();

    expect(blockScrollStrategy.enable).not.toHaveBeenCalled();
  });

  it('keeps the document locked until every dialog closes', () => {
    const firstStrategy = service.create();
    const secondStrategy = service.create();

    firstStrategy.enable();
    secondStrategy.enable();
    firstStrategy.disable();

    expect(blockScrollStrategy.enable).toHaveBeenCalledTimes(1);
    expect(blockScrollStrategy.disable).not.toHaveBeenCalled();

    secondStrategy.disable();

    expect(blockScrollStrategy.disable).toHaveBeenCalledTimes(1);
  });
});
