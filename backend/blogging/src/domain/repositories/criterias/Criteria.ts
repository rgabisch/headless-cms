interface Criteria<T> {
    matches(other: T): boolean;
}

export default Criteria;