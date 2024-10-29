import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, InjectionToken, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_DIALOG_DEFAULT_CONFIG_FACTORY, IdsCustomDialogBase, IdsDialogComponent, IdsDialogHeaderDirective, IdsDialogService } from '@i-cell/ids-angular/dialog';
import { TranslateModule } from '@ngx-translate/core';

export const CUSTOM_DIALOG_TOKEN = new InjectionToken<string>('ids-custom-dialog-token');

const defaultConfig = IDS_DIALOG_DEFAULT_CONFIG_FACTORY();

type DialogInputControls = {
  size: IdsSizeType,
  mainTitle: string,
  subTitle: string,
  showCloseButton: boolean,
  showBackdrop: boolean,
};

type DialogHelperControls = {
  useCustomHeader: boolean,
  useLongContent: boolean,
};

@Component({
  selector: 'app-custom-dialog',
  imports: [
    IdsButtonComponent,
    IdsDialogComponent,
    IdsDialogHeaderDirective,
  ],
  template: `
    @let controls = model();
    @let helperControls = helperModel();
    <dialog
      #dialogDynamic="idsDialog"
      idsDialog
      [size]="controls!.size"
      [mainTitle]="controls!.mainTitle"
      [subTitle]="controls!.subTitle"
      [showCloseButton]="controls!.showCloseButton"
      [showBackdrop]="controls!.showBackdrop"
    >
      @if (helperControls!.useCustomHeader) {
        <div *idsDialogHeader>
          <h2>This is a custom header!</h2>
        </div>
      }  
      <div idsDialogContent class="flex flex-col gap-3">
      @if (helperControls!.useLongContent) {
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio molestias illo tempore quo quod unde ipsa fugit nihil placeat
              dicta eius sit nemo obcaecati soluta nam ea nobis, minima asperiores! Nostrum culpa necessitatibus ratione minima voluptatum
              magnam porro optio veniam velit hic aliquid neque, eius corrupti expedita pariatur ab quos adipisci rem aut libero obcaecati
              sunt. Debitis, minima. Eligendi, ut. Dolorem, fugit error sit a quae, ex quibusdam fugiat dolore corporis animi velit, iste
              beatae nemo at voluptatibus officiis ullam? Nemo quia labore fuga sapiente provident quibusdam veniam laborum dolorem. Cum
              excepturi consectetur beatae laudantium blanditiis vero consequatur! Corporis ipsum officiis in repellendus dolorum vero,
              possimus tenetur facilis. Voluptatum, deserunt quis. Omnis natus blanditiis vitae, nam earum quo dignissimos illo? Ipsum vitae
              natus sapiente, quisquam tempore fugiat quo provident, numquam neque iure voluptas voluptates inventore magnam similique.
              Perspiciatis non quos ea, quis laboriosam dolore incidunt, corporis quod iure harum rerum? Cumque animi optio accusamus nulla
              cum consequuntur impedit iure. Nobis vero culpa dignissimos animi nulla. Cumque magnam laborum rerum veritatis at fugit
              tempore molestiae sed nesciunt unde! Commodi, earum odit? Saepe quos, sequi a soluta labore voluptates earum iure repellendus?
              Nihil non amet, quisquam soluta odit tempore eos accusantium! Officia sint amet voluptatibus perferendis labore! Ut dolor rem
              distinctio aliquid? Velit exercitationem animi alias minus dignissimos reiciendis atque quia non. Ea aliquid porro vel laborum
              soluta, aspernatur eum harum dicta voluptatum perferendis libero ex error distinctio eos odit placeat quidem? Quas modi fuga
              laudantium quasi repellendus porro voluptate, magni culpa, ipsum nemo et minus atque a cupiditate consequatur voluptatibus!
              Ipsam soluta modi sed veniam quam aspernatur ratione pariatur blanditiis vel. Minus accusamus est dolorem excepturi provident
              molestias distinctio iusto aspernatur vel odio unde delectus enim fugiat, officia magni laborum, quia voluptatibus,
              repellendus vero. Aut, aperiam? Ratione inventore aspernatur dolor amet! Eos, praesentium non expedita illo alias ullam
              voluptas pariatur, quia voluptates aut libero assumenda est laborum veniam placeat quidem sequi vitae minima, doloribus ea
              sunt ratione! Saepe maxime ab qui! Nobis eum odit fuga inventore doloribus modi ab a nesciunt rerum earum praesentium,
              repudiandae minus pariatur laborum, obcaecati voluptas vel cum? Aliquid deleniti dignissimos delectus modi quibusdam unde
              impedit laudantium. Ut, excepturi? Fugiat ab doloremque molestiae dicta assumenda aperiam numquam itaque odio omnis deleniti.
              Quam corporis numquam minus et dicta praesentium tempore esse placeat deleniti quia, aperiam, beatae dolorem commodi.
              Provident, similique? Corrupti, vitae officiis optio fuga distinctio error aperiam esse doloribus et molestias nihil sequi
              quam repellendus repudiandae quos voluptatem similique laboriosam ex id facere animi placeat unde maxime. Dolorum, suscipit
              culpa? Eligendi, voluptates. Accusantium atque officia laboriosam impedit vero architecto et deserunt beatae fuga facere
              delectus quas mollitia suscipit, nihil veniam reiciendis consectetur, alias libero? Ratione, numquam repellat! Eveniet
              inventore distinctio quasi quisquam. Suscipit nobis minus exercitationem dolores nam accusamus voluptatem, eaque temporibus
              doloremque distinctio neque nisi aliquid fuga! Labore ullam animi accusantium rem adipisci laudantium ratione magni? Libero
              laborum hic deserunt eius modi neque commodi nostrum id! Illum voluptatem minus unde error ea repellendus fuga, mollitia
              quisquam ipsum omnis itaque eligendi in id. Quasi fugit quos earum. Consectetur culpa voluptates saepe qui, illo nulla ut
              repudiandae distinctio exercitationem nihil dolor esse! Obcaecati quisquam perspiciatis rerum dolore minus sint officia ipsum
              doloribus voluptates quod facilis, laboriosam tempore nostrum. Soluta nam architecto doloribus ipsum. Ad aut illo,
              voluptatibus nobis aliquam maxime qui! Quos dicta sint quidem voluptates ipsa error aspernatur quae accusantium delectus.
              Voluptatibus hic nulla maxime quibusdam qui. Quis non incidunt, iusto est illum maxime amet laboriosam quibusdam consectetur,
              maiores minus rerum neque doloribus adipisci ducimus quasi repellendus eos praesentium? Consequuntur molestias possimus ipsum
              animi omnis quisquam quia! Voluptatum a harum incidunt, cum voluptatibus dolor magnam recusandae, accusamus, impedit enim
              itaque obcaecati amet earum corporis quasi doloribus pariatur. Eos qui praesentium sed? Omnis dolores eum nulla doloribus non.
              Veritatis corporis ducimus consequatur reiciendis architecto tempora deleniti ratione accusamus pariatur libero voluptates
              repellendus, sapiente nisi commodi dicta asperiores quasi corrupti! Blanditiis repellat nam vitae fuga, praesentium
              dignissimos minus tenetur. Autem nam veritatis repellat temporibus perferendis blanditiis illum fugiat repellendus. Possimus,
              ducimus eum ipsum adipisci minima corrupti deserunt sunt molestiae. Est earum explicabo voluptates delectus dolor quas
              asperiores sit libero? Voluptatem, in! Praesentium suscipit rem placeat cum necessitatibus. Modi accusamus velit corporis
              praesentium. Consectetur voluptatem illum, reiciendis in, libero labore nesciunt quia ratione doloribus aliquid fugit a unde
              eligendi delectus? Voluptatibus dolor blanditiis eveniet quidem consequatur, a modi sit quis provident molestias pariatur
              necessitatibus assumenda in tempora veniam corporis! Id maiores iusto accusamus quidem qui, quasi quibusdam vitae iure magnam.
              Laboriosam sit quo tempore beatae, voluptas necessitatibus nihil eligendi id cum expedita, vel explicabo neque accusamus? Qui
              perspiciatis dolores mollitia voluptates. Adipisci laboriosam possimus praesentium mollitia minus amet ipsum placeat! Ducimus
              at nihil illo eaque voluptas? Doloribus similique, eius, exercitationem deleniti dolorem est pariatur maxime quasi libero,
              odio dolores nesciunt ipsa optio suscipit minus cupiditate maiores. Porro asperiores quo neque. Quisquam, praesentium veniam.
              Earum temporibus maxime aliquam possimus. Id unde ex quam, eligendi itaque quibusdam saepe laborum rerum vel modi repellendus
              asperiores temporibus non consequatur, iste dignissimos, esse sed accusamus. Corrupti quam molestias cumque voluptates
              praesentium doloremque repudiandae amet doloribus excepturi molestiae ea dolor obcaecati omnis nesciunt, error reprehenderit
              minus veniam vitae rem et voluptas, necessitatibus ut. Doloribus, et quos. Sint velit odio doloribus delectus fugit commodi
              nemo vel? Nam sequi nisi, mollitia ea similique vero perspiciatis aliquid, repellendus vel illum omnis non! Eos nulla, quaerat
              dolorem libero molestias beatae? Corrupti voluptatum eligendi aliquid quas iure amet a ullam perspiciatis velit soluta. Dicta
              earum amet sunt reiciendis corrupti, vitae vero porro assumenda molestias nihil dolore aspernatur repellat neque eos
              voluptatem! Commodi corporis odio officiis ullam sit dolorem illo voluptatum alias similique sequi id ducimus, amet debitis
              dolorum ipsa minus fugiat ipsam dolor consequatur consectetur vitae. Officiis totam sed modi ex. Nobis veniam commodi hic,
              nulla quam ipsam qui! Modi facilis adipisci reprehenderit, consequatur dolore fuga nihil facere ipsa corporis doloremque a
              quas quia sit error, autem qui possimus omnis odio. Mollitia ipsa maiores dolore deleniti, voluptatum dignissimos beatae vero
              dolor repellendus dolores impedit laboriosam ratione eveniet earum quas voluptate ex tenetur. Nisi nobis enim voluptatum
              architecto blanditiis quaerat odit saepe? Reiciendis harum, nihil quibusdam voluptates tenetur fugit iure hic, nam itaque,
              eveniet officia asperiores odit. Rerum esse architecto, velit perspiciatis corrupti cumque, dolore recusandae et accusantium,
              minus debitis in unde! Cupiditate distinctio cumque quisquam culpa aliquid blanditiis esse, suscipit porro vitae dicta sed
              corrupti accusamus molestias libero enim unde placeat ut iusto non cum obcaecati commodi eligendi, laborum ducimus? Quia. Quod
              obcaecati, sequi aliquid dolore, vero consequatur ratione unde est, ex laudantium ducimus recusandae. Reprehenderit at, fugiat
              non fuga, cumque vel necessitatibus quas sunt optio modi a, accusantium omnis facere? Ratione, libero! Voluptatem doloremque
              culpa explicabo distinctio asperiores non ab accusantium deleniti voluptatibus, maxime quas odit fugit vitae eveniet tempora
              consequuntur officiis error esse ad numquam, rem nihil, harum commodi? Perferendis architecto placeat pariatur corporis,
              voluptatibus provident maxime praesentium, molestiae perspiciatis nemo incidunt nostrum eaque non velit, nihil nam facere quos
              suscipit at! Ducimus laudantium quia vel ullam sit amet. Quaerat reprehenderit, voluptate ratione suscipit debitis earum rerum
              neque pariatur at ullam doloribus modi laboriosam sit, rem error accusamus deserunt deleniti. Provident ad, libero iste
              similique unde explicabo consectetur magni. Est rem animi perspiciatis ex similique eaque impedit sapiente quod et, dolorum
              consequatur quos quam eum quibusdam ea perferendis? Earum perspiciatis, voluptatum accusantium sequi illo error minus sed
              totam nulla. Animi odio exercitationem natus alias a laboriosam nobis sequi velit ab rem, dicta, quos et deserunt commodi
              aperiam voluptate tempora voluptatem ipsam provident consequuntur impedit esse amet. Dolores, at molestias! Ipsa sunt vitae
              mollitia tempora laborum voluptates incidunt officiis provident neque omnis, labore iure, reprehenderit sapiente fuga saepe
              minima maxime? Repellat laboriosam quod nostrum itaque ratione ipsa, consectetur deserunt animi! Modi magnam mollitia quod
              molestiae necessitatibus voluptates cumque ea nam! Cupiditate, nisi voluptatibus porro neque quis error! Obcaecati enim at a
              dignissimos veniam placeat dolor nemo sint eligendi voluptatum. Modi. Quibusdam at nulla nemo, molestiae enim laborum dolores
              reprehenderit aliquid, nobis consectetur impedit qui repellendus culpa amet excepturi dignissimos labore! Optio atque laborum
              hic. Ipsa consectetur minus praesentium atque tenetur! Quia tenetur esse, delectus vel aliquid libero, a iure assumenda
              cupiditate iusto nulla repellat consectetur, animi magni porro officia placeat earum ipsum velit sint provident. Facere eos
              ullam ab quae? Voluptatibus ullam ipsam corporis a nobis quaerat aliquam eum asperiores numquam? Expedita inventore iusto non
              debitis quia minima iste aperiam odit iure maxime rem, atque vel placeat eligendi ab dolorem! Ullam error et placeat facere
              provident aut odio vel veritatis maxime dolor distinctio minus fugiat atque quo labore, nemo, quibusdam nesciunt ipsum,
              dolorum non corrupti reiciendis rerum. Id, quam aut! Laboriosam atque rem aperiam illo, dignissimos suscipit quis perferendis
              at minima dolorem dolor pariatur, corporis a eaque! Harum est nobis commodi non, nisi consectetur facilis. Voluptas magni
              doloribus asperiores incidunt! Iure doloremque placeat fugit sit. Molestiae eaque veritatis dolorem recusandae neque totam,
              sit voluptate culpa dolores dolore nobis iusto inventore, dignissimos expedita assumenda provident facilis hic, autem soluta
              magni ut.
            </p>
          } @else {
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac suscipit neque. Suspendisse ultrices quam eu venenatis
              ultricies. Mauris vehicula arcu ac elementum laoreet. Nam eleifend mauris quis lorem laoreet rutrum. Pellentesque facilisis
              turpis id gravida ullamcorper. Nam ultrices nulla nec dolor consectetur, condimentum molestie ipsum vestibulum. Vestibulum
              eget rhoncus felis.
            </p>
          }

        <p>Provided data: {{ providedData }}</p>
        <p>Data from input binding: {{ inputData() }}</p>
      </div>
      <div idsDialogActions class="flex flex-row items-end gap-2">
        <button
          type="button"
          idsButton
          appearance="filled"
          size="comfortable"
          variant="primary"
          (click)="close('some payload')"
        >
          OK
        </button>
      </div>
    </dialog>
  `,
  standalone: true,
})
export class CustomDialogComponent extends IdsCustomDialogBase {
  public providedData = inject(CUSTOM_DIALOG_TOKEN);
  public inputData = input('');
  public model = input<DialogInputControls>();
  public helperModel = input<DialogHelperControls>();
}

@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [
    TryoutComponent,
    ControlTableComponent,
    CustomDialogComponent,
    IdsButtonComponent,
    IdsDialogComponent,
    IdsDialogHeaderDirective,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './dialog-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './dialog-demo.component.scss',
  ],
})
export class DialogDemoComponent {
  protected _inputControlConfig: DemoControlConfig<DialogInputControls> = {
    size: {
      description: 'Dialog size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
    },
    mainTitle: {
      description: 'Dialog main title.',
      type: 'string',
      default: '-',
      demoDefault: 'Dialog main title',
    },
    subTitle: {
      description: 'Dialog sub title.',
      type: 'string',
      default: '-',
      demoDefault: 'Dialog sub title',
    },
    showCloseButton: {
      description: 'Whether to show close button or not.',
      type: 'boolean',
      default: defaultConfig.showCloseButton,
      control: 'checkbox',
    },
    showBackdrop: {
      description: 'Whether to show dialog backdrop or not.',
      type: 'boolean',
      default: defaultConfig.showBackdrop,
      control: 'checkbox',
    },
  };

  protected _helperControlConfig: DemoControlConfig<DialogHelperControls> = {
    useCustomHeader: {
      description: 'Whether to use custom header or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
    useLongContent: {
      description: 'Whether to use long content or not. This is for testing scrollable content.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
  };

  public defaults = getDefaultFromDemoConfig<DialogInputControls>(this._inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<DialogHelperControls>(this._helperControlConfig);

  public model: DialogInputControls = { ...this.defaults };
  public helperModel: DialogHelperControls = { ...this.helperDefaults };

  private _dialogService = inject(IdsDialogService);

  public onOkButtonClick(payload: unknown): void {
    // eslint-disable-next-line no-console
    console.log('Ok button clicked; payload:', payload);
  }

  public onCancelButtonClick(): void {
    // eslint-disable-next-line no-console
    console.log('Cancel button clicked');
  }

  public openCustomDialog(): void {
    this._dialogService.open(CustomDialogComponent, {
      providers: [{ provide: CUSTOM_DIALOG_TOKEN, useValue: 'This text is provided with an InjectionToken' }],
      inputs: {
        inputData: 'This text is provided using input binding',
        model: this.model,
        helperModel: this.helperModel,
      },
    }).subscribe((result) => console.info('Dialog result:', result));
  }

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
  }
}
