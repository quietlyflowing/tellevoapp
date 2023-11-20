import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BackendService } from './backend.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GetSecurityQuestionsService {

  constructor(private backend: BackendService, private route: Router) { }

async resolve(): Promise<any>{
  try{
    const questions = await this.backend.getAllQuestions().toPromise();
    return questions;
  }catch(error){
    this.route.navigate(['inicio/']);
    throw error;
  }
}
}
