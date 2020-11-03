let timerId: number
const lazyFunction = <T>(func: Function, ms: number) => (arg?: T) => {
  clearTimeout(timerId)
  timerId = setTimeout(() => {
    func(arg)
  }, ms)
}

export default lazyFunction