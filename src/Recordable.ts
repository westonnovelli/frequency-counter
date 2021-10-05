
export interface Recordable {
    timestamp: number;
    count: number;
    note?: string;
    subRecords?: Recordable[];
}

export type GroupedRecordable = Record<string, Recordable[]>;

// assumes a sorted list of records
export const debounce = (records: Recordable[], debounceValue = 60000) => {
    return records.reduce<Recordable[]>((acc, r) => {
        const prev = acc[acc.length - 1];
        if (r.timestamp - prev?.timestamp < debounceValue) {
            prev.count += 1;
            prev.subRecords = (prev.subRecords ?? []).concat(r);
            return acc;
        } else {
            return acc.concat({...r});
        }
    }, []);
}

export const groupByDate = (records: Recordable[]) => {
    return records.reduce<GroupedRecordable>((acc, record) => {
        const date = new Date(record.timestamp);
        // month is 0 indexed
        const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
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

    public debounce(debounceValue?: number): RecordBuilder {
        this.records = debounce(this.records, debounceValue);
        return this;
    }

    public groupByDate(): GroupedRecordable {
        return groupByDate(this.records);
    }
}

export default RecordBuilder;
