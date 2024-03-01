import * as XLSX from 'xlsx';
import { getFormattedDateTime } from './utils';


export const downloadExcel = (data: Array<any>) => {
    const sheetName = getFormattedDateTime(); // Get the formatted date and time
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `stocks_${sheetName}.xlsx`);
};