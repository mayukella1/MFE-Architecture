import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MfeButtonComponent, CommunicationService } from 'mfe-shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MfeButtonComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  title = 'product';
  productName = 'Laptop';
  receiveProductName = '';
  iframeResponseMessage = '';
  iframeVisible = false;
  private readonly accountOrigin = 'http://localhost:4202';

  constructor(private mfeCommunicationService: CommunicationService) {
    window.addEventListener('message', this.handleMessageFromAccount);
  }

  toggleIframeDemo(): void {
    this.iframeVisible = !this.iframeVisible;

    if (this.iframeVisible) {
      setTimeout(() => {
        const iframe = document.getElementById('account-iframe') as HTMLIFrameElement | null;
        if (iframe) {
          iframe.contentWindow?.postMessage('hello', '*');
        }
      }, 300);
    }
  }

  // Method 1: BehaviorSubject example
  sendProduct() {
    this.mfeCommunicationService.setProductName(this.productName);
  }

  // Method 2: window object example
  sendProductViaWindow() {
    const productData = {
      name: this.productName,
      price: 999,
      timestamp: new Date()
    };
    this.mfeCommunicationService.setWindowData('productData', productData);
    console.log('Product data sent via window object');
  }

  // Method 3: iframe using postMessage example
  sendProductViaIframe(): void {
    this.toggleIframeDemo();

    if (this.iframeVisible) {
      this.iframeResponseMessage = 'Sent message: hello';
    } else {
      this.iframeResponseMessage = 'Iframe demo hidden';
    }
  }

  private handleMessageFromAccount = (event: MessageEvent): void => {
    if (typeof event.data !== 'string') {
      return;
    }

    this.iframeResponseMessage = `Account replied: ${event.data}`;
  };

  ngOnDestroy(): void {
    window.removeEventListener('message', this.handleMessageFromAccount);
  }
}
