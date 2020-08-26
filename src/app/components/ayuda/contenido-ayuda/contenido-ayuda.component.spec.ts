import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoAyudaComponent } from './contenido-ayuda.component';

describe('ContenidoAyudaComponent', () => {
    let component: ContenidoAyudaComponent;
    let fixture: ComponentFixture<ContenidoAyudaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContenidoAyudaComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContenidoAyudaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});