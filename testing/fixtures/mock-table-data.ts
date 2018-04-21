import { TableColumn } from '../../src/app/editor/data-table/data-table.component';

export interface MockTableDatum {
	name: string;
	value: number;
};
export const mockTableData: MockTableDatum[] = [
	{ name: 'test', value: 1232 },
	{ name: 'test 1', value: 1343 },
];
export const mockTableColumns: TableColumn[] = [
	{ header: 'Name', valueField: 'name' },
	{ header: 'Value', valueField: 'value' },
];