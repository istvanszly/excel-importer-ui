import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bands-import',
    templateUrl: './bands-import.component.html',
    styleUrls: ['./bands-import.component.scss']
})

export class BandsImportComponent {

    @ViewChild('excelFileForm') excelFileForm!: ElementRef;

    public submitInProgress: boolean;

    private formData: FormData;

    constructor(private httpClient: HttpClient, private router: Router, private snackBar: MatSnackBar) {
        this.submitInProgress = false;
        this.formData = new FormData();
    }

    onFileSelection(event: any) {
        if (event?.target?.files?.length > 0) {
            this.formData.append('excelFile', event.target.files[0]);
        }
    }

    onCheckboxChange(event: any) {
        this.formData.append('truncateBeforeInsert', event.target.checked ? '1' : '0');
    }

    onSubmit() {
        this.submitInProgress = true;

        this.httpClient.post(environment.apiUrl + '/api/excel/upload', this.formData).subscribe({
            next: (response: any) => {
                if (response?.success) {
                    this.excelFileForm?.nativeElement?.reset();
                    this.router.navigate(['/bands/list']);
                }
    
                this.snackBar.open(response.message, 'close', { duration: 3000 });
                this.submitInProgress = false;
            },
            error: (error: any) => {
                this.snackBar.open(error?.error?.message, 'close', { duration: 3000 });
                this.submitInProgress = false;
            }
        });
    }
}
