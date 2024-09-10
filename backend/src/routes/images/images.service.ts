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
  ): Promise<string> {
    const uuid = uuidv4();
    await db.query(
      'INSERT INTO images (uuid, scope, content, format) VALUES (?, ?, ?, ?)',
      [uuid, scope, blob, format],
    );

    return uuid;
  }

  async getDocuments(id: number): Promise<Array<Document>> {
    const [result] = await db.query(
      'SELECT * FROM documents WHERE owner_id=? OR shared_id=?',
      [id, id],
    );

    if (!Array.isArray(result)) {
      return [];
    }

    return <Array<Document>>result;
  }

  async createDocument(
    uuid: string,
    filename: string,
    owner: string,
    shared: string,
  ): Promise<{
    uuid: string;
    filename: string;
    shared_with: string;
    owner_id: string;
  }> {
    await db.query(
      'INSERT INTO documents (uuid, title, owner_id, shared_id) VALUES (?, ?, ?, ?)',
      [uuid, filename, owner, shared],
    );

    return { uuid, filename, shared_with: shared, owner_id: owner };
  }
}

export type Document = { uuid: string; filename: string };
