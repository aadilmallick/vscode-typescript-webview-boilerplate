export default class ReactiveState<T extends Record<keyof T, V>, V> {
  private proxy: Record<keyof T, V>;
  private key: keyof T;
  private _value: V;

  get value() {
    return this.proxy[this.key];
  }

  set value(newValue: V) {
    this.proxy[this.key] = newValue;
  }

  constructor(state: T, onSet: (state: T) => void) {
    const singleProperty = Object.keys(state)[0] as keyof T;
    this.key = singleProperty;
    this._value = state[singleProperty];
    const proxy = new Proxy(state, {
      set(target, p, newValue, receiver) {
        if (p === singleProperty) {
          // @ts-ignore
          target[p] = newValue as V;
          onSet(target);
        }
        return Reflect.set(target, p, newValue, receiver);
      },
    });
    this.proxy = proxy;
  }
}

export class ReactiveFunction {
  static createFunction<T extends CallableFunction>(
    func: T,
    onCall: (argsList: any[]) => void
  ) {
    const proxy = new Proxy(func, {
      apply(targetFunc, thisArg, argArray) {
        onCall(argArray);
        return Reflect.apply(targetFunc, thisArg, argArray);
      },
    });
    return proxy;
  }
}

export class ObservableStore<T extends CallableFunction> {
  private observers: Set<T> = new Set();
  notify(...args: any[]) {
    this.observers.forEach((observer) => observer(...args));
  }
  notifyAndReturn<T>(...args: any[]) {
    const returnValues = Array.from(this.observers).map((observer) =>
      observer(...args)
    );
    return returnValues;
  }
  addObserver(observer: T) {
    this.observers.add(observer);
  }
  removeObserver(observer: T) {
    this.observers.delete(observer);
  }
}
