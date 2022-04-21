import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { GridService } from './config.service';
import { TitleTemplateRendererComponent } from './render/title-template-renderer/title-template-renderer.component';
import { finalize, Observable, tap } from 'rxjs';
import { SpinnerRendererComponent } from './render/spinner-renderer/spinner-renderer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  cellParams = {rowHeight: 57, columnWidth: 196};
  allData$?: Observable<any>;
  selected?: any;
  selectedId: any;
  openModalFlag = false;
  selectedValue = '';
  gridOptions: GridOptions = {
    rowHeight: this.cellParams.rowHeight,
    headerHeight: this.cellParams.rowHeight,
    context: this,
    overlayNoRowsTemplate: 'Ничего не найдено',
    animateRows: true,
    loadingOverlayComponent: SpinnerRendererComponent,
    getRowNodeId: (params) => params.specialLoginId,
    defaultColDef: {
      sortable: true,
      suppressMovable: true,
      cellStyle: (params) => {
        return params.rowIndex % 2 === 0 ? {color: 'yellow', backgroundColor: 'green'} : {color: 'black', backgroundColor: 'white'};
      },
    },
    columnDefs: [
      {
        headerName: 'Title',
        field: 'specialLoginTitle',
        cellRenderer: TitleTemplateRendererComponent,
        cellClass: "custom-admin-grid__main-col",
        width: 520,
        filter: 'agTextColumnFilter',
        filterParams: {
          caseSensitive: true,
          defaultOption: 'startsWith',
        },
        cellStyle: (params) => {
          return params.rowIndex % 2 !== 0 ? {color: 'yellow', backgroundColor: 'green'} : {color: 'black', backgroundColor: 'white'};
        },
      },
      {
        headerName: 'Login Type',
        field: 'specialLoginType',
        width: 280,
        valueGetter: p => p.data.specialLoginType?.specialLoginTypeName,
        tooltipValueGetter: p => p.value,
        sortable: false
      },
      {
        headerName: 'Linked Codes',
        field: 'requestCodesList',
        width: 280,
        editable: true,
        valueGetter: p => p.data?.requestCodesList || 'n/a',
        valueFormatter: p => p.value,
        tooltipValueGetter: p => p.value,
        tooltipField: 'requestCodesList',
      },
      {
        headerName: 'id',
        field: 'specialLoginId',
      }
    ]
  };

  constructor(private configService: GridService) {}

  gridInit() {
    this.showLoading();
    this.allData$ = this.configService.getGridData().pipe(
      tap((data) => this.gridOptions.api!.setRowData(data)),
      finalize(() => this.hideLoading())
    );
  }

  selectNode(){
    this.selected = this.gridOptions.api?.getRowNode(this.selectedId);
  }

  showLoading = () => {
    this.gridOptions?.api?.showLoadingOverlay();
    this.gridOptions?.api?.stopEditing();
  }

  hideLoading = () => this.gridOptions?.api?.hideOverlay();

  openModal(data: any) {
    this.openModalFlag = true;
    this.selectedValue = JSON.stringify(data);
  }
}
