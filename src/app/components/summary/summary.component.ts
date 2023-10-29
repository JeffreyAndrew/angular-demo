import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { initialAuthors, initialBooks } from './../../services/initial-data';
import { BookService } from 'src/app/services/book.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { Book } from 'src/app/entities/book.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  private subscription: Subscription;
  private barChart: echarts.ECharts;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.barChart = echarts.init(document.getElementById('barChart'));
    this.updateCharts(initialBooks);

    this.subscription = this.bookService.getBooksUpdatedListener().subscribe(updatedBooks => {
      this.updateCharts(updatedBooks);
    });

    setInterval(() => {
      this.bookService.deleteOldRecords();
    }, 7200000); // 2 horas en milisegundos
  }

  ngOnDestroy(): void {
    // Desuscribe y destruye la instancia del gráfico al salir del componente.
    this.subscription.unsubscribe();
    this.barChart.dispose();
  }

  updateCharts(books: Book[]): void {
    // Gráfico de barras de libros por año
    const yearsData = books.map(book => book.year);
    const uniqueYears = Array.from(new Set(yearsData));

    // Ordena los años de menor a mayor
    uniqueYears.sort((a, b) => a - b);

    const booksByYearData = uniqueYears.map(year => yearsData.filter(y => y === year).length);

    const barChart = echarts.init(document.getElementById('barChart'));
    const barOption = {
      title: {
        text: 'Libros por Año',
        subtext: 'Número de libros por año',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: uniqueYears.map(String),
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: booksByYearData,
        type: 'bar'
      }]
    };
    barChart.setOption(barOption);



    // Gráfico de Pie libros publicados y no publicados
    const totalBooks = books.length;
    const publishedBooksData = books.filter(book => book.published).length;
    const unpublishedBooksData = totalBooks - publishedBooksData;

    const pieChart1 = echarts.init(document.getElementById('pieChart1'));
    const pieOption1 = {
      title: {
        text: 'Libros Publicados',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: 'Publicados',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          data: [
            { value: publishedBooksData, name: 'Publicados' },
            { value: unpublishedBooksData, name: 'No Publicados' }
          ]
        }
      ]
    };
    pieChart1.setOption(pieOption1);

    // Gráfico de Pie libros género de Autores
    const authorsData = initialAuthors;
    const genreData: { name: string; value: number }[] = authorsData.reduce<{ name: string; value: number }[]>((acc, author) => {
      const genre = author.gender;
      const existingGenre = acc.find(item => item.name === genre);
      if (existingGenre) {
        existingGenre.value++;
      } else {
        acc.push({ name: genre, value: 1 });
      }
      return acc;
    }, []);

    const pieChart2 = echarts.init(document.getElementById('pieChart2'));
    const pieOption2 = {
      title: {
        text: 'Género de Autores',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: 'Género de Autores',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          data: genreData
        }
      ]
    };
    pieChart2.setOption(pieOption2);
  }


  callServiceFunction(): void {
    this.bookService.generateRandomRecords();
    this.bookService.deleteOldRecords(); // Elimina registros antiguos
  }

}
