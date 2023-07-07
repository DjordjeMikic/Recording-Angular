import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScreenRecording } from 'screen-recording';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {
  title: string = 'Recording App';
  interval: ReturnType<typeof setInterval> | null = null;
  blinking: boolean = false;
 
  async downloadRecording(blob: Blob) {
    try {
      const newHandle = await (window as any).showSaveFilePicker({
        suggestedName: 'recorded.webm',
      });
      const writableStream = await newHandle.createWritable();
      await writableStream.write(blob);
      await writableStream.close();
    } catch (e: any) {
      return e.message.search('user gesture') === -1 && this.downloadRecording(blob);
    }
  };
  
  recording = ScreenRecording({
    processVideo: (blob) => {
      this.downloadRecording(blob);
      console.log(blob);
    },
    processChunks: (chunk) => {
      console.log(chunk);
    },
    interval: 4000,
    onEnded: () => {
      this.recording.stopRecording();
    },
  });

  ngDoCheck() {
    if(this.recording.getRecordingInProgress() && !this.interval) {
      this.interval = setInterval(() => this.blinking = !this.blinking, 1000);
    } else if(!this.recording.getRecordingInProgress() && this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.blinking = false
    }
  }
}
