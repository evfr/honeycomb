import { google, drive_v3  } from 'googleapis';
import * as stream from 'stream';
import {iPDFServiceResult} from '../types/types';


class GoogleDriveService {
  private static drive: drive_v3.Drive;

  public static init(): void {
    if (GoogleDriveService.drive) return;

    const credentialsPath = '../../credentials.json';
    const credentials = require(credentialsPath);
    
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    GoogleDriveService.drive = google.drive({ version: 'v3', auth });
  }

  public async upload (file:iPDFServiceResult): Promise<string> {
    const fileMetadata = {
      name: file.filename,
      parents: ['1xwu9IzXZ2Ihemp1ViDJszapO3n5lvo6q'],
    };
    
    // Use the 'drive.files.create' method to upload the modified PDF file
    const res = await GoogleDriveService.drive.files.create(
      {
        requestBody: fileMetadata,
        media: {
          mimeType: 'application/pdf',
          body: stream.Readable.from(file.bytes),
        },
        fields: 'id',
      }
    );
    return `https://drive.google.com/file/d/${res.data.id}/view?usp=drive_link`;
  }
}

export default GoogleDriveService;
