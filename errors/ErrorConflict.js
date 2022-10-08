class ErrorConflict extends Error {
  constructor(message = 'Произошла ошибка') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ErrorConflict;
