import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {

  closed = 0;
  list: Todo[] = [];
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
        } else {
          this.list.push(todo);
        }
      })
      this.closed = this.listFinished.length;
    })
  }


  delete(id: any): void {
    this.Service.delete(id).subscribe((resposta)=> {
      if(resposta === null){
        this.Service.message('Task deletada com sucesso!')
        this.list = this.list.filter(todo => todo.id !== id)
      }
    })
  }

  // countClosed(): void { // nada como parametro ou argumento ()
  //   for(let todo of this.list) {
  //     if(todo.finalizado) {
  //       this.closed++
  //     }
  //   }
  // }

  finalizar(item: Todo): void {
    item.finalizado = true;
    this.Service.update(item).subscribe(()=> {
        this.Service.message('Task finalizada com sucesso!')
        this.list = this.list.filter(todo => todo.id !== item.id);
        this.closed++;
    });
  }

  navegarParaFinalizados(): void {
    this.router.navigate(['finalizados'])
  }
  
}
