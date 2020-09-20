const Utilities = {
  truncateString: function (input, maxLength) {
    if (input.length > 5) {
      return input.substring(0, maxLength) + "..."
    }
    return input
  },
}

module.exports = Utilities
