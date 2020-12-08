# Advanced redux

Where to put transforming logic?

- reducer?
- action creator?

| Action creators | Reducers |
| --- | --- |
| can run async code | pure, sync only! |
| should not prepare the state update too much! | core redux concept: reducers update the sate |