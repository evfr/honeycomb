"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_lib_1 = require("pdf-lib");
const fs_1 = require("fs");
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
    fillForm(user, formData) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield pdf_lib_1.PDFDocument.load((0, fs_1.readFileSync)("./sample_form.pdf"));
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
            // const fields = form.getFields()
            //  fields.forEach(field => {
            //    const type = field.constructor.name
            //    const name = field.getName()
            //    console.log(`${type}: ${name}`)
            //  });
            // fill activities
            formData.activities.forEach(act => {
                form.getCheckBox(activitiesMappping[act.name]).check();
                if (act.name === "Other") {
                    form.getTextField('Text5').setText(act.additionalField || '');
                }
            });
            // fill favourite activity
            // there is some problem with the template - all the radio buttons in "Favourite activity" have the same name "Choice1"
            // const opts = form.getRadioGroup('Group6').getOptions();
            // opts.forEach(o => console.log(o));
            ///////////////
            form.getRadioGroup('Group6').select(favouriteActivityMappping[formData.favouriteActivity.name]);
            if (formData.favouriteActivity.name === "Other") {
                form.getTextField('Text6').setText(formData.favouriteActivity.additionalField || '');
            }
            const filename = `${formData.name}_${new Date().getTime()}.pdf`;
            const tempBytes = yield document.save();
            const bytes = Buffer.from(tempBytes);
            return { filename, bytes };
        });
    }
}
exports.default = PDFService;
//# sourceMappingURL=PDFService.js.map