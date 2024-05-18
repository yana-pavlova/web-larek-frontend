import { IView } from "../../types";

export abstract class View implements IView {
  element: HTMLElement;
  container: HTMLElement;

  constructor() {}

  render(data?: unknown) {
    
    return this.element
  }
}