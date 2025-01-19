// productRepository.ts
import { mysqlClient } from "../dbConnection";
import { Product } from "../entities/Product";
import { IProductRepository } from "../interfaces/IProductRepository";
import { injectable } from "inversify";
import * as mysql from 'mysql';

///
@injectable()
export class ProductRepository implements IProductRepository {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysqlClient();
  }

  async create({ name, description, price, stock }: Product): Promise<Product> {
    const query = `INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)`;
    const values = [name, description, price, stock];
    return new Promise<Product>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  async update(id: number, stock: number): Promise<Product> {
    const query = `UPDATE products SET stock = ? WHERE id = ?`;
    const values = [stock, id];
    return new Promise<Product>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async find(limit: number, offset: number): Promise<Product[]> {
    const query = `SELECT * FROM products LIMIT ? OFFSET ?`;
    const values = [limit, offset];
    return new Promise<Product[]>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}
