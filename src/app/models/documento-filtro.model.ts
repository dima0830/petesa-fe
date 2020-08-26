import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class FilterDocument {
  invoiceFilterRequest = {
    "branchTarget": [
    ],
    "document": {
      "prefix": "",
      "number": "",
      "hasDebitNote": false,
      "hasCreditNote": false,
      "status": -1
    },
    "buyer": {
      "query": ""
    },
    "date": {
      "begin": "",
      "end": ""
    },
    "options": {
      "resultOffset": "20",
      "startPosition": "0",
      "fieldOrder": "FECHA",
      "order": "DESC"
    }
  }
}