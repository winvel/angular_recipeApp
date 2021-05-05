import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { loadingSpinnerComponent } from "./loading spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.component";

@NgModule({
    declarations: [
        AlertComponent,
        loadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        loadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ],
    entryComponents: [AlertComponent]
})
export class SharedModule {}