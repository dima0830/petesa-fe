import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorEmisionComponent } from './buscador-emision.component';

describe('BuscadorEmisionComponent', () => {
    let component: BuscadorEmisionComponent;
    let fixture: ComponentFixture<BuscadorEmisionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BuscadorEmisionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BuscadorEmisionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});