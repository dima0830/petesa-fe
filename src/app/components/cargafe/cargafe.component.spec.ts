import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargafeComponent } from './cargafe.component';

describe('CargafeComponent', () => {
    let component: CargafeComponent;
    let fixture: ComponentFixture<CargafeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CargafeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CargafeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});