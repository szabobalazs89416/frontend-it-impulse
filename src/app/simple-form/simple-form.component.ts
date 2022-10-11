import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TitleService } from '../title.service';
import { Title } from '../title.model';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent implements OnInit {

  myForm!: FormGroup;

  titles: Title[] = [];
  selectedTitle: Title = {
    firstName: '',
    lastName: '',
    title: '',
    acceptTerms: false,
    isDefault: false
  };

  constructor(private titleService: TitleService, private fb: FormBuilder, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      firstName: [''],
      lastName: ['']
    });

    this.getTitles();
  }

  ngAfterContentChecked() {

    this.cdref.detectChanges();
  }

  getTitles(): void {

    this.titleService.getTitles()
      .subscribe((titles) => {
        this.titles = titles.sort((a, b) => a.title > b.title ? 1 : -1);
        this.titles = this.filterTitles(this.titles);
        this.selectedTitle = this.titles.find(t => t.acceptTerms === true) as Title;
      });
  }

  filterTitles(titles: Title[]): Title[] {

    let filteredTitles = titles.filter(t => t.title !== "!");
    return filteredTitles;
  }

  onChecked(element: any): void {

    element.target.checked ? this.selectedTitle.acceptTerms = true : this.selectedTitle.acceptTerms = false;
  }

  onSelected(value: string): void {

    if (value) {
      this.selectedTitle = this.titles.find(t => t.title === value) as Title;
    }
  }

  saveForm(form: FormGroup): void {

    if (form.valid) {
      console.log(this.selectedTitle);
    }
  }

}
