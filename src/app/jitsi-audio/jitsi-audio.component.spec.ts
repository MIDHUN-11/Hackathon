import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JitsiAudioComponent } from './jitsi-audio.component';

describe('JitsiAudioComponent', () => {
  let component: JitsiAudioComponent;
  let fixture: ComponentFixture<JitsiAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JitsiAudioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JitsiAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
