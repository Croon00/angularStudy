// ✅ 3. app.component.spec.ts (테스트용)
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // Standalone 컴포넌트는 declarations 대신 imports
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it("should create the app", () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'app works!'`, () => {
    expect(app.title).toEqual("app works!");
  });

  it("should render title in a h1 tag", () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("h1")?.textContent).toContain("app works!");
  });
});
