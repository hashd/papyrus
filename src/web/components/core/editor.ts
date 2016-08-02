import { Component, Input } from 'angular2/core'
import { PapyrusData } from './data'
import { PapyrusSteps } from './steps'
import { PapyrusCanvas } from './canvas'
import { FullLength } from 'src/web/directives/all'
import { CompositeVisualization } from '../../../dvu/gfx/visualization'
import { CommandService } from 'src/web/services/all'
import { Step } from '../../../dvu/core/step'
import { Command } from '../../../dvu/core/command'
import { Messages, Subjects } from 'src/web/services/messages'

@Component({
  selector: 'pa-editor',
  template: `
    <div class="row row-no-padding" full-length>
      <div class="col col-md-3 sidebar" full-length>
    
         <label>  <input type="checkbox" [(ngModel)]="showhideData" (ngModelChange)="onChange1($event)" /> Data  </label>
         <label>  <input type="checkbox" [(ngModel)]="showhideStyle" (ngModelChange)="onChange2($event)"/> Style  </label>
         <label>  <input type="checkbox" [(ngModel)]="showhideMac" (ngModelChange)="onChange3($event)"/> Mac  </label>
   
        <pa-data [data]="visualization?.data"
          [dataObservables]="visualization?.dataObservables"
          [datasetDefinition]="visualization?.datasetDefinition"
          *ngIf="showhideData"
          class="panel-height-{{count}}"
         >
        </pa-data>
        
        <pa-steps [steps]="visualization?.block?.steps" [visualization]="visualization" *ngIf="showhideStyle" class="panel-height-{{count}}"  (selectedStep)="selectStep($event)" (removedStep)="removeStep($event)"></pa-steps>
        <pa-steps [steps]="visualization?.block?.steps" [visualization]="visualization" *ngIf="showhideMac" class="panel-height-{{count}}" (selectedStep)="selectStep($event)" (removedStep)="removeStep($event)"></pa-steps>
      </div>
      <div class="col col-md-9 editor" full-length>
        <pa-canvas [currentStep]="selectedStep" [visualization]="visualization" [commands]="commands" full-length></pa-canvas>
      </div>
    </div>
  `,
  directives: [PapyrusData, PapyrusSteps, PapyrusCanvas, FullLength],
  providers: [CommandService]
})
export class PapyrusEditor {
   showhideData:boolean = true;
    showhideStyle:boolean = true;
     showhideMac:boolean = true;
    count:number=3;
    height:any;

  @Input()
  visualization: CompositeVisualization
  commands: Command[]
  selectedStep: Step

  onChange1(value: boolean) {
    
    this.showhideData = value;
    
   if(this.showhideData==false && this.showhideStyle==true && this.showhideMac==true){
   this.count=2;
   }else if(this.showhideData==true && this.showhideStyle==true && this.showhideMac==false){
  this.count=2;
   }else if(this.showhideData==true && this.showhideStyle==false && this.showhideMac==true){
  this.count=2;
   }else if(this.showhideData==true && this.showhideStyle==true && this.showhideMac==true){
  this.count=3;
   }
   else{
     this.count=1;
   }
}

  onChange2(value: boolean) {
    
    this.showhideStyle = value;
    
 if(this.showhideData==true && this.showhideStyle==false && this.showhideMac==true){
   this.count=2;
   }else if(this.showhideData==false && this.showhideStyle==true && this.showhideMac==true){
  this.count=2;
   }else if(this.showhideData==true && this.showhideStyle==true && this.showhideMac==false){
  this.count=2;
   }else if(this.showhideData==true && this.showhideStyle==true && this.showhideMac==true){
  this.count=3;
   }else{
     this.count=1;
   }

  }
  onChange3(value: boolean) {

    this.showhideMac = value;
   
    if(this.showhideData==true && this.showhideStyle==true && this.showhideMac==false){
   this.count=2;
   }else if(this.showhideData==true && this.showhideStyle==false && this.showhideMac==true){
  this.count=2;
   }else if(this.showhideData==false && this.showhideStyle==true && this.showhideMac==true){
  this.count=2;
   }else if(this.showhideData==true && this.showhideStyle==true && this.showhideMac==true){
  this.count=3;
   }else{
     this.count=1;
   }
  }

  constructor(private commandService: CommandService) {
    this.commands = commandService.getCommands()
  }

  selectStep(e) {
    this.selectedStep = e.step
  }

  removeStep(e) {
    this.visualization.block.remove(e.step);

    //to refresh the visualization canvas
    const removeStepSubject = Subjects[Messages.REMOVE_STEP];
    removeStepSubject.next(e.step.uuid);
  }
}
