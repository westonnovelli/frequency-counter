
export interface Recordable {
    timestamp: number;
    count: number;
    note?: string;
}

export type GroupedRecordable = Record<string, Recordable[]>;

// assumes a sorted list of records
export const debounce = (records: Recordable[], debounceValue = 2000) => {
    return records.reduce<Recordable[]>((acc, r, i) => {
        if (r.timestamp - acc[acc.length - 1]?.timestamp < debounceValue) {
            acc[acc.length - 1].count += 1;
            return acc;
        } else {
            return acc.concat({...r});
        }
    }, []);
}

export const groupByDate = (records: Recordable[]) => {
    return records.reduce<GroupedRecordable>((acc, record) => {
        const date = new Date(record.timestamp);
        const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        if (acc[dateKey]) {
            acc[dateKey] = acc[dateKey].concat([record]);
        } else {
            acc[dateKey] = [record];
        }
        return acc;
    }, {});
};

class RecordBuilder {
    private records;

    constructor(records: Recordable[]) {
        this.records = records;
    }

    public get get() {
        return this.records;
    }

    public debouce(debounceValue?: number): RecordBuilder {
        this.records = debounce(this.records, debounceValue);
        return this;
    }

    public groupByDate(): GroupedRecordable {
        return groupByDate(this.records);
    }
}

export default RecordBuilder;
