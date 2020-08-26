import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordarcontrasenaComponent } from './recordarcontrasena.component';

describe('RecordarcontrasenaComponent', () => {
    let component: RecordarcontrasenaComponent;
    let fixture: ComponentFixture<RecordarcontrasenaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecordarcontrasenaComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecordarcontrasenaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});