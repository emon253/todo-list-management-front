import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppConst } from 'src/app/constants/AppConst';
import { TodoDto } from 'src/app/models/TodoDto';
import { WebSocketService } from 'src/app/services/WebSocketService';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos-home',
  templateUrl: './todos-home.component.html',
  styleUrls: ['./todos-home.component.css'],
})
export class TodosHomeComponent {
  isAdmin: boolean = false;
  todoList: TodoDto[] = [];

  constructor(
    private http: HttpClient,
    private service: TodoService,
    private authService: AuthService,
    private webSocketService: WebSocketService
  ) {}
  ngOnInit() {
    let roles: string[] = this.authService.getUserRole();

    this.isAdmin = roles.includes(AppConst.ROLE_ADMINISTRATIVE_USER);

    this.retrieveTodos();
  }

  todoFormGroup: FormGroup = new FormGroup({
    todoID: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  /* ----------------- retrieve all todos--------------------------*/
  retrieveTodos() {
    this.service.retrieveTodos().subscribe((todos) => {
      this.todoList = todos;
    });
  }
  /*------------------- updating todo status open or close -------------- */
  updateTodoStatus(todo: TodoDto) {
    this.service.updateTodoStatus(todo.todoID).subscribe((response) => {
      this.retrieveTodos();
    });
  }
  /**-------------------- delete todo --------------------- */
  deleteTodo(todoID: number) {
    this.service.deleteTodo(todoID).subscribe((response) => {
      this.retrieveTodos();
    });
  }

  /**------------------------ uploading image file ------------------- */
  onFileChange(event: any, todoID: number) {
    const imageFile: File = event.target.files[0];
    if (imageFile.type == 'image/jpeg' || imageFile.type == 'image/png') {
      let reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        let image = reader.result;
        this.selectedImage = String(image).split(',')[1];
        // after converting image data into base64 string calling rest service for image file upload
        this.uploadImage(todoID);
      };
    }
  }
  selectedImage!: string;
  uploadImage(todoID: number) {
    // cherck if image file exist
    if (this.selectedImage) {
      this.service
        .uploadImage(todoID, this.selectedImage)
        .subscribe((response) => {
          // subscribing success message from web socket using stomp
          this.webSocketService
            .getNotificationMessage()
            .subscribe((message) => {
              alert(message);
              this.selectedImage = '';
            });
          // reloading image list with todos
          this.retrieveTodos();
        });
    }
  }
  /**---------- saving todo information ------------------------------ */
  onSave() {
    let todo: TodoDto = this.todoFormGroup.value;
    todo.createdBy = this.authService.getUsername();
    this.service.saveTodo(todo).subscribe((todo) => {
      this.retrieveTodos();
    });
  }
}
