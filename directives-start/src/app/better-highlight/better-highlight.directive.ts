import { Directive, OnInit, Renderer2, ElementRef, HostListener, HostBinding, Input } from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]",
  standalone: true,
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = "transparent";
  @Input("appBetterHighlight") highlightColor: string = "blue";
  @HostBinding("style.backgroundColor") backgroundColor: string =
    this.highlightColor;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue', )
  }

  @HostListener("mouseenter") mouseover(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   "background-color",
    //   "transparent"
    // );
    this.backgroundColor = this.highlightColor;
  }

  @HostListener("mouseleave") mouseleave(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   "background-color",
    //   "blue"
    // );
    this.backgroundColor = this.defaultColor;
  }
}
