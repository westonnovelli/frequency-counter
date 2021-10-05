import { debounce } from "./summaries";

test('[debounce] collapses records within debounceValue', () => {
    const input = [{
        timestamp: 1,
        count: 1
    }, {
        timestamp: 3,
        count: 1
    }];

    const expected = [{
        timestamp: 1,
        count: 2
    }];

    expect(debounce(input)).toEqual(expected);
});
