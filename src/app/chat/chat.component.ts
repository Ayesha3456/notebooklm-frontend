import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  userMessage = '';
  messages: any[] = [];

  constructor(private http: HttpClient) {}

  sendMessage() {
    const msg = this.userMessage.trim();
    if (!msg) return;
  
    this.messages.push({ sender: 'user', text: msg });
    this.userMessage = '';
  
    this.http.post<any>('http://localhost:8080/chat', { question: msg }).subscribe({
      next: (res) => {
        this.messages.push({ sender: 'bot', text: res.answer, pages: res.pages });
      },
      error: () => {
        this.messages.push({ sender: 'bot', text: 'Error: Could not connect to AI server.' });
      }
    });
  }

  scrollToPage(p: number) {
    // This method will only work if PDF viewer is in this component
    alert(`Scroll to Page ${p} requested`);
  }
}
