import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfopieComponent } from './infopie.component';

describe('InfopieComponent', () => {
    let component: InfopieComponent;
    let fixture: ComponentFixture<InfopieComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InfopieComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InfopieComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});