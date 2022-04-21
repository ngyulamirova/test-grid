import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ICellRendererParams} from "ag-grid-community";
import {ILoadingOverlayAngularComp} from "ag-grid-angular";

@Component({
  selector: 'vsi-title-template-renderer',
  templateUrl: './title-template-renderer.component.html',
  styleUrls: ['./title-template-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleTemplateRendererComponent implements ILoadingOverlayAngularComp {

    public params!: ICellRendererParams;

    agInit(params: ICellRendererParams): void { this.params = params }

    public openModal = () => this.params.context['openModal'](this.params.value);
}
