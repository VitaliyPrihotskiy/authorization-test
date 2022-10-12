import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Assesment } from 'src/app/shared/models/assesment.model';

@Component({
  selector: 'app-assesment',
  templateUrl: './assesment.component.html',
  styleUrls: ['./assesment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssesmentComponent {
  @Input() assesment: Assesment | null = null;
  @Output() emitId: EventEmitter<number> = new EventEmitter();

  getId(): void {
    this.emitId.emit(this.assesment?.id);
  }
}
