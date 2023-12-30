import { Request, Response } from 'express';
import PDFService from '../services/PDFService';
import GoogleDriveService from '../services/GoogleDriveService';
import { iForm, iPDFServiceResult, iUser } from '../types/types';

class PDFController {
  private pdfService: PDFService;
  private googleService: GoogleDriveService;

  constructor() {
    this.pdfService = new PDFService();
    this.googleService = new GoogleDriveService();
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
      const pdfFile: iPDFServiceResult = await this.pdfService.fillForm(user, userForm);
      const url = await this.googleService.upload(pdfFile);
      res.json({url});
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

export default PDFController;