import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommunicationService } from 'mfe-shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  receiveProductName = '';
  windowProductData: any = null;
  iframeProductData: any = null;
  iframeStatusMessage = '';
  private readonly productOrigin = 'http://localhost:4201';

  constructor(private mfeCommunicationService: CommunicationService) {}

  ngOnInit(): void {
    // Method 1: Observable / BehaviorSubject
    this.mfeCommunicationService.productName$.subscribe((resp) => {
      console.log('Received via Observable:', resp);
      this.receiveProductName = resp;
    });

    // Method 3: iframe using postMessage
    window.addEventListener('message', this.handleMessageFromProduct);
  }

  // Method 2: Window object
  getProductFromWindow() {
    this.windowProductData = this.mfeCommunicationService.getWindowData('productData');
    console.log('Received via Window Object:', this.windowProductData);
  }

  clearWindowData() {
    this.mfeCommunicationService.clearWindowData('productData');
    this.windowProductData = null;
  }

  // Method 3: iframe using postMessage
  private handleMessageFromProduct = (event: MessageEvent): void => {
    if (typeof event.data !== 'string') {
      return;
    }

    this.iframeProductData = event.data;
    this.iframeStatusMessage = 'Received message from Product MFE through iframe';

    window.parent.postMessage('hello from account', '*');
  };

  ngOnDestroy(): void {
    window.removeEventListener('message', this.handleMessageFromProduct);
  }

  title = 'account';
}
