function categoryFilter(category, userId) {
  if (category) {
    return { 'category': category, 'userId': userId }
  } else {
    return { 'userId': userId }
  }
}

module.exports = categoryFilter