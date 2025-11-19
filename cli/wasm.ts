export interface WasmBindings {
  is_candid_compatible: (newText: string, originalText: string) => boolean;
}

let bindings: WasmBindings | undefined;

export function setWasmBindings(newBindings: WasmBindings) {
  bindings = newBindings;
}

export function getWasmBindings(): WasmBindings {
  if (!bindings) {
    throw new Error("Wasm bindings have not been set");
  }
  return bindings;
}
