import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'recording'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Recording App');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Recording App');
  });

  it('should render button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;    
    expect(compiled.querySelector('button')).toBeDefined();
  });

  it('should render circle inside the button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.rounded')).toBeDefined();
  });

  it('before start recording', () => {
    const comp = new AppComponent();
    expect(comp.interval)
      .withContext('Not recording and interval is not set')
      .toBeNull();
    expect(comp.blinking)
      .withContext('Not recording and and background is not blinking')
      .toBeFalse();
  });

  it('should start recording', () => {
    const comp = new AppComponent();
    const stream = comp.recording.startRecording();
    
    expect(stream)
      .withContext('Not recording and interval is not set')
      .toBeTruthy();
    expect(comp.interval)
      .withContext('Blinking has started')
      .toBeDefined();
  });

  it('should stop recording', () => {
    const comp = new AppComponent();
    comp.recording.stopRecording();

    expect(comp.interval)
      .withContext('Not recording and interval is not set')
      .toBeNull();
    expect(comp.blinking)
      .withContext('Not recording and and background is not blinking')
      .toBeFalse();
  })
});
