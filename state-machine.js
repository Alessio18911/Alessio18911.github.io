class StateMachine {
  constructor(initialState = {}) {
    this._state = initialState;
    this.subscribers = [];
  }

  setState(state) {
    const oldState = this._state;
    this._state = {
      ...this._state,
      ...state,
    };

    this.subscribers.forEach(func => func(this._state, oldState));
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe() {
    // todo
  }

  getState() {
    return {
      ...this._state,
    };
  }
}
