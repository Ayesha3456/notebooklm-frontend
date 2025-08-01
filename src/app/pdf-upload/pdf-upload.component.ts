import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfStateService } from '../services/pdf-state.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pdf-upload',
  standalone: true,
  imports: [PdfViewerModule, CommonModule, FormsModule],
  templateUrl: './pdf-upload.component.html',
  styleUrls: ['./pdf-upload.component.scss']
})
export class PdfUploadComponent implements OnInit {
  pdfSrc: string | any = null;
  page = 1;
  totalPages = 0;
  loading = false;

  userMessage = '';
  messages: any[] = [];
  parsedText = ''; // ⬅️ added to hold PDF content

  constructor(private http: HttpClient, public pdfState: PdfStateService) {}

  ngOnInit(): void {
    this.pdfState.page$.subscribe(p => this.page = p);
  }

  uploadPdf(event: any): void {
    const file = event.target.files[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Only PDF files are allowed.');
      return;
    }

    // Reset previous state
    this.messages = [];
    this.userMessage = '';
    this.page = 1;
    this.totalPages = 0;
    this.pdfSrc = null;
    this.parsedText = '';
    const reader = new FileReader();
    this.loading = true;

    reader.onload = () => {
      setTimeout(() => {
        this.pdfSrc = reader.result;
        this.loading = false;
      }, 100);
    };

    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('pdf', file);

    this.http.post<any>('http://localhost:8080/upload', formData).subscribe({
      next: (res) => {
        this.totalPages = res.numPages || 0;
        this.parsedText = res.parsedText || '';
      },
      error: () => {
        this.loading = false;
        alert('Failed to upload PDF');
      }
    });
  }

  nextPage() {
    if (this.page < this.totalPages) this.page++;
  }

  prevPage() {
    if (this.page > 1) this.page--;
  }

  sendMessage() {
    const msg = this.userMessage.trim();
    if (!msg || !this.parsedText) return;

    this.messages.push({ sender: 'user', text: msg });
    this.userMessage = '';

    this.http.post<any>('https://notebooklm-backend-40m9.onrender.com/chat', {
      question: msg,
      context: this.parsedText
    }).subscribe((res: any) => {
      this.messages.push({ sender: 'bot', text: res.answer, pages: res.pages });
      if (res.pages?.length) {
        this.pdfState.scrollToPage(res.pages[0]);
      }
    });
  }

  handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed.');
      return;
    }

    const fakeEvent = { target: { files: [file] } };
    this.uploadPdf(fakeEvent);
  }

  resetUpload() {
    this.pdfSrc = null;
    this.messages = [];
    this.userMessage = '';
    this.page = 1;
    this.totalPages = 0;
    this.parsedText = '';
  }
}
