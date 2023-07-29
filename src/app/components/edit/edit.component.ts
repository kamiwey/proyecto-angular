import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css'],
    providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

    public title: string;
    public project: Project;
    public save_project: Project;
    public status: string | undefined;
    public filesToUpload: Array<File>;
    public url: string;

    constructor(
        private _projectService: ProjectService,
        private _uploadService: UploadService,
        private _route: ActivatedRoute,
        private _router: Router    
    ){ 
        this.title = "Editar proyecto";
        this.project = new Project('','','','',2023,'','');
        this.filesToUpload = [];
        this.save_project = new Project('','','','', 0,'','');
        this.url = Global.url;
    }

    ngOnInit(): void {
        this._route.params.subscribe((params: any) => {
            let id = params['id'];
    
            this.getProject(id);
        });
    }
    
    getProject(id: any){
        this._projectService.getProject(id).subscribe(
            response => {
                this.project = response.project;
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    onSubmit(projectForm: NgForm){
        this._projectService.updateProject(this.project).subscribe(
            (response: any) => {
                this.status = 'success';
        
                //Subir la imagen
                if(this.filesToUpload){
                    this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [],  this.filesToUpload, 'image')
                                    .then((result:any) => {
                            
                                    this.save_project = result.project;
                                    console.log(result);
                                    
                                    });
                }else{
                    this.save_project = response.project;
                }
                
        
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