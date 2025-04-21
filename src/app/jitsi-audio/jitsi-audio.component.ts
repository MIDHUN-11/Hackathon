import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-jitsi-audio',
  templateUrl: './jitsi-audio.component.html',
  styleUrls: ['./jitsi-audio.component.css']
})
export class JitsiAudioComponent implements OnInit {
  private pc: RTCPeerConnection;
  private ws!: WebSocket;
  isListening: boolean = false;
  jitsiUrl: string = '';
  sanitizedJitsiUrl!: SafeResourceUrl;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    // Initialize the WebRTC PeerConnection
    this.pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    // Handle ICE candidates
    this.pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.ws.send(JSON.stringify({
          type: 'candidate',
          candidate: event.candidate.toJSON()
        }));
      }
    };
  }

  ngOnInit(): void {
    // Extract the Jitsi URL from the query parameters
    this.route.queryParams.subscribe(params => {
      this.jitsiUrl = params['url'];
      console.log('Jitsi URL:', this.jitsiUrl);

      // Initialize WebSocket connection with the Jitsi URL
      this.ws = new WebSocket(this.jitsiUrl);

      // Handle incoming WebSocket messages
      this.ws.onmessage = async (event) => {
        const msg = JSON.parse(event.data);
        if (msg.type === 'answer') {
          await this.pc.setRemoteDescription(new RTCSessionDescription(msg));
        }
      };

      // Sanitize the Jitsi URL for embedding in an iframe
      this.sanitizedJitsiUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.jitsiUrl);
    });
  }

  async startAudio(): Promise<void> {
    this.isListening = true;

    try {
      // Get audio stream from the user's microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      stream.getTracks().forEach(track => this.pc.addTrack(track, stream));

      // Create and send an offer
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);

      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(this.pc.localDescription));
      } else {
        this.ws.onopen = () => {
          this.ws.send(JSON.stringify(this.pc.localDescription));
        };
      }
    } catch (error) {
      console.error('Error starting audio stream:', error);
      this.isListening = false;
    }
  }
}