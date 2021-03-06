import { Component, OnInit } from '@angular/core';

@Component({
    // selector: 'app-name',
    // templateUrl: './name.component.html',
    // styleUrls: ['./name.component.scss']
    template: `<h1>Admin</h1>
    <chart type="pie" [data]="data"></chart>
    `
})
export class AdminComponent implements OnInit {
    data = {
        labels: ['BMW', 'Audi', 'Mazda'],
        datasets: [
            { 
                data: [5, 3, 1], 
                backgroundColor: [
                    "#ff6384",
                    "#36a2eb",
                    "#ffce56"
                ]
            }
        ]
    }

    constructor() { }

    ngOnInit() { }
}