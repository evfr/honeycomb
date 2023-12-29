
import { PDFDocument } from 'pdf-lib';
import { writeFileSync, readFileSync } from 'fs';
import {iActivity, iForm, iUser} from '../types/types';

const activitiesMappping = {
  Reading: "Check Box1",
  Walking: "Check Box2",
  Music: "Check Box3",
  Other: "Check Box4"
};

const favouriteActivityMappping = {
  Reading: "Choice1",
  Walking: "Choice1",
  Music: "Choice1",
  Other: "Choice1"
};

class PDFService {
    public async fillForm(user: iUser, formData: iForm): Promise<void> {
      const document = await PDFDocument.load(readFileSync("./sample_form.pdf"));
      const form = document.getForm();
    
      // fill name
      const nameField = form.getTextField('Name');
      nameField.setText(formData.name);
    
      // fill address
      const addressField = form.getTextField('Address');
      addressField.setText(formData.address);
    
      // fill date
      form.getDropdown('Dropdown1').select(formData.day.toString());
      const date = new Date();
      date.setMonth(formData.month - 1);
      const shortMonthName = date.toLocaleString('default', { month: 'short' });

      form.getDropdown('Dropdown2').select(shortMonthName);
      form.getDropdown('Dropdown3').select(formData.year.toString());
  
      const fields = form.getFields()
       fields.forEach(field => {
         const type = field.constructor.name
         const name = field.getName()
         console.log(`${type}: ${name}`)
       });
      
      // fill activities
      formData.activities.forEach(act => {
        form.getCheckBox(activitiesMappping[act.name]).check();
        if (act.name === "Other") {
          form.getTextField('Text5').setText(act.additionalFiled || '');        
        }
      });

      // fill favourite activity
      // there is some problem with the template - all the radio buttons in "Favourite activity" have the same name "Choice1"
      const opts = form.getRadioGroup('Group6').getOptions();
      opts.forEach(o => console.log(o));
      ///////////////
      form.getRadioGroup('Group6').select(favouriteActivityMappping[formData.favouriteActivity.name]);
      if (formData.favouriteActivity.name === "Other") {
        form.getTextField('Text6').setText(formData.favouriteActivity.additionalFiled || '');        
      }
      
      writeFileSync(`${formData.name}_${new Date().getTime()}.pdf`, await document.save());
    }
  }
  
  export default PDFService;