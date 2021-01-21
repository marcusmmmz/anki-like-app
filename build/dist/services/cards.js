import {writable} from "../../_snowpack/pkg/svelte/store.js";
export class Card {
  constructor(front = "front", back = "back") {
    this.front = front;
    this.back = back;
  }
}
export let boxes = writable([[
  new Card("\u3042", "a"),
  new Card("\u3048", "e")
], [], [], []]);
