import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PdfStateService {
  private pageSubject = new BehaviorSubject<number>(1);
  page$ = this.pageSubject.asObservable();

  scrollToPage(page: number) {
    this.pageSubject.next(page);
  }
}
