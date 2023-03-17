import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  taskObj: Task = new Task();
  taskArr: Task[] = [];
  addTaskValue: string = '';
  editTaskValue:string='';
  constructor(private crudService: CrudService) { }
  ngOnInit(): void {
    this.editTaskValue ='';
    this.taskObj = new Task();
    this.taskArr=[]
    this.getAllTask();

  }
  getAllTask(): void {
    this.crudService.getAllTask().subscribe (res => {
      this.taskArr = res;
    }, err => {
      alert("unable to get list of task ")
    });
  }
  addTask() {
    this.taskObj.task_name= this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue='';

    }, err => {
      alert(err);

    })
  }
  editTask(){
    this.taskObj.task_name=this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
      
    },err=>{
      alert("failed to update task")
    }
    )
  }
  deleteTask(etask: Task){
    this.crudService.deleteTask(etask).subscribe(res=>{

    },err=>{
      alert("Failed to delete task")
    })

  }
  call(etask:Task){
    this.taskObj=etask;
    this.editTaskValue=etask.task_name;
  }
}