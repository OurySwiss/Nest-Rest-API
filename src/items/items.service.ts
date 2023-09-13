import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [
    {
      id: '83982499842988',
      name: 'Item One',
      qty: 100,
      description: 'This is item one',
    },
    {
      id: '20932948582',
      name: 'Item Two',
      qty: 50,
      description: 'This is item two',
    },
  ];
}
