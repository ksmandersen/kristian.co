export default context =>
  context
    .keys()
    .map(context)
    .map(module => module.default);
