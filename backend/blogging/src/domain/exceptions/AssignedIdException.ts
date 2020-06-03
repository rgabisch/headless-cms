class AssignedIdException implements Error {
    message: string = 'id is already assigned.';
    name: string = 'AssignedIdException';
}

export default AssignedIdException;