import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RastreadorComponent } from './rastreador.component';

describe('RastreadorComponent', () => {
    let component: RastreadorComponent;
    let fixture: ComponentFixture<RastreadorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RastreadorComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RastreadorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});