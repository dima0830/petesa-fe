import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmisionfComponent } from './emisionf.component';

describe('EmisionfComponent', () => {
    let component: EmisionfComponent;
    let fixture: ComponentFixture<EmisionfComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EmisionfComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EmisionfComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});