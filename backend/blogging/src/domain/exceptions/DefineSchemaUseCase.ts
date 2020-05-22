export class UnassignedIdException implements Error {
    message: string = 'id is not assigned.';
    name: string = 'UnassignedIdException';
}