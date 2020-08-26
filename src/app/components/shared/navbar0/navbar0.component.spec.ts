import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar0Component } from './navbar0.component';

describe('Navbar0Component', () => {
    let component: Navbar0Component;
    let fixture: ComponentFixture<Navbar0Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Navbar0Component]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Navbar0Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});