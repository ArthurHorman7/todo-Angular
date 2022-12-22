import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.component.html',
  styleUrls: ['./finalizados.component.css']
})
export class FinalizadosComponent implements OnInit {

  listFinished: Todo[] = [];

  constructor(private Service: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();
    
  }

  findAll(): void {
    this.Service.findAll().subscribe((resposta) => {
      resposta.forEach(todo => {
        if(todo.finalizado) {
          this.listFinished.push(todo);
        }
      })
    })
  }

  voltar(): void {
    this.router.navigate([''])
  }

}
