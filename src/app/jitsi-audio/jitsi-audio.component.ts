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
    console.log('JitsiAudioComponent initialized');
    try {
      // Extract the Jitsi URL from the query parameters
      this.route.queryParams.subscribe(params => {
        console.log('Query parameters:', params);
        this.jitsiUrl = params['url'];
        console.log('Jitsi URL:', this.jitsiUrl);
      });
      console.log("before creatiing websocket object");
      // Replace this.jitsiUrl with your tunnel link for testing WebRTC
      const tunnelLink = 'ws://127.0.0.1:8000/ws-interview'; // Replace with your actual tunnel link
      console.log('Using WebSocket Tunnel Link:', tunnelLink);

      // Initialize WebSocket connection with the tunnel link
      this.ws = new WebSocket(tunnelLink);
      console.log('WebSocket object created:', this.ws);

      this.ws.onopen = () => {
        console.log('WebSocket connection established.');
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.ws.onclose = (event) => {
        console.warn('WebSocket connection closed:', event);
      };

      // Handle incoming WebSocket messages
      this.ws.onmessage = async (event) => {
        try {
          const msg = JSON.parse(event.data);
          console.log('WebSocket message received:', msg);
          if (msg.type === 'answer') {
            await this.pc.setRemoteDescription(new RTCSessionDescription(msg));
          }
        } catch (error) {
          console.error('Error handling WebSocket message:', error);
        }
      };

      // Sanitize the Jitsi URL for embedding in an iframe
      this.sanitizedJitsiUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.jitsiUrl);
    } catch (error) {
      console.error('Error in ngOnInit:', error);
    }

    navigator.mediaDevices.enumerateDevices().then(devices => {
      console.log("Available devices:", devices);
      const audioInputs = devices.filter(device => device.kind === "audioinput");
      console.log("Audio input devices:", audioInputs);
    });
  }

  async startAudio(): Promise<void> {
    this.isListening = true;

    try {
      // Get audio stream from the user's microphone
      console.log("before getting user media");
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