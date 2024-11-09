// @ts-ignoreS
import xlsx from 'xlsx-js-style';
import { Word, WordRecord } from '../../types/Word';
// import moment from 'moment';

const headerStyle = {
    font: {bold: true},
    border: {
        bottom: { style: 'thin', color: { rgb: "000000" }}
    },
    alignment: { horizontal: 'center' },
    fill: {
        fgColor: {
            rgb: '617E9E'
        }
    }
}

export const createWordExcel = (fileName: string, workSheet: string, data: Word[]) => {
    const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name))
    const ws = xlsx.utils.json_to_sheet(formatDataForExcel(sortedData));
    const wb = xlsx.utils.book_new();
    // wb.Workbook = { Views: [{RTL: true}] }
    if(sortedData.length) setExcelStyles(ws, 2, sortedData.length + 1)

    xlsx.utils.book_append_sheet(wb, ws, workSheet);
    xlsx.writeFile(wb, fileName);
}

const setExcelStyles = (ws: xlsx.WorkSheet, firstDataRow: number, lastDataRow: number) => {
    ws['!cols'] = [
        {wch: 15},
        {wch: 20},
        {wch: 20},
        {wch: 20},
        {wch: 20},
    ]

    ws['A1'].s = headerStyle;
    ws['B1'].s = headerStyle;
    ws['C1'].s = headerStyle;
    ws['D1'].s = headerStyle;
    ws['E1'].s = headerStyle;
}

export const formatDataForExcel = (data: Word[]) => data.map(obj => ({
    "Word": obj.name,
    "Song": obj.songName,
    "Verse": obj.verse,
    "Line": obj.line,
    "Position in Line": obj.lineLocation
}))

// createWordExcel('results.xlsx', 'words', wordsData3
