import { Injectable } from '@angular/core';
import { Title } from './title.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor() { }

  getTitles(): Observable<Title[]> {
    // assume this data is coming from a backend data source and cannot be changed
    return of([
      { title: 'Mr', firstName: 'John', lastName: 'Smith', acceptTerms: true, isDefault: false },
      { title: 'Mrs', firstName: 'Katalin', lastName: 'Smith', acceptTerms: false, isDefault: false },
      { title: 'Miss', firstName: 'Rebeca', lastName: 'Stewens', acceptTerms: true, isDefault: false },
      { title: '!', firstName: '!', lastName: '!', acceptTerms: false, isDefault: false },
      { title: 'Dr', firstName: 'Jake', lastName: 'Oneil', acceptTerms: true, isDefault: true },
      { title: 'Prof', firstName: 'John', lastName: 'Doe', acceptTerms: false, isDefault: false }
    ]);
  }
}
