# pp-api

> a simple wrapper around [the ProPresenter API](https://openapi.propresenter.com/)

## usage

```ts
import { init } from 'pp-api'

const api = init('localhost', 1025) // use the ProPresenter machine's IP and the port from the Network preferences

console.log(await api.version.get())
console.log(await api.v1.libraries.get())
console.log(await api.v1.timers.post({ name: 'Test Timer', allows_overrun: true, countdown: { duration: 100 } }))
console.log(await api.v1.timer[0].start.get())
```
