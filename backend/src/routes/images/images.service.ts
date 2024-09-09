import { Injectable } from '@nestjs/common';
import { db } from '../../main';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImagesService {
  /**
   * This function fetches a specific image from the database and returns it as a Blob.
   *
   * @param uuid image reference for the DB
   * @returns image as a Blob
   */
  async getImage(
    uuid: string,
  ): Promise<{ content: Buffer; type: string } | null> {
    const result = await db.query('SELECT * FROM images WHERE uuid=?', [uuid]);

    return result[0][0]
      ? { content: result[0][0].content, type: result[0][0].format }
      : null;
  }

  async createImage(
    blob: Buffer,
    scope: string,
    format: 'jpeg' | 'png' | 'pdf',
    filename?: string,
  ): Promise<string> {
    const uuid = uuidv4();
    await db.query(
      'INSERT INTO images (uuid, scope, content, format, filename) VALUES (?, ?, ?, ?, ?)',
      [uuid, scope, blob, format, filename ? filename : null],
    );

    return uuid;
  }

  async getDocuments(): Promise<Array<Document>> {
    const [result] = await db.query(
      'SELECT uuid, filename FROM images WHERE format="pdf"',
    );

    if (!Array.isArray(result)) {
      return [];
    }

    return <Array<Document>>result;
  }
}

export type Document = { uuid: string; filename: string };
