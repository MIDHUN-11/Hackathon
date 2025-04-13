import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateResumeUploadComponent } from './candidate-resume-upload.component';

describe('CandidateResumeUploadComponent', () => {
  let component: CandidateResumeUploadComponent;
  let fixture: ComponentFixture<CandidateResumeUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateResumeUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateResumeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
