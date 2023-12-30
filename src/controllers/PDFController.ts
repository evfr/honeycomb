import { Request, Response } from 'express';
import PDFService from '../services/PDFService';
import { iForm, iActivity, iUser } from '../types/types';

class PDFController {
  private pdfService: PDFService;

  constructor() {
    this.pdfService = new PDFService();
  }

  public fillForm = async (req: Request, res: Response) : Promise<void> => {
    try {
      const user: iUser = (req as any).user.user;

      const { name, address, day, month, year, activities, favouriteActivity } = req.body;

      if (!name || !address || !day || !month || !year || !activities || !favouriteActivity) {
        res.status(400).json({ message: 'Bad request. missing field' });
        return;
      }
      const userForm: iForm = { name, address, day, month, year, activities, favouriteActivity };
      await this.pdfService.fillForm(user, userForm);
      res.json('ok');
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

export default PDFController;