# Reflection

1. Without Context, App would own the theme and pass it as a prop to Footer and every other consumer. With deeper nesting, intermediate components would need to forward a prop they do not use. There is no fixed depth cutoff; Context is helpful when many distant components share the same state.
2. An effect callback must return either nothing or a cleanup function. An async callback returns a Promise instead. Defining an async function inside the effect lets the effect start the request and immediately return its cleanup function.
3. Without the cancellation flag, an old request could update state after cleanup, potentially overwriting a newer result. StrictMode runs an extra setup/cleanup cycle during development, making overlapping requests easier to notice. The flag ignores stale results; it does not cancel the network request itself.
4. filteredProjects is derived from projects, the selected category, and the debounced search text. Computing it during rendering keeps it synchronized without another state variable or effect. projects, loading, and error track the asynchronous request itself.
