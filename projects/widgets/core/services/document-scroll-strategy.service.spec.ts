import { IdsDocumentScrollStrategyService } from './document-scroll-strategy.service';

import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';

describe('IdsDocumentScrollStrategyService', () => {
  const blockScrollStrategy = {
    attach: jest.fn(),
    disable: jest.fn(),
    enable: jest.fn(),
  };

  let service: IdsDocumentScrollStrategyService;
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
        IdsDocumentScrollStrategyService,
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

    service = TestBed.inject(IdsDocumentScrollStrategyService);
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

  it('keeps the document locked until every overlay closes', () => {
    const firstStrategy = service.create();
    const secondStrategy = service.create();

    firstStrategy.enable();
    secondStrategy.enable();
    firstStrategy.disable();

    expect(blockScrollStrategy.enable).toHaveBeenCalledTimes(2);
    expect(blockScrollStrategy.disable).not.toHaveBeenCalled();

    secondStrategy.disable();

    expect(blockScrollStrategy.disable).toHaveBeenCalledTimes(1);
  });
});
