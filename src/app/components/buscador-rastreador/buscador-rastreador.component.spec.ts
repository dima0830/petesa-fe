import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorRastreadorComponent } from './buscador-rastreador.component';

describe('BuscadorRastreadorComponent', () => {
    let component: BuscadorRastreadorComponent;
    let fixture: ComponentFixture<BuscadorRastreadorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BuscadorRastreadorComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BuscadorRastreadorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});