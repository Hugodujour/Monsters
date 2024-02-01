exports.success = (message, element) => {
  return { message, element };
};

exports.monsterId = (monsters) => {
  return monsters.length + 1;
};
