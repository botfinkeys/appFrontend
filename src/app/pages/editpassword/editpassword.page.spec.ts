import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditpasswordPage } from './editpassword.page';

describe('EditpasswordPage', () => {
  let component: EditpasswordPage;
  let fixture: ComponentFixture<EditpasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditpasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
