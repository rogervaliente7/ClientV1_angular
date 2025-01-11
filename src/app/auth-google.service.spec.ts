import { TestBed } from '@angular/core/testing';

import { AuthGoogleService } from './auth-google.service';

describe('AuthGoogleService', () => {
    let service: AuthGoogleService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthGoogleService);
    });

    it('Tuvo que haber sido creado', () => {
        expect(service).toBeTruthy();
    })
});