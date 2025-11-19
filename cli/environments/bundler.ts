import * as wasm from "../wasm/pkg/bundler/wasm.js";
import { setWasmBindings } from "../wasm.js";

setWasmBindings(wasm);

export * from "../cli.js";
