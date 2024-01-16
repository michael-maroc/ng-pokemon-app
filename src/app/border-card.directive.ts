import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]',
  standalone: true
})
export class BorderCardDirective {

  private initialColor: string = "#f5f5f5"; // Couleur initiale affichée au chargement de la page
  private defaultColor: string = "#009688"; // Couleur par défault si aucune couleur de bordure n'a été prcisée dans le border template
  private defaultHeight: number = 180; // Hauteur par défaut du cadre pour nos bordures

  constructor(private el :ElementRef) {
    this.setBorder(this.initialColor);
    this.setHeight(this.defaultHeight);
  }

  // Ajout de la bordure par défaut (entrée dans le template)
  @Input('pkmnBorderCard') borderColor: string; // alias
  // @Input() pkmnBorderCard: string; // sans alias

  // Ecoute des événements
  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor);
  }

  private setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`;
  }
  
  private setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }
}
