// import { Component, OnInit } from '@angular/core';
// import { Project } from 'src/app/models/project';
// import { ProjectService } from 'src/app/services/project.service';

// @Component({
//   selector: 'app-create',
//   templateUrl: './create.component.html',
//   styleUrls: ['./create.component.css'],
//   providers:[ProjectService]
// })
// export class CreateComponent implements OnInit{

//   public title: string;
//   public project: Project;
//   public status: string;

//   constructor(
//       private _projectService: ProjectService
//   ){ 
//       this.title = "Crear proyecto";
//       this.project = new Project('', '', '', '', 2023, '', '' );
//       this.status= "";
//   }

//   ngOnInit() {
    
//   }

//   onSubmit(form: any){
//     console.log(this.project);
//     this._projectService.saveProject(this.project).subscribe({
//       next: (v) => console.log(v),
//       error: (e) => console.error(e),
//       complete: () => console.info('complete') 
//     })
    
//   }
// }





import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public save_project: Project;
  public status: string | undefined;
  public filesToUpload: Array<File>;

  constructor(
      private _projectService: ProjectService,
      private _uploadService: UploadService    
    ){ 
      this.title = "Crear proyecto";
      this.project = new Project('','','','',2023,'','');
      this.filesToUpload = [];
      this.save_project = new Project('','','','', 0,'','');
    }

  ngOnInit(): void {}
 
  onSubmit(projectForm: NgForm) {
    this._projectService.saveProject(this.project).subscribe(
      (response: any) => {
        this.status = 'success';

        //Subir la imagen
        this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [],  this.filesToUpload, 'image')
        .then((result:any) => {

          this.save_project = result.project;
          console.log(result);
          
        });

        projectForm.reset();
      },
      (error: any) => {
        this.status = "failed";
        console.error(error);
      }
    );
    
  }
  
  fileChangeEvent(fileInput: any){
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
 
}