export type Column = {
	id: string;
	logical_name: string;
	physical_name: string;
	is_primary_key: boolean;
	nullable: boolean;
	comment: string;
};

export type Entity = {
	id: string;
	logical_name: string;
	physical_name: string;
	comment: string;
	columns: Column[];
	x: string;
	y: string;
};
