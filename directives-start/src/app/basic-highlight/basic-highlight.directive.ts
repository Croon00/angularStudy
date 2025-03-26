import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[appBasicHighlight]',
    standalone: true // ✅ 이게 핵심
})
export class BasicHighlightDirective implements OnInit{
    constructor(private elementRef: ElementRef) {
        
    }
    
    ngOnInit(): void {
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }
    
}