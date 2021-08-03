import { Component, OnInit, ViewChild, 
  ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title: string;
  @Input() body: string;
  @Input() link: any;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncator', {static: true}) truncator!: ElementRef;
  @ViewChild('bodyText', {static: true}) bodyText!: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);
    
    if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      // If there is no overflow of text
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    }
    else {
      // If there is, hide
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }

  }

  onXButtonClick() {
    this.deleteEvent.emit();
  }

}
