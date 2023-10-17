import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment.development';

export interface PeriodicElement {
    id: number;
    group_name: string;
    origin: string;
    city: string;
    debut_year: number;
    separation_year: number;
    founders: string;
    members: string;
    genre: string;
    description: string;
}

@Component({
    selector: 'app-bands-list',
    templateUrl: './bands-list.component.html',
    styleUrls: ['./bands-list.component.scss']
})

export class BandsListComponent implements OnInit {
    
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    public displayedColumns: string[] = ['id', 'group_name', 'origin', 'city', 'debut_year', 'separation_year', 'founders', 'members', 'genre', 'description'];
    public dataSource = new MatTableDataSource<PeriodicElement>([]);

    constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.httpClient.get(environment.apiUrl + '/api/excel/list').subscribe({
            next: (response: any) => {
                if (response?.success) {
                    this.dataSource = new MatTableDataSource<PeriodicElement>(response.data);
                    this.dataSource.paginator = this.paginator;
                }

                this.snackBar.open(response.message, 'close', { duration: 3000 });
            },
            error: (error: any) => {
                this.snackBar.open(error?.error?.message, 'close', { duration: 3000 });
            }
        });
    }
}
