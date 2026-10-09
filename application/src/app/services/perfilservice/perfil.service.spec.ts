import { TestBed } from '@angular/core/testing';
import { PerfilService } from './perfil.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PerfilService', () => {
    let service: PerfilService;

    beforeEach(() => {
        TestBed.configureTestingModule({
        providers: [
            PerfilService,
            provideHttpClient(),
            provideHttpClientTesting()
        ]
        });
        service = TestBed.inject(PerfilService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    });