import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorRecepcionComponent } from './buscador-recepcion.component';

describe('BuscadorRecepcionComponent', () => {
    let component: BuscadorRecepcionComponent;
    let fixture: ComponentFixture<BuscadorRecepcionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BuscadorRecepcionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BuscadorRecepcionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});